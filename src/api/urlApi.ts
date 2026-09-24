import { apiClient } from './client'
import type { AnalyticsResponse, CreateUrlResponse } from '../types/url'

export const createUrl = async (url: string): Promise<CreateUrlResponse> => {
  const response = await apiClient.post<CreateUrlResponse>('/url', { url })
  return response.data
}

export const getAnalytics = async (shortId: string): Promise<AnalyticsResponse> => {
  const response = await apiClient.get<AnalyticsResponse>(`/url/${encodeURIComponent(shortId)}/analytics`)
  return response.data
}
