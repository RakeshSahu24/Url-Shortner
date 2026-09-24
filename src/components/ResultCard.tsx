import { useState } from 'react'
import { ArrowUpRight, Check, Copy, ExternalLink, Link2 } from 'lucide-react'
import { getBackendUrl } from '../api/client'

interface ResultCardProps {
  shortId: string
  onViewAnalytics: (shortId: string) => void
}

const ResultCard = ({ shortId, onViewAnalytics }: ResultCardProps) => {
  const [copied, setCopied] = useState(false)
  const shortUrl = getBackendUrl(`/url/${encodeURIComponent(shortId)}`)

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section className="result-card" aria-labelledby="result-title">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow text-emerald-700">Short URL ready</p>
          <h2 id="result-title" className="mt-1 text-lg font-semibold text-slate-950">
            Your link is ready to use
          </h2>
        </div>
        <div className="result-icon" aria-hidden="true">
          <Check size={20} />
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <a className="result-link" href={shortUrl} target="_blank" rel="noreferrer">
          <Link2 aria-hidden="true" size={18} />
          <span>{shortUrl}</span>
          <ExternalLink aria-hidden="true" size={16} className="ml-auto shrink-0" />
        </a>
        <button className="secondary-button shrink-0" type="button" onClick={copyUrl}>
          {copied ? <Check aria-hidden="true" size={17} /> : <Copy aria-hidden="true" size={17} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      <button className="text-button mt-5" type="button" onClick={() => onViewAnalytics(shortId)}>
        View visit analytics
        <ArrowUpRight aria-hidden="true" size={16} />
      </button>
    </section>
  )
}

export default ResultCard
