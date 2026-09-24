export interface CreateUrlResponse {
  id: string
}

export interface Visit {
  timestamp: number
}

export interface AnalyticsResponse {
  totalClicks: number
  visitHistory: Visit[]
}
