import axios from 'axios'

export const getApiErrorMessage = (error: unknown, fallback: string): string => {
  if (!axios.isAxiosError(error)) {
    return fallback
  }

  if (!error.response) {
    return 'Unable to reach the server. Check your connection and try again.'
  }

  const responseData = error.response.data
  if (typeof responseData === 'object' && responseData !== null && 'error' in responseData) {
    const message = responseData.error
    if (typeof message === 'string' && message.length > 0) {
      return message
    }
  }

  if (error.response.status === 404) {
    return 'The requested resource was not found.'
  }

  if (error.response.status >= 500) {
    return 'The server could not complete the request. Try again later.'
  }

  return fallback
}
