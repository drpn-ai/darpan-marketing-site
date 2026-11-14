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
          For ops teams running Shopify, an OMS and an ERP
        </span>
        <h1 id="vl-hero-heading" className="vl-rise" style={rise(1)}>
          Every sync says it worked. Nobody{' '}
          <span className="mk">
            checks
            <MarkUnderline />
          </span>{' '}
          that it did.
        </h1>
        <p className="vl-hero-lede vl-rise" style={rise(2)}>
          Tell Darpan, in plain words, how your business runs. Every morning it
          checks that each order, return and refund reached every system it
          was meant to, and lists each one that didn&rsquo;t, with the team
          that owns the fix.
        </p>
        <div className="vl-hero-cta vl-rise" style={rise(3)}>
          <a className="vl-cta" href={WALKTHROUGH_HREF}>
            Talk to us <span className="arr">&rarr;</span>
          </a>
          <a className="vl-textlink" href="/tour">
            See a morning&rsquo;s breaks <span aria-hidden>&#8599;</span>
          </a>
        </div>
        <p className="vl-hero-proof vl-rise" style={rise(4)}>
          Running every morning at five-plus brands. Your first list arrives a
          day after you connect.
        </p>
      </div>

      <div className="vl-rise" style={rise(3)}>
        <BreakList
          title="This morning · 06:00"
          summary="2 open · 1 closed"
          label="This morning's list: order 1053 never reached NetSuite, stuck in Packed, owned by the warehouse; the exchange for order 1049 hasn't shipped because the original order is unfulfilled, owned by ops; order 1031 is now in NetSuite and closed."
          items={[
            {
              text: 'Order 1053 never reached NetSuite',
              meta: 'cause: stuck in Packed · owner: warehouse',
              state: 'open',
              badge: 'day 1',
            },
            {
              text: 'Exchange for order 1049 hasn’t shipped',
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
