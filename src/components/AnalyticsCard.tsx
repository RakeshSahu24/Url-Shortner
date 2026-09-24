import { useEffect, useState, type FormEvent } from 'react'
import { BarChart3, CalendarDays, MousePointerClick } from 'lucide-react'
import { getAnalytics } from '../api/urlApi'
import { getApiErrorMessage } from '../api/error'
import type { AnalyticsResponse } from '../types/url'

interface AnalyticsCardProps {
  initialShortId?: string
}

const formatTimestamp = (timestamp: number): string =>
  new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(timestamp))

const AnalyticsCard = ({ initialShortId }: AnalyticsCardProps) => {
  const [shortId, setShortId] = useState(initialShortId ?? '')
  const [analytics, setAnalytics] = useState<AnalyticsResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (initialShortId) {
      setShortId(initialShortId)
    }
  }, [initialShortId])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const value = shortId.trim()

    if (!value) {
      setError('Enter a short ID to view analytics.')
      return
    }

    setError('')
    setIsLoading(true)
    setAnalytics(null)

    try {
      setAnalytics(await getAnalytics(value))
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, 'Analytics could not be loaded.'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="panel" aria-labelledby="analytics-title">
      <div className="mb-6 flex items-start gap-3">
        <div className="section-icon" aria-hidden="true">
          <BarChart3 size={19} />
        </div>
        <div>
          <p className="eyebrow">Visit analytics</p>
          <h2 id="analytics-title" className="section-title">
            See how often a short link is visited
          </h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <label className="field-label" htmlFor="short-id">
          Short ID
        </label>
        <input
          id="short-id"
          name="shortId"
          type="text"
          value={shortId}
          onChange={(event) => setShortId(event.target.value)}
          placeholder="Enter the short ID"
          autoComplete="off"
          disabled={isLoading}
          aria-describedby={error ? 'analytics-error' : undefined}
          aria-invalid={Boolean(error)}
        />
        {error ? (
          <p id="analytics-error" className="form-error" role="alert">
            {error}
          </p>
        ) : null}
        <button className="secondary-button mt-5 w-full" type="submit" disabled={isLoading}>
          {isLoading ? 'Loading analytics...' : 'Load analytics'}
        </button>
      </form>

      {isLoading ? (
        <div className="empty-state mt-5" role="status">
          <span className="loading-dot" />
          <span>Requesting visit data...</span>
        </div>
      ) : null}

      {analytics ? (
        <div className="mt-5 border-t border-slate-200 pt-5">
          <div className="analytics-summary">
            <MousePointerClick aria-hidden="true" size={18} />
            <span>Total visits</span>
            <strong>{analytics.totalClicks}</strong>
          </div>
          {analytics.visitHistory.length > 0 ? (
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-slate-800">Visit history</h3>
              <ul className="visit-list" aria-label="Visit history">
                {analytics.visitHistory.map((visit, index) => (
                  <li key={`${visit.timestamp}-${index}`} className="visit-item">
                    <CalendarDays aria-hidden="true" size={16} />
                    <span>{formatTimestamp(visit.timestamp)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="empty-copy mt-4">No visits have been recorded for this short ID yet.</p>
          )}
        </div>
      ) : null}
    </section>
  )
}

export default AnalyticsCard
