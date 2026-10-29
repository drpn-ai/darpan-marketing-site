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
        title: 'Darpan — checks for the work between your systems',
      },
      {
        name: 'description',
        content:
          'Your integrations report success. Darpan checks the outcome every morning and keeps each break on a list, with its owner and evidence, until it’s fixed.',
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Darpan' },
      {
        property: 'og:title',
        content:
          'Darpan — checks for the work between your systems',
      },
      {
        property: 'og:description',
        content:
          'Your integrations report success. Darpan checks the outcome every morning and keeps each break on a list, with its owner and evidence, until it’s fixed.',
      },
      { name: 'twitter:card', content: 'summary_large_image' },
      {
        name: 'twitter:title',
        content:
          'Darpan — checks for the work between your systems',
      },
      {
        name: 'twitter:description',
        content:
          'Your integrations report success. Darpan checks the outcome every morning and keeps each break on a list, with its owner and evidence, until it’s fixed.',
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
