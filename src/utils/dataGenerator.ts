import type { Server, Alert, TrendData, NetworkData, DiskUsage, CityServer } from '../types'
import mockData from '../data/mockData.json'

const CPU_THRESHOLD = 80
const MEMORY_THRESHOLD = 85
const DISK_THRESHOLD = 90

const previousValues: Record<string, { cpu: number; memory: number; disk: number }> = {}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

function fluctuate(value: number, maxChange: number, min: number, max: number): number {
  const change = (Math.random() - 0.5) * maxChange * 2
  return clamp(Math.round((value + change) * 10) / 10, min, max)
}

export function generateServers(): Server[] {
  const now = new Date()
  
  return mockData.servers.map((srv) => {
    const prev = previousValues[srv.id] || { cpu: 45, memory: 60, disk: 70 }
    
    const cpu = fluctuate(prev.cpu, 5, 10, 95)
    const memory = fluctuate(prev.memory, 3, 20, 98)
    const disk = fluctuate(prev.disk, 1, 30, 99)
    
    previousValues[srv.id] = { cpu, memory, disk }
    
    let status: Server['status'] = 'online'
    
    if (cpu > CPU_THRESHOLD || memory > MEMORY_THRESHOLD) {
      status = 'warning'
    }
    
    const offlineChance = Math.random() < 0.02
    if (offlineChance && now.getSeconds() % 15 === 0) {
      status = 'offline'
    }
    
    return {
      id: srv.id,
      ip: srv.ip,
      name: srv.name,
      status,
      cpu,
      memory,
      disk,
      city: srv.city
    }
  })
}

export function generateTrendData(prevData: TrendData[] = [], count: number = 60): TrendData[] {
  const now = new Date()
  const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
  
  const lastCpu = prevData.length > 0 ? prevData[prevData.length - 1].cpu : 45
  const lastMemory = prevData.length > 0 ? prevData[prevData.length - 1].memory : 60
  
  const newData: TrendData = {
    time: timeStr,
    cpu: fluctuate(lastCpu, 4, 15, 90),
    memory: fluctuate(lastMemory, 3, 30, 95)
  }
  
  const result = [...prevData, newData]
  if (result.length > count) {
    return result.slice(result.length - count)
  }
  return result
}

export function generateNetworkData(prevData: NetworkData[] = [], count: number = 60): NetworkData[] {
  const now = new Date()
  const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
  
  const lastInbound = prevData.length > 0 ? prevData[prevData.length - 1].inbound : 500
  const lastOutbound = prevData.length > 0 ? prevData[prevData.length - 1].outbound : 300
  
  const newData: NetworkData = {
    time: timeStr,
    inbound: fluctuate(lastInbound, 80, 100, 999),
    outbound: fluctuate(lastOutbound, 50, 50, 800)
  }
  
  const result = [...prevData, newData]
  if (result.length > count) {
    return result.slice(result.length - count)
  }
  return result
}

export function generateDiskUsage(servers: Server[]): DiskUsage[] {
  return servers.map((srv) => ({
    name: srv.name,
    used: Math.round(srv.disk * 10) / 10,
    total: 100,
    percentage: srv.disk
  }))
}

const alertContents = {
  critical: [
    '服务器响应超时',
    'CPU使用率超过95%',
    '内存不足',
    '磁盘空间告警',
    '数据库连接失败'
  ],
  warning: [
    'CPU使用率超过80%',
    '内存使用率超过85%',
    '网络延迟较高',
    '磁盘IO繁忙',
    '服务响应时间增加'
  ],
  info: [
    '用户登录成功',
    '配置已更新',
    '服务启动成功',
    '任务执行完成',
    '日志清理完成'
  ]
}

export function generateAlert(servers: Server[]): Alert | null {
  const now = new Date()
  const timeStr = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
  
  const warningServers = servers.filter((s) => s.status === 'warning')
  const offlineServers = servers.filter((s) => s.status === 'offline')
  
  let level: Alert['level']
  let server: Server
  
  if (Math.random() < 0.1 && offlineServers.length > 0) {
    level = 'critical'
    server = offlineServers[Math.floor(Math.random() * offlineServers.length)]
  } else if (Math.random() < 0.3 && warningServers.length > 0) {
    level = 'warning'
    server = warningServers[Math.floor(Math.random() * warningServers.length)]
  } else if (Math.random() < 0.5) {
    level = 'info'
    server = servers[Math.floor(Math.random() * servers.length)]
  } else {
    return null
  }
  
  const contents = alertContents[level]
  const content = contents[Math.floor(Math.random() * contents.length)]
  
  return {
    id: `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    time: timeStr,
    server: server.name,
    level,
    content
  }
}

export function generateCityServers(servers: Server[]): CityServer[] {
  const cityMap = new Map<string, { count: number; warning: number; offline: number }>()
  
  mockData.cities.forEach((city) => {
    cityMap.set(city.name, { count: 0, warning: 0, offline: 0 })
  })
  
  servers.forEach((srv) => {
    const cityInfo = cityMap.get(srv.city)
    if (cityInfo) {
      cityInfo.count++
      if (srv.status === 'warning') cityInfo.warning++
      if (srv.status === 'offline') cityInfo.offline++
    }
  })
  
  return mockData.cities
    .filter((city) => {
      const info = cityMap.get(city.name)
      return info && info.count > 0
    })
    .map((city) => {
      const info = cityMap.get(city.name)!
      let health: CityServer['health'] = 'good'
      
      if (info.offline > 0) {
        health = 'critical'
      } else if (info.warning > 0) {
        health = 'warning'
      }
      
      return {
        name: city.name,
        x: city.x,
        y: city.y,
        count: info.count,
        health
      }
    })
}

export { CPU_THRESHOLD, MEMORY_THRESHOLD, DISK_THRESHOLD }
