// Checks the prerendered site in dist/client against scripts/site-expectations.mjs.
// Zero dependencies on purpose: the site has no test runner and takes no new deps.
// Run after `npm run build`: `npm run check`. Exits 1 on any failure.
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import {
  PAGES,
  VOICE_CHECKED,
  BANNED,
  RETIRED,
  CHECK_UNUSED_CSS,
} from './site-expectations.mjs'

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const DIST = path.join(ROOT, 'dist', 'client')

const failures = []
let passed = 0
const fail = (check, where, detail) =>
  failures.push(`FAIL ${check} ${where}: ${detail}`)
const ok = () => passed++

const routeFile = (route) =>
  route === '/' ? path.join(DIST, 'index.html') : path.join(DIST, `${route}.html`)

const ENTITIES = {
  amp: '&', lt: '<', gt: '>', quot: '"', '#x27': "'", '#39': "'",
  rsquo: '’', lsquo: '‘', ldquo: '“', rdquo: '”', mdash: '—', ndash: '–',
  middot: '·', nbsp: ' ', rarr: '→',
}

function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<svg[\s\S]*?<\/svg>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    // Inline tags join their text; block tags separate it.
    .replace(/<\/?(span|a|em|strong|b|i|abbr|code|small)(\s[^>]*)?>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&(#x27|#39|[a-z]+);/gi, (m, name) => ENTITIES[name] ?? m)
    .replace(/\s+/g, ' ')
}

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, out)
    else out.push(full)
  }
  return out
}

if (!fs.existsSync(DIST)) {
  console.error('check-site: dist/client missing; run the build first')
  process.exit(1)
}

// 1-3: pages exist, titles, content.
const titles = new Map()
for (const page of PAGES) {
  const file = routeFile(page.path)
  if (!fs.existsSync(file)) {
    fail('page-exists', page.path, `${path.relative(ROOT, file)} not found`)
    continue
  }
  ok()
  const html = fs.readFileSync(file, 'utf8')
  const title = (html.match(/<title>([^<]*)<\/title>/) ?? [])[1] ?? ''
  if (!title.includes(page.title)) {
    fail('title', page.path, `"${title}" lacks "${page.title}"`)
  } else ok()
  if (titles.has(title)) {
    fail('title', page.path, `same <title> as ${titles.get(title)}: "${title}"`)
  } else titles.set(title, page.path)
  // Each page names itself, once, as canonical and og:url.
  const self = `https://drpn.ai${page.path}`
  const canonicals = [...html.matchAll(/<link[^>]*rel="canonical"[^>]*>/g)].map(
    (m) => (m[0].match(/href="([^"]*)"/) ?? [])[1],
  )
  if (canonicals.length === 1 && canonicals[0] === self) ok()
  else fail('canonical', page.path, `want one canonical ${self}, got ${JSON.stringify(canonicals)}`)
  const ogUrls = [...html.matchAll(/<meta[^>]*property="og:url"[^>]*>/g)].map(
    (m) => (m[0].match(/content="([^"]*)"/) ?? [])[1],
  )
  if (ogUrls.length === 1 && ogUrls[0] === self) ok()
  else fail('og-url', page.path, `want one og:url ${self}, got ${JSON.stringify(ogUrls)}`)
  // Phones hide the nav bar; the menu trigger must be there instead.
  if (html.includes('class="mobile-menu-trigger"')) ok()
  else fail('mobile-nav', page.path, 'no mobile menu trigger in the header')

  const text = visibleText(html)
  for (const want of page.mustContain) {
    if (text.includes(want)) ok()
    else fail('content', page.path, `missing "${want}"`)
  }
}

// 4: voice.
for (const route of VOICE_CHECKED) {
  const file = routeFile(route)
  if (!fs.existsSync(file)) continue // page-exists already reports it
  const text = visibleText(fs.readFileSync(file, 'utf8'))
  let clean = true
  for (const pattern of BANNED) {
    const m = text.match(pattern)
    if (m) {
      clean = false
      const at = m.index ?? 0
      fail('voice', route, `${pattern} in "…${text.slice(Math.max(0, at - 30), at + 30)}…"`)
    }
  }
  if (clean) ok()
}

// 5-6: links resolve, nothing links to retired paths, every role="img" is labelled.
const htmlFiles = walk(DIST).filter((f) => f.endsWith('.html'))
for (const file of htmlFiles) {
  const where = '/' + path.relative(DIST, file)
  const html = fs.readFileSync(file, 'utf8')
  for (const [, href] of html.matchAll(/href="(\/(?!\/)[^"]*)"/g)) {
    const target = href.split('#')[0].split('?')[0] || '/'
    if (RETIRED.includes(target)) {
      fail('links', where, `links to retired ${href}`)
      continue
    }
    const candidates = [
      routeFile(target),
      path.join(DIST, target),
      path.join(ROOT, 'public', target),
    ]
    if (target === '/' || candidates.some((c) => fs.existsSync(c) && fs.statSync(c).isFile())) ok()
    else fail('links', where, `${href} resolves to nothing`)
  }
  for (const [tag] of html.matchAll(/<[a-z][^>]*role="img"[^>]*>/gi)) {
    const label = (tag.match(/aria-label="([^"]*)"/) ?? [])[1]
    if (label && label.trim()) ok()
    else fail('img-label', where, `role="img" without aria-label: ${tag.slice(0, 80)}`)
  }
}

// 7: retired paths redirect.
if (RETIRED.length) {
  const toml = fs.readFileSync(path.join(ROOT, 'netlify.toml'), 'utf8')
  const blocks = toml.split('[[redirects]]').slice(1)
  for (const route of RETIRED) {
    const block = blocks.find((b) => new RegExp(`from\\s*=\\s*"${route}"`).test(b))
    const good =
      block &&
      /to\s*=\s*"\/"/.test(block) &&
      /status\s*=\s*301/.test(block) &&
      /force\s*=\s*true/.test(block)
    if (good) ok()
    else fail('redirects', route, 'needs a forced 301 to / in netlify.toml')
  }
}

// 8: unused CSS.
if (CHECK_UNUSED_CSS) {
  const cssPath = path.join(ROOT, 'src', 'styles.operational.css')
  const css = fs.readFileSync(cssPath, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '')
  const source = walk(path.join(ROOT, 'src'))
    .filter((f) => f !== cssPath && /\.(tsx?|jsx?)$/.test(f))
    .map((f) => fs.readFileSync(f, 'utf8'))
    .join('\n')
  const classes = new Set([...css.matchAll(/\.(vl-[a-z0-9-]+)/g)].map((m) => m[1]))
  for (const cls of classes) {
    if (new RegExp(`(^|[^a-z0-9-])${cls}([^a-z0-9-]|$)`).test(source)) ok()
    else fail('unused-css', cls, 'selector in styles.operational.css used nowhere in src/')
  }
}

if (failures.length) {
  console.error(failures.join('\n'))
  console.error(`check-site: ${failures.length} failed, ${passed} passed`)
  process.exit(1)
}
console.log(`check-site: ${passed} checks passed`)
