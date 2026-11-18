import { useEffect, useRef, useState } from 'react'

// The tour: the product video plus its stops. Each stop is one of the video's
// own numbered captions, at the second it appears (read from the v4 video,
// public/video/darpan-demo.mp4, 2:38). Pick a stop to jump there; the stop
// being shown lights up as the video plays.
// preload="none" keeps the 8.6 MB file off the wire until someone presses play
// or picks a stop; the poster carries the first impression. No audio track.
const ACTS = [
  {
    k: 'Act one',
    name: 'Build it in plain words',
    stops: [
      { t: 7, n: '01', p: 'Start a new audit. It begins empty.' },
      {
        t: 18,
        n: '02',
        p: 'Tell the agent how your business should run, in your own words.',
      },
      { t: 36, n: '03', p: 'Nothing changes until a person approves.' },
      {
        t: 53,
        n: '04',
        p: 'Then the rest of the order: shipping, returns, exchanges.',
      },
      { t: 84, n: '05', p: 'Tell it when to run.' },
    ],
  },
  {
    k: 'Act two',
    name: 'A real month, checked',
    stops: [
      {
        t: 101,
        n: '06',
        p: 'Every statement, checked against the storefront, order system and ERP.',
      },
      {
        t: 109,
        n: '07',
        p: 'Each break sits under its cause, with its owner and the fix.',
      },
      { t: 123, n: '08', p: 'Drift no one would catch by hand.' },
      {
        t: 135,
        n: '09',
        p: 'Every system, one list, each break with an owner.',
      },
      {
        t: 146,
        n: '10',
        p: 'It shows what it checked, so a quiet day can be trusted.',
      },
    ],
  },
] as const

const STOPS = ACTS.flatMap((act, ai) =>
  act.stops.map((s) => ({ ...s, act: ai })),
)
const END = 158 // the video's length in seconds
const endOf = (i: number) => STOPS[i + 1]?.t ?? END

const clock = (t: number) =>
  `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`

export function TourPlayer() {
  const video = useRef<HTMLVideoElement>(null)
  const [now, setNow] = useState(0)

  useEffect(() => {
    const v = video.current
    if (!v) return
    const onTime = () => setNow(v.currentTime)
    v.addEventListener('timeupdate', onTime)
    v.addEventListener('seeked', onTime)
    return () => {
      v.removeEventListener('timeupdate', onTime)
      v.removeEventListener('seeked', onTime)
    }
  }, [])

  // The stop on screen: the last one whose start has passed.
  let active = -1
  STOPS.forEach((s, i) => {
    if (now + 0.25 >= s.t) active = i
  })

  const go = (i: number) => {
    const v = video.current
    const stop = STOPS[i]
    if (!v || !stop) return
    v.currentTime = stop.t
    setNow(stop.t)
    void v.play().catch(() => {})
  }

  const current = STOPS[active]
  return (
    <figure className="vl-demo vl-tour" data-reveal>
      <video
        ref={video}
        className="vl-demo-video"
        controls
        muted
        playsInline
        preload="none"
        poster="/video/darpan-demo-poster.jpg"
        width={1920}
        height={1080}
        aria-label="Darpan demo: a team tells Darpan's agent how its business should run, approves the checks it drafts and sets when they run; then a real month is checked and every break is listed under its cause with its owner"
      >
        <source src="/video/darpan-demo.mp4" type="video/mp4" />
      </video>

      <div className="vl-tour-rail" role="group" aria-label="Tour stops">
        {ACTS.map((act, ai) => {
          const stops = STOPS.map((s, i) => ({ s, i })).filter(
            ({ s }) => s.act === ai,
          )
          const span = stops.reduce((n, { i }) => n + endOf(i) - STOPS[i].t, 0)
          return (
            <div className="vl-tour-act" key={act.k} style={{ flex: span }}>
              <span className="vl-tour-act-k">
                {act.k}
                <span className="name"> · {act.name}</span>
              </span>
              <div className="vl-tour-segs">
                {stops.map(({ s, i }) => {
                  const len = endOf(i) - s.t
                  const fill = Math.min(1, Math.max(0, (now - s.t) / len))
                  return (
                    <button
                      type="button"
                      key={s.n}
                      className={`vl-tour-seg${i === active ? ' is-active' : ''}`}
                      style={{ flex: len }}
                      aria-current={i === active ? 'step' : undefined}
                      aria-label={`Stop ${s.n}, ${clock(s.t)}: ${s.p}`}
                      title={s.p}
                      onClick={() => go(i)}
                    >
                      <span className="bar">
                        <span
                          className="fill"
                          style={{ transform: `scaleX(${fill})` }}
                        />
                      </span>
                      <span className="n">{s.n}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="vl-tour-now">
        <button
          type="button"
          className="vl-tour-step"
          onClick={() => go(active - 1)}
          disabled={active <= 0}
        >
          <span aria-hidden>&larr;</span> Previous
        </button>
        <p aria-live="polite">
          {current ? (
            <>
              <span className="vl-tour-now-k">
                {current.n} · {clock(current.t)}
              </span>
              {current.p}
            </>
          ) : (
            <>
              <span className="vl-tour-now-k">10 stops · 2:38</span>
              Press play, or pick any stop on the bar.
            </>
          )}
        </p>
        <button
          type="button"
          className="vl-tour-step is-next"
          onClick={() => go(active + 1)}
          disabled={active >= STOPS.length - 1}
        >
          {active < 0 ? 'Start the tour' : 'Next stop'}{' '}
          <span aria-hidden>&rarr;</span>
        </button>
      </div>

      <figcaption className="vl-demo-fine">
        From a brand that runs Darpan; names and ids changed. No sound.
      </figcaption>
    </figure>
  )
}
