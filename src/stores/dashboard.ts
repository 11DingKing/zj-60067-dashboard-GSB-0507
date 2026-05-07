import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Server, Alert, TrendData, NetworkData, DiskUsage, OverviewData, CityServer } from '../types'
import {
  generateServers,
  generateTrendData,
  generateNetworkData,
  generateDiskUsage,
  generateAlert,
  generateCityServers
} from '../utils/dataGenerator'

export const useDashboardStore = defineStore('dashboard', () => {
  const servers = ref<Server[]>([])
  const trendData = ref<TrendData[]>([])
  const networkData = ref<NetworkData[]>([])
  const diskUsage = ref<DiskUsage[]>([])
  const alerts = ref<Alert[]>([])
  const cityServers = ref<CityServer[]>([])
  const currentTime = ref<string>('')

  const overview = computed<OverviewData>(() => {
    const total = servers.value.length
    const online = servers.value.filter((s) => s.status === 'online').length
    const offline = servers.value.filter((s) => s.status === 'offline').length
    const warning = servers.value.filter((s) => s.status === 'warning').length
    return { total, online, offline, warning }
  })

  const diskTotal = computed(() => {
    const totalUsed = diskUsage.value.reduce((sum, d) => sum + d.used, 0)
    const totalCapacity = diskUsage.value.length * 100
    return {
      used: Math.round(totalUsed * 10) / 10,
      total: totalCapacity,
      percentage: Math.round((totalUsed / totalCapacity) * 1000) / 10
    }
  })

  function updateTime() {
    const now = new Date()
    currentTime.value = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
  }

  function initializeData() {
    servers.value = generateServers()
    trendData.value = generateTrendData()
    networkData.value = generateNetworkData()
    diskUsage.value = generateDiskUsage(servers.value)
    cityServers.value = generateCityServers(servers.value)
    updateTime()
  }

  function updateData() {
    servers.value = generateServers()
    trendData.value = generateTrendData(trendData.value)
    networkData.value = generateNetworkData(networkData.value)
    diskUsage.value = generateDiskUsage(servers.value)
    cityServers.value = generateCityServers(servers.value)
    
    const newAlert = generateAlert(servers.value)
    if (newAlert) {
      alerts.value.unshift(newAlert)
      if (alerts.value.length > 50) {
        alerts.value = alerts.value.slice(0, 50)
      }
    }
    
    updateTime()
  }

  return {
    servers,
    trendData,
    networkData,
    diskUsage,
    alerts,
    cityServers,
    currentTime,
    overview,
    diskTotal,
    initializeData,
    updateData,
    updateTime
  }
})
