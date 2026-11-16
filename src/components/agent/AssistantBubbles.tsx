// Beside "Works where you do": Darpan in the middle, the assistants a team
// already uses floating around it, with pulses of light travelling between
// each one and Darpan, both ways, like a signal. No line, only the pulse.
// Logos: Claude, OpenAI (ChatGPT) and Gemini from simple-icons 15.0.0 (CC0),
// Cursor and MCP from @lobehub/icons-static-svg 1.65.0 (MIT); files in
// public/logos. Logos only; the names are in the aria-label and each title.
import type { CSSProperties } from 'react'
import { AI_CLIENTS } from '@/data/works-with'

const LOGOS: Record<string, string> = {
  Claude: '/logos/claude.svg',
  ChatGPT: '/logos/openai.svg',
  Gemini: '/logos/googlegemini.svg',
  Cursor: '/logos/cursor.svg',
  'Any MCP assistant': '/logos/mcp.svg',
}

// Wires live in a 125 x 100 box (the visual's 5:4 shape, so nothing stretches).
// Each one starts outside Darpan's glow and stops short of its logo, with room
// for the logo's float, so a wire never runs under a mark.
const CENTRE = { x: 62.5, y: 50 }
const GAP_CENTRE = 15
const GAP_LOGO = 7.5
const wire = (spot: { x: number; y: number }) => {
  const tx = spot.x * 1.25
  const ty = spot.y
  const dx = tx - CENTRE.x
  const dy = ty - CENTRE.y
  const len = Math.hypot(dx, dy)
  const ux = dx / len
  const uy = dy / len
  return {
    x1: CENTRE.x + ux * GAP_CENTRE,
    y1: CENTRE.y + uy * GAP_CENTRE,
    x2: tx - ux * GAP_LOGO,
    y2: ty - uy * GAP_LOGO,
  }
}

// Bubble centres as % of the box (x, y), and how each one drifts.
const SPOTS = [
  { x: 22, y: 20, d: 0, t: 5.2 },
  { x: 78, y: 16, d: 1.2, t: 6.1 },
  { x: 88, y: 58, d: 0.6, t: 4.6 },
  { x: 20, y: 76, d: 1.8, t: 5.6 },
  { x: 66, y: 88, d: 0.9, t: 6.6 },
] as const

// One electrical pulse: a bright head with a soft halo and a fading tail,
// fired along the path in the first third of each cycle, then dark until the
// next. SVG animation, so it runs without JS; reduced motion hides it.
const CYCLE = 3.2
// Tail points close enough together to overlap into one streak.
const TAIL = Array.from({ length: 14 }, (_, n) => (n + 1) * 0.018)

function Comet({
  path,
  begin,
  faint = false,
}: {
  path: string
  begin: number
  faint?: boolean
}) {
  const motion = (delay: number) => (
    <>
      <animateMotion
        path={path}
        dur={`${CYCLE}s`}
        begin={`${begin + delay}s`}
        repeatCount="indefinite"
        keyPoints="0;1;1"
        keyTimes="0;0.3;1"
        calcMode="linear"
      />
      <animate
        attributeName="opacity"
        values="1;1;0;0"
        keyTimes="0;0.29;0.31;1"
        dur={`${CYCLE}s`}
        begin={`${begin + delay}s`}
        repeatCount="indefinite"
      />
    </>
  )
  const k = faint ? 0.7 : 1
  return (
    <g className={`vl-comet${faint ? ' is-faint' : ''}`}>
      <circle r={1.3 * k} className="vl-comet-halo" opacity="0">
        {motion(0)}
      </circle>
      {TAIL.map((d, n) => (
        <circle
          key={d}
          r={(0.5 - n * 0.031) * k}
          className="vl-comet-tail"
          opacity="0"
          style={{ fillOpacity: 0.55 - n * 0.037 }}
        >
          {motion(d)}
        </circle>
      ))}
      <circle r={0.55 * k} className="vl-comet-head" opacity="0">
        {motion(0)}
      </circle>
    </g>
  )
}

export function AssistantBubbles() {
  return (
    <div
      className="vl-bubbles"
      data-reveal
      role="img"
      aria-label={`Darpan in the middle, joined to ${AI_CLIENTS.join(', ')}.`}
    >
      <svg className="vl-bubbles-lines" viewBox="0 0 125 100" aria-hidden>
        {SPOTS.map((s, i) => {
          const w = wire(s)
          const inward = `M${w.x2} ${w.y2} L${w.x1} ${w.y1}`
          const outward = `M${w.x1} ${w.y1} L${w.x2} ${w.y2}`
          return (
            <g key={`${s.x}-${s.y}`}>
              <Comet path={inward} begin={i * 0.7} />
              <Comet path={outward} begin={1.6 + i * 0.7} faint />
            </g>
          )
        })}
      </svg>
      <span className="vl-bubble is-darpan" style={{ left: '50%', top: '50%' }}>
        <img src="/darpan-mark.svg" alt="" width={64} height={64} />
      </span>
      {AI_CLIENTS.map((name, i) => (
        <span
          key={name}
          className="vl-bubble"
          title={name}
          style={
            {
              left: `${SPOTS[i].x}%`,
              top: `${SPOTS[i].y}%`,
              '--d': `${SPOTS[i].d}s`,
              '--t': `${SPOTS[i].t}s`,
            } as CSSProperties
          }
        >
          <img src={LOGOS[name]} alt="" width={44} height={44} />
        </span>
      ))}
    </div>
  )
}
