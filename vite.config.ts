import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import netlify from '@netlify/vite-plugin-tanstack-start'

const config = defineConfig({
  plugins: [
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    netlify(),
    // Prerender every page to static HTML at build time (SSG). This site has no
    // per-request data, so serving on-demand SSR through a Netlify Function only
    // bought us cold starts (~11s TTFB on the first hit). Prerendered HTML is
    // served straight from Netlify's CDN — no function on the hot path, sub-1s
    // loads even when cold. crawlLinks discovers the /notes/:slug articles from
    // the /notes index; the explicit pages list guarantees every top-level route
    // is emitted even if it isn't linked from the nav. The SSR function stays as
    // a fallback for any path not prerendered.
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
        failOnError: true,
        // Emit flat files (why.html) instead of subfolder indexes (why/index.html).
        // Our internal links point at no-slash URLs (/why, /notes/:slug); with
        // subfolder indexes Netlify 301s /why -> /why/, adding a redirect hop that
        // pushed some pages to ~1s. Flat files let Netlify serve /why directly (200).
        autoSubfolderIndex: false,
      },
      pages: [
        { path: '/' },
        { path: '/why' },
        { path: '/customers' },
        { path: '/notes' },
        { path: '/notebook' },
        { path: '/terms' },
        { path: '/privacy' },
      ],
    }),
    viteReact(),
  ],
})

export default config
