import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import '../styles.css'
import '../styles.operational.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#F4F2EC' },
      {
        title: 'Darpan — daily order reconciliation for ops teams',
      },
      {
        name: 'description',
        content:
          'Daily order reconciliation for ops teams. Every day, Darpan lists orders, returns and refunds that missed Shopify, your OMS or NetSuite, and who fixes each.',
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Darpan' },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:image', content: 'https://drpn.ai/darpan-hero-light.png' },
      { property: 'og:image:width', content: '2064' },
      { property: 'og:image:height', content: '1104' },
      { property: 'og:image:alt', content: 'The Darpan mark' },
      { name: 'twitter:image', content: 'https://drpn.ai/darpan-hero-light.png' },
      { name: 'twitter:image:alt', content: 'The Darpan mark' },
      {
        property: 'og:title',
        content: 'Darpan — daily order reconciliation for ops teams',
      },
      {
        property: 'og:description',
        content:
          'Daily order reconciliation for ops teams. Every day, Darpan lists orders, returns and refunds that missed Shopify, your OMS or NetSuite, and who fixes each.',
      },
      { name: 'twitter:card', content: 'summary_large_image' },
      {
        name: 'twitter:title',
        content: 'Darpan — daily order reconciliation for ops teams',
      },
      {
        name: 'twitter:description',
        content:
          'Daily order reconciliation for ops teams. Every day, Darpan lists orders, returns and refunds that missed Shopify, your OMS or NetSuite, and who fixes each.',
      },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/darpan-mark-white.svg" />
        <link rel="shortcut icon" href="/darpan-mark-white.svg" />
        <link rel="apple-touch-icon" href="/darpan-mark-white.svg" />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
