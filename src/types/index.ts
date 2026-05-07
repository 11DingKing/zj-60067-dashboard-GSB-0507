export interface Server {
  id: string
  ip: string
  name: string
  status: 'online' | 'offline' | 'warning'
  cpu: number
  memory: number
  disk: number
  city: string
}

export interface Alert {
  id: string
  time: string
  server: string
  level: 'critical' | 'warning' | 'info'
  content: string
}

export interface TrendData {
  time: string
  cpu: number
  memory: number
}

export interface NetworkData {
  time: string
  inbound: number
  outbound: number
}

export interface DiskUsage {
  name: string
  used: number
  total: number
  percentage: number
}

export interface OverviewData {
  total: number
  online: number
  offline: number
  warning: number
}

export interface CityServer {
  name: string
  x: number
  y: number
  count: number
  health: 'good' | 'warning' | 'critical'
}
