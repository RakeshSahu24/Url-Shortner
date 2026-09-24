import { useState } from 'react'
import { Link as LinkIcon } from 'lucide-react'
import AnalyticsCard from './components/AnalyticsCard'
import ResultCard from './components/ResultCard'
import UrlShortenerForm from './components/UrlShortenerForm'

const App = () => {
  const [createdId, setCreatedId] = useState<string | null>(null)
  const [analyticsId, setAnalyticsId] = useState<string | undefined>()

  const handleCreated = (shortId: string) => {
    setCreatedId(shortId)
    setAnalyticsId(shortId)
  }

  const handleViewAnalytics = (shortId: string) => {
    setAnalyticsId(shortId)
    document.getElementById('analytics')?.scrollIntoView({ block: 'start' })
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="/" aria-label="URL Shortener home">
          <span className="brand-mark" aria-hidden="true">
            <LinkIcon size={17} />
          </span>
          <span>URL Shortener</span>
        </a>
        <span className="header-note">Simple links, clear insights</span>
      </header>

      <main>
        <section className="hero">
          <p className="eyebrow">A focused URL shortener</p>
          <h1>Short links without the noise.</h1>
          <p className="hero-copy">
            Turn a long URL into a compact link, then check the visit activity recorded by the service.
          </p>
        </section>

        <div className="content-grid">
          <UrlShortenerForm onCreated={handleCreated} />
          <div id="analytics">
            <AnalyticsCard initialShortId={analyticsId} />
          </div>
        </div>

        {createdId ? (
          <div className="mt-5">
            <ResultCard shortId={createdId} onViewAnalytics={handleViewAnalytics} />
          </div>
        ) : (
          <div className="empty-state mt-5">
            <span className="empty-rule" aria-hidden="true" />
            <p>Create a short URL to see it here.</p>
          </div>
        )}
      </main>

      <footer className="site-footer">
        <span>Built for straightforward link sharing.</span>
      </footer>
    </div>
  )
}

export default App
