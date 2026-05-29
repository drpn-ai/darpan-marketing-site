import { createFileRoute, useParams } from '@tanstack/react-router'
import { writingEntries } from '@/data/writing-entries'

export const Route = createFileRoute('/writing/$slug')({
  component: WritingPostPage,
  head: ({ params }) => ({
    meta: [
      {
        title:
          writingEntries.find((e) => e.slug === params.slug)?.title ??
          'Writing — Darpan',
      },
    ],
  }),
})

function WritingPostPage() {
  const { slug } = useParams({ from: '/writing/$slug' })
  const entry = writingEntries.find((e) => e.slug === slug)

  if (slug === 'why-reconciliation-belongs-at-the-data-layer') {
    return (
      <main className="legal-page section-band">
        <article className="container legal-container">
          <span className="label-smallcaps">
            {entry?.date}
            <span aria-hidden> · </span>
            {entry?.category}
          </span>
          <h1>{entry?.title ?? 'Writing'}</h1>
          <p>
            Most retail finance teams treat reconciliation as a spreadsheet
            problem. They export from each system, paste into Excel, write
            VLOOKUPs, and call the result reconciled. The output is a
            workbook nobody else can read. The trail is in cell comments.
          </p>
          <p>
            Reconciliation is a data-layer problem. Two systems disagree about
            the same record because they're tracking it independently. The
            answer is to compare the records by their shared key, classify the
            difference, and keep the row-level evidence. The spreadsheet pile
            is what happens when no system is responsible for that work.
          </p>
          <p>
            Darpan is responsible for that work. The schema describes the
            shape of each source. The compare step pairs records by primary
            ID. The evidence is the saved run, the rules applied, the
            row-level trail. Nothing about that needs to happen in a
            workbook.
          </p>
          <p>
            <em>
              Sign on what’s there.
            </em>
          </p>
          <p style={{ marginTop: 56 }}>
            <a className="writing-all" href="/writing">
              ← All writing
            </a>
          </p>
        </article>
      </main>
    )
  }

  return (
    <main className="legal-page section-band">
      <article className="container legal-container">
        <span className="label-smallcaps">
          {entry?.date ?? ''}
          {entry?.date ? <span aria-hidden> · </span> : null}
          {entry?.category ?? 'Writing'}
        </span>
        <h1>{entry?.title ?? 'Post coming soon'}</h1>
        <p>
          This entry is being prepared. Check back, or see{' '}
          <a href="/writing">all writing</a>.
        </p>
      </article>
    </main>
  )
}
