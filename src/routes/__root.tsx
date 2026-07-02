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
        title:
          'Darpan — the verification layer for the composable retail stack',
      },
      {
        name: 'description',
        content:
          'You’ve connected your systems. Nobody’s checking they still line up. Darpan keeps verifying that Shopify, your OMS, the WMS, and the processor still reconcile after data lands — row by row, in time for operations to act.',
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Darpan' },
      { property: 'og:url', content: 'https://drpn.ai/' },
      {
        property: 'og:title',
        content:
          'Darpan — the verification layer for the composable retail stack',
      },
      {
        property: 'og:description',
        content:
          'Keep your best-of-breed tools. Add the layer that proves they line up — continuous verification that your retail systems still reconcile, built for operations.',
      },
      { name: 'twitter:card', content: 'summary_large_image' },
      {
        name: 'twitter:title',
        content:
          'Darpan — the verification layer for the composable retail stack',
      },
      {
        name: 'twitter:description',
        content:
          'You’ve connected your systems. Nobody’s checking they still line up. Continuous verification that your retail systems still reconcile — built for operations.',
      },
    ],
    links: [
      { rel: 'canonical', href: 'https://drpn.ai/' },
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
