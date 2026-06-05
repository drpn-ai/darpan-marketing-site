import type { ReactNode } from 'react'
import type { Article, Block, FaqItem } from '@/data/writing-content'
import type { WritingEntry } from '@/data/writing-entries'
import { VlPage } from '@/components/VlChrome'

const SITE_URL = 'https://drpn.ai'

// `code` spans render as <code>; everything else as plain text.
function renderCode(text: string, keyPrefix: string) {
  const parts = text.split('`')
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <code key={`${keyPrefix}-c${i}`} className="writing-code-inline">
        {part}
      </code>
    ) : (
      <span key={`${keyPrefix}-c${i}`}>{part}</span>
    ),
  )
}

// Lightweight inline formatter for article copy. Supports two markups:
//   `code`            → inline <code> (field names, formulas, identifiers)
//   [label](href)     → links. Internal hrefs ("/writing/...", "#anchor")
//                       render as same-tab anchors; external "http(s)://"
//                       links open in a new tab with rel="noopener noreferrer".
// Everything else is plain text. Keeps article data readable while producing
// real, crawlable links for internal cross-references and outbound citations.
const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g

function renderInline(text: string, keyPrefix: string) {
  const nodes: ReactNode[] = []
  let last = 0
  let seg = 0
  let match: RegExpExecArray | null
  LINK_RE.lastIndex = 0
  while ((match = LINK_RE.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(...renderCode(text.slice(last, match.index), `${keyPrefix}-${seg}`))
    }
    const label = match[1]
    const href = match[2]
    const external = /^https?:\/\//i.test(href)
    nodes.push(
      external ? (
        <a
          key={`${keyPrefix}-l${seg}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {label}
        </a>
      ) : (
        <a key={`${keyPrefix}-l${seg}`} href={href}>
          {label}
        </a>
      ),
    )
    last = match.index + match[0].length
    seg += 1
  }
  if (last < text.length) {
    nodes.push(...renderCode(text.slice(last), `${keyPrefix}-${seg}`))
  }
  return nodes
}

function BlockView({ block, index }: { block: Block; index: number }) {
  const key = `b-${index}`
  switch (block.t) {
    case 'h2':
      return <h2 className="writing-h2">{block.text}</h2>
    case 'h3':
      return <h3 className="writing-h3">{block.text}</h3>
    case 'p':
      return <p>{renderInline(block.text, key)}</p>
    case 'ul':
      return (
        <ul className="writing-ul">
          {block.items.map((item, i) => (
            <li key={`${key}-${i}`}>{renderInline(item, `${key}-${i}`)}</li>
          ))}
        </ul>
      )
    case 'ol':
      return (
        <ol className="writing-ol">
          {block.items.map((item, i) => (
            <li key={`${key}-${i}`}>{renderInline(item, `${key}-${i}`)}</li>
          ))}
        </ol>
      )
    case 'table':
      return (
        <div className="writing-table-wrap">
          <table className="writing-table">
            <thead>
              <tr>
                {block.head.map((h, i) => (
                  <th key={`${key}-h-${i}`}>{renderInline(h, `${key}-h-${i}`)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={`${key}-r-${r}`}>
                  {row.map((cell, c) => (
                    <td key={`${key}-r-${r}-c-${c}`}>
                      {renderInline(cell, `${key}-r-${r}-c-${c}`)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    case 'callout':
      return (
        <aside className={`writing-callout writing-callout-${block.kind}`}>
          <span className="writing-callout-label label-smallcaps">
            {block.kind === 'warning'
              ? 'Watch out'
              : block.kind === 'tip'
                ? 'Tip'
                : 'Note'}
          </span>
          <p>{renderInline(block.text, key)}</p>
        </aside>
      )
    case 'code':
      return (
        <pre className="writing-code-block">
          <code>{block.text}</code>
        </pre>
      )
    case 'quote':
      return (
        <blockquote className="writing-quote">
          {renderInline(block.text, key)}
        </blockquote>
      )
    default:
      return null
  }
}

function FaqView({ faq }: { faq: FaqItem[] }) {
  return (
    <section className="writing-faq" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="writing-h2">
        Frequently asked questions
      </h2>
      {faq.map((item, i) => (
        <div key={`faq-${i}`} className="writing-faq-item">
          <h3 className="writing-h3">{item.q}</h3>
          <p>{renderInline(item.a, `faq-a-${i}`)}</p>
        </div>
      ))}
    </section>
  )
}

function buildJsonLd(article: Article, entry: WritingEntry | undefined) {
  const url = `${SITE_URL}/writing/${article.slug}`
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Article',
      headline: article.title,
      description: article.description,
      url,
      mainEntityOfPage: url,
      author: { '@type': 'Organization', name: 'Darpan' },
      publisher: { '@type': 'Organization', name: 'Darpan' },
      articleSection: entry?.category ?? 'Reconciliation',
      keywords: article.keywords.join(', '),
    },
  ]
  if (article.faq && article.faq.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: article.faq.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    })
  }
  return { '@context': 'https://schema.org', '@graph': graph }
}

export function WritingArticle({
  article,
  entry,
}: {
  article: Article
  entry: WritingEntry | undefined
}) {
  const jsonLd = buildJsonLd(article, entry)
  // Article data is static and authored in-repo (trusted). We still escape
  // `<` so a stray "</script>" in copy can never break out of the tag.
  const jsonLdSafe = JSON.stringify(jsonLd).replace(/</g, '\\u003c')
  return (
    <VlPage>
      <section className="vl-band is-plain">
        <article className="vl-wrap vl-prose">
          <span className="vl-kicker">
            {entry?.date}
            {entry?.date ? <span aria-hidden> · </span> : null}
            {entry?.category}
          </span>
          <h1>{article.title}</h1>
          <p className="writing-lead">{renderInline(article.lead, 'lead')}</p>
          {article.blocks.map((block, i) => (
            <BlockView key={`block-${i}`} block={block} index={i} />
          ))}
          {article.faq && article.faq.length > 0 ? (
            <FaqView faq={article.faq} />
          ) : null}
          <p className="writing-post-footer">
            <a className="writing-all" href="/writing">
              ← All writing
            </a>
          </p>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: jsonLdSafe }}
          />
        </article>
      </section>
    </VlPage>
  )
}
