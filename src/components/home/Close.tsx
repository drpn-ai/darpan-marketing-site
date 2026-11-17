import { PageClose } from '@/components/PageClose'

export function Close() {
  return (
    <PageClose
      id="talk"
      title={
        <>
          <span className="vl-line">Make every morning a close day.</span>{' '}
          <span className="vl-line">
            Each break gets fixed while it&rsquo;s still small.
          </span>
        </>
      }
      link={{ href: '/tour', label: 'Watch the three-minute tour' }}
    />
  )
}
