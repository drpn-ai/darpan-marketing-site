// Hand-drawn underline that draws itself under the brand phrase "lining up".
// Inline SVG using the same stroke-dashoffset technique as the notebook doodles
// (NotebookDoodle); the draw-in is triggered in CSS (.vl-underline-path), so
// this stays a dumb, SSR-safe marker that renders fully drawn without JS.
export function MarkUnderline() {
  return (
    <svg
      className="vl-underline"
      viewBox="0 0 240 16"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden
    >
      <path
        className="vl-underline-path"
        pathLength={100}
        d="M 4,10 Q 22,4 44,8 T 88,8 Q 110,12 132,7 T 176,7 Q 198,12 220,6 T 236,9"
        stroke="currentColor"
        strokeWidth={2.6}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
