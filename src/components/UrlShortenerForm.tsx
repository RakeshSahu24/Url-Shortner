import { useState, type FormEvent } from 'react'
import { ArrowUpRight, Link2 } from 'lucide-react'
import { createUrl } from '../api/urlApi'
import { getApiErrorMessage } from '../api/error'

interface UrlShortenerFormProps {
  onCreated: (shortId: string) => void
}

const UrlShortenerForm = ({ onCreated }: UrlShortenerFormProps) => {
  const [url, setUrl] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const value = url.trim()

    if (!value) {
      setError('Enter a URL to shorten.')
      return
    }

    setError('')
    setIsSubmitting(true)

    try {
      const response = await createUrl(value)
      setUrl('')
      onCreated(response.id)
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, 'The URL could not be shortened.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="panel" aria-labelledby="shorten-title">
      <div className="mb-6">
        <p className="eyebrow">Create a short link</p>
        <h2 id="shorten-title" className="section-title">
          Make a long URL easier to share
        </h2>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <label className="field-label" htmlFor="original-url">
          Original URL
        </label>
        <div className="input-with-icon">
          <Link2 aria-hidden="true" size={19} />
          <input
            id="original-url"
            name="url"
            type="text"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="https://example.com/your/long/url"
            autoComplete="url"
            disabled={isSubmitting}
            aria-describedby={error ? 'url-error' : undefined}
            aria-invalid={Boolean(error)}
          />
        </div>
        {error ? (
          <p id="url-error" className="form-error" role="alert">
            {error}
          </p>
        ) : null}
        <button className="primary-button mt-5 w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating short URL...' : 'Shorten URL'}
          {!isSubmitting ? <ArrowUpRight aria-hidden="true" size={18} /> : null}
        </button>
      </form>
    </section>
  )
}

export default UrlShortenerForm
