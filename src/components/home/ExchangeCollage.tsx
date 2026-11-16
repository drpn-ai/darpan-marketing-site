// Beside "From production": the storefront's cancelled exchange and the WMS's
// packing slip for the same replacement, both telling the truth; then the
// morning Darpan read both, with the break on its first list.
import type { Ref } from 'react'
import { Collage, ListCard, at } from '@/components/home/Collage'

export function ExchangeCollage({
  settled,
  visualRef,
}: {
  settled: boolean
  visualRef: Ref<HTMLDivElement>
}) {
  return (
    <Collage
      visualRef={visualRef}
      settled={settled}
      label="Before: the storefront shows the exchange cancelled by the fraud screen, while the WMS packing slip for the replacement is stamped shipped. After: Darpan's first morning list joins the two, with the exchange and eight more like it."
      before={
        <>
          <div
            className="vl-col-item vl-col-box"
            style={at(300, 250, 230, 6)}
          />
          <div
            className="vl-col-item vl-col-panel"
            style={at(30, 66, 286, -2.5)}
          >
            <div className="vl-col-panel-head">
              <span>Storefront · Exchanges</span>
              <span className="vl-col-dots" />
            </div>
            <div className="vl-col-panel-body">
              <div className="vl-col-panel-row">
                <span className="vl-col-title">Exchange request</span>
                <span className="vl-col-pill">Cancelled</span>
              </div>
              <div className="vl-col-panel-row is-start">
                <span className="vl-col-thumb" />
                <span>
                  <span className="vl-col-text">1 pair, size swap</span>
                  <span className="vl-col-meta">
                    Flagged by the fraud screen
                  </span>
                </span>
              </div>
              <div className="vl-col-panel-foot">No replacement will ship.</div>
            </div>
          </div>
          <div className="vl-col-item vl-col-slip" style={at(262, 196, 250, 3)}>
            <span className="vl-col-slip-kicker">PACKING SLIP · WMS</span>
            <span className="vl-col-text">Replacement · 1 pair</span>
            <span className="vl-col-barcode" />
            <span className="vl-col-meta">
              Picked · packed · handed to carrier
            </span>
            <span className="vl-col-stamp">SHIPPED</span>
          </div>
        </>
      }
      after={
        <>
          <div
            className="vl-col-item vl-col-panel is-mini"
            style={at(36, 70, 210)}
          >
            <div className="vl-col-panel-body">
              <span className="vl-col-meta">Storefront · Exchanges</span>
              <div className="vl-col-panel-row">
                <span className="vl-col-text">Exchange request</span>
                <span className="vl-col-pill">Cancelled</span>
              </div>
            </div>
          </div>
          <div
            className="vl-col-item vl-col-slip is-mini"
            style={at(314, 70, 210)}
          >
            <span className="vl-col-slip-kicker">PACKING SLIP · WMS</span>
            <div className="vl-col-panel-row">
              <span className="vl-col-text">Replacement</span>
              <span className="vl-col-stamp is-inline">SHIPPED</span>
            </div>
          </div>
          <svg
            className="vl-col-threads"
            viewBox="0 0 560 480"
            preserveAspectRatio="none"
          >
            <path d="M141 142 C141 200 220 200 250 256" />
            <path d="M419 142 C419 200 340 200 310 256" />
          </svg>
          <ListCard
            style={at(80, 256, 400)}
            title="First morning · 06:00"
            summary="9 open"
            rows={[
              {
                text: 'Exchange cancelled, replacement shipped',
                meta: 'storefront: cancelled · WMS: shipped',
                badge: 'day 1',
                open: true,
              },
              {
                text: 'Eight more, same break',
                meta: 'each with the team that owns it',
                badge: 'day 1',
                open: true,
              },
            ]}
          />
        </>
      }
    />
  )
}
