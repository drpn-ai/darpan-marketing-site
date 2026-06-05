// Client gate for the WebGL "reconciliation lines" scene. On the server (and
// for reduced-motion users, browsers without WebGL, before hydration, or if the
// canvas errors) it renders a static SVG of the same idea. On the client with
// WebGL it lazy-loads the Three.js canvas, so the heavy 3D libs are never pulled
// into the SSR bundle.
import {
  Component,
  Suspense,
  lazy,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

const StackCanvas = lazy(() => import('./StackCanvas'))

const SCENE_LABEL =
  'A reconciliation readout: a column of record-lines shared across two systems. A level line means the systems line up; periodically one tilts as it silently drifts, glows amber, then snaps back level as Darpan catches and reconciles it.'

const ROWS = 6
const LEFT = 64
const RIGHT = 356
const TOP = 46
const STEP = 30
const DRIFT_ROW = 3 // the one shown mid-drift in the static frame

function StackFallback() {
  return (
    <div className="vl-lines-static" role="img" aria-label={SCENE_LABEL}>
      <svg viewBox="0 0 420 250" preserveAspectRatio="xMidYMid meet">
        {/* verification layer bar */}
        <rect x={LEFT - 8} y={18} width={RIGHT - LEFT + 16} height={4} rx={2} fill="#2f6b4f" opacity={0.55} />
        {Array.from({ length: ROWS }).map((_, i) => {
          const y = TOP + i * STEP
          const drift = i === DRIFT_ROW
          const ry = drift ? y - 16 : y
          const color = drift ? '#b0571b' : '#9a968a'
          return (
            <g key={i}>
              <circle cx={LEFT} cy={y} r={3} fill="#9a968a" />
              <line x1={LEFT} y1={y} x2={RIGHT} y2={ry} stroke={color} strokeWidth={drift ? 2.4 : 1.8} strokeLinecap="round" />
              <circle cx={RIGHT} cy={ry} r={drift ? 5 : 3.5} fill={color} />
            </g>
          )
        })}
      </svg>
    </div>
  )
}

function Legend() {
  return (
    <div className="vl-lines-legend" aria-hidden>
      <span><i className="d" /> lined up</span>
      <span><i className="d drift" /> drift caught</span>
      <span><i className="d resolved" /> reconciled</span>
    </div>
  )
}

// Falls back to the static SVG if the WebGL canvas throws (context loss, driver
// blocklist) instead of taking down the page.
class CanvasBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    if (this.state.failed) return <StackFallback />
    return this.props.children
  }
}

function webglAvailable() {
  try {
    const c = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (c.getContext('webgl2') || c.getContext('webgl'))
    )
  } catch {
    return false
  }
}

export function StackScene() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!webglAvailable()) return
    setShow(true)
  }, [])

  return (
    <div>
      {show ? (
        <div className="vl-canvas-wrap" role="img" aria-label={SCENE_LABEL}>
          <CanvasBoundary>
            <Suspense fallback={<StackFallback />}>
              <StackCanvas />
            </Suspense>
          </CanvasBoundary>
        </div>
      ) : (
        <StackFallback />
      )}
      <Legend />
    </div>
  )
}
