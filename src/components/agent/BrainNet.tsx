// The brain as a living network: the systems a company runs feed in on the
// left, become facts, facts become causes, and causes answer the checks on the
// right. Light travels the routes continuously (SVG animateMotion, so it runs
// without JS); one route ends on an orange cause, a break being found. Edges
// draw themselves in when the picture scrolls into view. Reduced motion: the
// network shows still, with no pulses.

type Node = { x: number; y: number }

const INPUTS = ['Storefront', 'Order system', 'ERP', 'Payments', 'Warehouse']
const CHECKS = [
  'Every exchange ships',
  'Refunds are booked',
  'Store sales are billed',
  'Nothing left open',
]

const X = { in: 150, fact: 268, cause: 386, check: 504 }

const column = (x: number, count: number, top: number, bottom: number) =>
  Array.from({ length: count }, (_, i) => ({
    x,
    y: top + ((bottom - top) * i) / (count - 1),
  }))

const inputs = column(X.in, INPUTS.length, 110, 430)
const facts = column(X.fact, 7, 78, 462)
const causes = column(X.cause, 6, 100, 440)
const checks = column(X.check, CHECKS.length, 150, 390)

// Fixed wiring, so the picture is the same on the server and in the browser.
const IN_FACT = [
  [0, 0],
  [0, 1],
  [0, 3],
  [1, 1],
  [1, 2],
  [1, 4],
  [2, 2],
  [2, 3],
  [2, 5],
  [3, 3],
  [3, 4],
  [3, 6],
  [4, 4],
  [4, 5],
  [4, 6],
] as const
const FACT_CAUSE = [
  [0, 0],
  [0, 1],
  [1, 0],
  [1, 2],
  [2, 1],
  [2, 3],
  [3, 2],
  [3, 3],
  [3, 4],
  [4, 3],
  [4, 4],
  [5, 4],
  [5, 5],
  [6, 5],
  [6, 3],
] as const
const CAUSE_CHECK = [
  [0, 0],
  [1, 0],
  [1, 1],
  [2, 1],
  [3, 2],
  [3, 1],
  [4, 2],
  [4, 3],
  [5, 3],
] as const

// The cause that lights orange: a break found this morning.
const BREAK_CAUSE = 3

const curve = (a: Node, b: Node) =>
  `M${a.x} ${a.y} C${a.x + 56} ${a.y} ${b.x - 56} ${b.y} ${b.x} ${b.y}`

const route = (i: number, f: number, c: number, k?: number) => {
  const parts = [
    curve(inputs[i], facts[f]),
    curve(facts[f], causes[c]).replace(/^M[^C]+/, ''),
  ]
  if (k !== undefined)
    parts.push(curve(causes[c], checks[k]).replace(/^M[^C]+/, ''))
  return parts.join(' ')
}

// Routes the light travels: input -> fact -> cause (-> check).
const ROUTES: ReadonlyArray<{
  d: string
  tone: 'ok' | 'break'
  delay: number
}> = [
  { d: route(0, 0, 0, 0), tone: 'ok', delay: 0 },
  { d: route(1, 2, 1, 1), tone: 'ok', delay: 0.6 },
  { d: route(2, 5, 4, 3), tone: 'ok', delay: 1.2 },
  { d: route(3, 4, 4, 2), tone: 'ok', delay: 1.8 },
  { d: route(4, 6, 5, 3), tone: 'ok', delay: 2.4 },
  { d: route(2, 3, BREAK_CAUSE), tone: 'break', delay: 0.9 },
  { d: route(1, 1, 0, 0), tone: 'ok', delay: 3.0 },
  { d: route(0, 3, 2, 1), tone: 'ok', delay: 3.6 },
  { d: route(3, 3, BREAK_CAUSE), tone: 'break', delay: 2.7 },
  { d: route(4, 5, 5, 3), tone: 'ok', delay: 4.2 },
]

export function BrainNet() {
  return (
    <div className="vl-net" data-reveal>
      <svg
        viewBox="0 0 680 520"
        role="img"
        aria-label="Darpan's brain as a network: the storefront, order system, ERP, payments and warehouse feed facts, facts feed causes, and causes answer checks such as every exchange ships. Light travels through it; one cause glows orange where a break is found."
      >
        <g className="vl-net-titles">
          <text x={X.in} y="36">
            Reads
          </text>
          <text x={X.fact} y="36">
            Facts
          </text>
          <text x={X.cause} y="36">
            Causes
          </text>
          <text x={X.check} y="36">
            Checks
          </text>
        </g>

        <g className="vl-net-edges">
          {IN_FACT.map(([a, b]) => (
            <path
              key={`if${a}-${b}`}
              d={curve(inputs[a], facts[b])}
              pathLength={100}
            />
          ))}
          {FACT_CAUSE.map(([a, b]) => (
            <path
              key={`fc${a}-${b}`}
              d={curve(facts[a], causes[b])}
              pathLength={100}
            />
          ))}
          {CAUSE_CHECK.map(([a, b]) => (
            <path
              key={`cc${a}-${b}`}
              d={curve(causes[a], checks[b])}
              pathLength={100}
            />
          ))}
        </g>

        <g className="vl-net-pulses">
          {ROUTES.map((r) => (
            <circle
              key={r.d}
              r="4"
              opacity="0"
              className={`vl-net-pulse is-${r.tone}`}
            >
              {/* Hidden until its first run starts, so it never sits at 0,0. */}
              <set attributeName="opacity" to="1" begin={`${r.delay}s`} />
              <animateMotion
                dur="3.6s"
                begin={`${r.delay}s`}
                repeatCount="indefinite"
                path={r.d}
                keyPoints="0;1"
                keyTimes="0;1"
                calcMode="spline"
                keySplines="0.4 0 0.2 1"
              />
            </circle>
          ))}
        </g>

        <g className="vl-net-nodes">
          {inputs.map((n, i) => (
            <g key={`in${i}`}>
              <circle cx={n.x} cy={n.y} r="9" className="vl-net-node is-in" />
              <text x={n.x - 18} y={n.y + 4} className="vl-net-label is-left">
                {INPUTS[i]}
              </text>
            </g>
          ))}
          {facts.map((n, i) => (
            <circle
              key={`f${i}`}
              cx={n.x}
              cy={n.y}
              r="6"
              className="vl-net-node is-fact"
              style={{ animationDelay: `${i * 0.35}s` }}
            />
          ))}
          {causes.map((n, i) => (
            <g key={`c${i}`}>
              {i === BREAK_CAUSE && (
                <circle cx={n.x} cy={n.y} r="16" className="vl-net-ring" />
              )}
              <circle
                cx={n.x}
                cy={n.y}
                r="7"
                className={`vl-net-node ${i === BREAK_CAUSE ? 'is-break' : 'is-cause'}`}
                style={{ animationDelay: `${i * 0.4 + 0.2}s` }}
              />
            </g>
          ))}
          {checks.map((n, i) => (
            <g key={`k${i}`}>
              <circle
                cx={n.x}
                cy={n.y}
                r="10"
                className="vl-net-node is-check"
              />
              <path
                d={`M${n.x - 4} ${n.y} l3 3 l5 -6`}
                className="vl-net-tick"
              />
              <text x={n.x + 20} y={n.y + 4} className="vl-net-label">
                {CHECKS[i]}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  )
}
