import axios from 'axios'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getBackendUrl = (path: string): string => {
  const baseUrl = import.meta.env.VITE_PUBLIC_BACKEND_URL.replace(/\/$/, '')
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`
}
