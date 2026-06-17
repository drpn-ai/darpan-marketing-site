import { createFileRoute, redirect, useParams } from '@tanstack/react-router'
import { writingEntries } from '@/data/writing-entries'
import { getArticle } from '@/data/writing-content'
import { WritingArticle } from '@/components/WritingArticle'
import { VlPage } from '@/components/VlChrome'

const SITE_URL = 'https://drpn.ai'

export const Route = createFileRoute('/notes/$slug')({
  component: WritingPostPage,
  // Don't publish articles that aren't written yet: an entry only goes live
  // once it has body content. Unwritten or unknown slugs bounce to the index
  // rather than rendering an empty "coming soon" stub.
  beforeLoad: ({ params }) => {
    if (!getArticle(params.slug)) {
      throw redirect({ to: '/notes' })
    }
  },
  head: ({ params }) => {
    const article = getArticle(params.slug)
    const entry = writingEntries.find((e) => e.slug === params.slug)
    const title = `${article?.title ?? entry?.title ?? 'Writing'} — Darpan`
    const description =
      article?.description ??
      'Working notes on reconciliation, retail data, and how the books close when they do.'
    const url = `${SITE_URL}/notes/${params.slug}`
    const meta: Array<Record<string, string>> = [
      { title },
      { name: 'description', content: description },
      { property: 'og:type', content: 'article' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
    ]
    if (article) {
      meta.push({ name: 'keywords', content: article.keywords.join(', ') })
    }
    return { meta, links: [{ rel: 'canonical', href: url }] }
  },
})

function WritingPostPage() {
  const { slug } = useParams({ from: '/notes/$slug' })
  const entry = writingEntries.find((e) => e.slug === slug)
  const article = getArticle(slug)

  if (article) {
    return <WritingArticle article={article} entry={entry} />
  }

  return (
    <VlPage>
      <section className="vl-band is-plain">
        <article className="vl-wrap vl-prose">
          <span className="vl-kicker">
            {entry?.date ?? ''}
            {entry?.date ? <span aria-hidden> · </span> : null}
            {entry?.category ?? 'Writing'}
          </span>
          <h1>{entry?.title ?? 'Post coming soon'}</h1>
          <p>
            This entry is being prepared. Check back, or see{' '}
            <a href="/notes">all writing</a>.
          </p>
        </article>
      </section>
    </VlPage>
  )
}
