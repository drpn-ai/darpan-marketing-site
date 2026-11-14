import { createFileRoute } from '@tanstack/react-router'
import { VlPage } from '@/components/VlChrome'
import { TalkForm } from '@/components/TalkForm'
import { pageHead } from '@/data/site'

export const Route = createFileRoute('/talk')({
  component: TalkPage,
  head: () =>
    pageHead(
      '/talk',
      'Talk to us — Darpan',
      'Tell us which systems you run, and we’ll set up a walkthrough of a morning in Darpan.',
    ),
})

function TalkPage() {
  return (
    <VlPage>
      <section className="vl-band is-plain" aria-labelledby="talk-heading">
        <div className="vl-wrap vl-prose vl-prose-narrow">
          <span className="vl-kicker">Talk to us</span>
          <h1 id="talk-heading">Tell us which systems you run.</h1>
          <p className="vl-lede">
            We&rsquo;ll write back to set up a walkthrough of a morning in
            Darpan.
          </p>
          <TalkForm />
        </div>
      </section>
    </VlPage>
  )
}
