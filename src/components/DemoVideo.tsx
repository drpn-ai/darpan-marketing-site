// The product demo: a team's own words become checks, then a real month close.
// preload="none" keeps the 8.6 MB file (1080p, 60 fps) off the wire until someone presses play;
// the poster carries the first impression. No audio track; captions are burned in.
export function DemoVideo() {
  return (
    <figure className="vl-demo" data-reveal>
      <video
        className="vl-demo-video"
        controls
        muted
        playsInline
        preload="none"
        poster="/video/darpan-demo-poster.jpg"
        width={1920}
        height={1080}
        aria-label="Darpan demo: a team describes how its month should close, Darpan writes the checks, then a real month close lists each break with its owner"
      >
        <source src="/video/darpan-demo.mp4" type="video/mp4" />
      </video>
      <figcaption className="vl-demo-caption">
        A team tells Darpan, in plain words, how its month should close, and
        Darpan writes the checks. Then a real month close: every break, with
        the team that owns it and what to do next.{' '}
        <span className="vl-demo-fine">
          From a brand that runs Darpan; names and ids changed. Under three
          minutes, no sound.
        </span>
      </figcaption>
    </figure>
  )
}
