// The agent page's moving pictures. Each one plays once, step by step, when it
// scrolls into view (`.vl-scene.is-in`, set by useReveal); without JS or with
// reduced motion every step shows at once. Order numbers, times and names are
// illustration; the facts they stand for are in the Facts register.
import type { CSSProperties, ReactNode } from 'react'

const step = (i: number) => ({ '--i': i }) as CSSProperties

function Step({
  i,
  className = '',
  children,
}: {
  i: number
  className?: string
  children: ReactNode
}) {
  return (
    <div className={`vl-scene-step ${className}`} style={step(i)}>
      {children}
    </div>
  )
}

function Msg({
  i,
  you = false,
  who,
  time,
  children,
}: {
  i: number
  you?: boolean
  who: string
  time: string
  children: ReactNode
}) {
  return (
    <Step i={i} className={`vl-msg${you ? ' is-you' : ''}`}>
      <span className="vl-msg-avatar" aria-hidden>
        {who.charAt(0)}
      </span>
      <span className={you ? 'vl-chat-you' : 'vl-chat-agent'}>
        <span className="vl-msg-meta">
          {who} · {time}
        </span>
        {children}
      </span>
    </Step>
  )
}

// Tell it: one sentence, the phrases in it that become checks, the checks
// the agent writes from them, and one rule nobody said. Numbers tie each
// phrase to its check.
export function AgentChat() {
  return (
    <div
      className="vl-scene vl-tell"
      data-reveal
      role="img"
      aria-label="You say: every exchange we approve should ship; if one is cancelled, nothing should stay open in the ERP. Darpan's agent writes check 1, every exchange we approve ships, and check 2, a cancelled exchange leaves nothing open in the ERP, plus one you didn't say: a piece is returned or claimed under warranty, never both. Approve all three."
    >
      <Step i={0} className="vl-tell-said">
        <span className="vl-tell-k">You say</span>
        <span className="vl-tell-quote">
          Every exchange we approve <mark data-n="1">should ship</mark>. If one
          is cancelled,{' '}
          <mark data-n="2">nothing should stay open in the ERP</mark>.
        </span>
      </Step>
      <Step i={1} className="vl-tell-k is-agent">
        Darpan’s agent writes
      </Step>
      <Step i={2} className="vl-tell-check">
        <span className="vl-tell-n">1</span>
        <span>
          <span className="vl-tell-text">Every exchange we approve ships.</span>
          <span className="vl-tell-meta">Storefront ↔ WMS · every morning</span>
        </span>
      </Step>
      <Step i={3} className="vl-tell-check">
        <span className="vl-tell-n">2</span>
        <span>
          <span className="vl-tell-text">
            A cancelled exchange leaves nothing open in the ERP.
          </span>
          <span className="vl-tell-meta">Storefront ↔ ERP · every morning</span>
        </span>
      </Step>
      <Step i={4} className="vl-tell-check is-new">
        <span className="vl-tell-n">+</span>
        <span>
          <span className="vl-tell-text">
            A piece is returned or claimed under warranty, never both.
          </span>
          <span className="vl-tell-meta">One you didn’t say</span>
        </span>
      </Step>
      <Step i={5} className="vl-tell-approve">
        <span>Approve all 3</span>
      </Step>
    </div>
  )
}

const ORDERS = [
  '#1043',
  '#1051',
  '#1066',
  '#1072',
  '#1089',
  '#1093',
  '#1101',
  '#1117',
]

// Teach it once: one explanation becomes a cause applied across orders.
export function TeachScene() {
  return (
    <div
      className="vl-scene vl-teach"
      data-reveal
      role="img"
      aria-label="A conversation on a break, exchange isn't in the ERP. Darpan asks why. Retail ops says it is waiting on its original order, which hasn't shipped. Darpan asks whether to treat every exchange like that the same way; retail ops says yes. Darpan replies that eight more this morning are the same, explained and assigned to retail ops."
    >
      <div className="vl-finding">
        <div className="vl-finding-top">
          <span className="vl-finding-status">Open</span>
          <span className="vl-finding-meta">Order 1066 · exchange</span>
          <span className="vl-finding-since">day 1</span>
        </div>
        <div className="vl-finding-title">Exchange isn’t in the ERP</div>
        <div className="vl-finding-sides">
          <span>
            <span className="vl-finding-k">Storefront · Exchange</span>
            Completed
          </span>
          <span>
            <span className="vl-finding-k">ERP · Sales order</span>
            <span className="is-missing">Not found</span>
          </span>
        </div>
      </div>
      <Msg i={0} who="Darpan" time="8:02 AM">
        This exchange never reached the ERP. Do you know why?
      </Msg>
      <Msg i={1} you who="Retail ops" time="8:14 AM">
        It’s waiting on its original order. That one hasn’t shipped yet, so the
        exchange is held.
      </Msg>
      <Msg i={2} who="Darpan" time="8:14 AM">
        That makes sense. Should I treat every exchange waiting on its original
        order the same way?
      </Msg>
      <Msg i={3} you who="Retail ops" time="8:15 AM">
        Yes, please.
      </Msg>
      <Msg i={4} who="Darpan" time="8:15 AM">
        Done. Eight more this morning are the same. Each one is explained and
        assigned to retail ops.
        <span className="vl-teach-chips">
          {ORDERS.map((o, n) => (
            <span key={o} style={{ '--j': n } as CSSProperties}>
              {o}
            </span>
          ))}
        </span>
      </Msg>
    </div>
  )
}

// Why it's fast: repeat calls with every check reading for itself, and with one brain.
export function CallsScene() {
  return (
    <div
      className="vl-scene vl-calls"
      data-reveal
      role="img"
      aria-label="Repeat questions in one morning: about 1,500 when checking rule by rule, none with Darpan’s brain."
    >
      <div className="vl-calls-row">
        <span className="vl-calls-label">Checking rule by rule</span>
        <span className="vl-calls-track">
          <span className="vl-calls-bar is-before" />
        </span>
        <span className="vl-calls-value">≈1,500 repeat questions</span>
      </div>
      <div className="vl-calls-row">
        <span className="vl-calls-label">Darpan’s brain</span>
        <span className="vl-calls-track">
          <span className="vl-calls-bar is-after" />
        </span>
        <span className="vl-calls-value is-good">none repeated</span>
      </div>
    </div>
  )
}
