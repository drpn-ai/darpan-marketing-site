import type { CSSProperties } from 'react'
import { BreakList } from '@/components/BreakList'
import { MarkUnderline } from '@/components/home/MarkUnderline'
import { WALKTHROUGH_HREF } from '@/data/site'

const rise = (i: number) => ({ '--i': i }) as CSSProperties

export function Hero() {
  return (
    <section className="vl-hero" aria-labelledby="vl-hero-heading">
      <div>
        <span className="vl-kicker vl-rise" style={rise(0)}>
          Checks for the work between your systems
        </span>
        <h1 id="vl-hero-heading" className="vl-rise" style={rise(1)}>
          Your systems are up. Are they still{' '}
          <span className="mk">
            lining up
            <MarkUnderline />
          </span>
          ?
        </h1>
        <p className="vl-hero-lede vl-rise" style={rise(2)}>
          Your integrations report success. Darpan checks the outcome every
          morning, and keeps each break on a list &mdash; with its owner, its
          evidence and, where it can name one, its cause &mdash; until
          it&rsquo;s fixed.
        </p>
        <div className="vl-hero-cta vl-rise" style={rise(3)}>
          <a className="vl-cta" href={WALKTHROUGH_HREF}>
            Talk to us <span className="arr">&rarr;</span>
          </a>
          <a className="vl-textlink" href="/tour">
            See a morning&rsquo;s breaks <span aria-hidden>&#8599;</span>
          </a>
        </div>
      </div>

      <div className="vl-rise" style={rise(3)}>
        <BreakList
          title="This morning · 06:00"
          summary="2 open · 1 closed"
          label="This morning's list: order 1042 never reached NetSuite, stuck in Packed, owned by the warehouse; the exchange for order 1038 hasn't shipped because the original order is unfulfilled, owned by ops; order 1031 is now in NetSuite and closed."
          items={[
            {
              text: 'Order 1042 never reached NetSuite',
              meta: 'cause: stuck in Packed · owner: warehouse',
              state: 'open',
              badge: 'day 1',
            },
            {
              text: 'Exchange for order 1038 hasn’t shipped',
              meta: 'cause: original order unfulfilled · owner: ops',
              state: 'open',
              badge: 'day 1',
            },
            {
              text: 'Order 1031 now in NetSuite',
              meta: 'seen fixed by this morning’s check',
              state: 'closed',
              badge: 'closed',
            },
          ]}
        />
      </div>
    </section>
  )
}
