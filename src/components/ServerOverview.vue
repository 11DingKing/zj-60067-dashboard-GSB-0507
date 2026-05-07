<template>
  <div class="server-overview gradient-border">
    <div class="card-title">服务器概览</div>
    <div class="overview-content">
      <div class="stat-card" v-for="item in stats" :key="item.label">
        <div class="stat-icon" :class="item.iconClass">
          <svg v-if="item.label === '服务器总数'" viewBox="0 0 24 24" fill="currentColor">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
          <svg v-else-if="item.label === '在线数'" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10" />
            <polyline points="8 12 11 15 16 9" stroke="white" stroke-width="2" fill="none" />
          </svg>
          <svg v-else-if="item.label === '离线数'" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" stroke="white" stroke-width="2" />
            <line x1="9" y1="9" x2="15" y2="15" stroke="white" stroke-width="2" />
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L1 21h22L12 2z" />
            <line x1="12" y1="9" x2="12" y2="13" stroke="white" stroke-width="2" />
            <line x1="12" y1="17" x2="12.01" y2="17" stroke="white" stroke-width="4" />
          </svg>
        </div>
        <div class="stat-info">
          <div class="stat-value">
            <FlipNumber :value="item.value" :color="item.color" />
          </div>
          <div class="stat-label" :style="{ color: item.color }">{{ item.label }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDashboardStore } from '../stores/dashboard'
import { storeToRefs } from 'pinia'
import FlipNumber from './FlipNumber.vue'

const store = useDashboardStore()
const { overview } = storeToRefs(store)

const stats = computed(() => [
  {
    label: '服务器总数',
    value: overview.value.total,
    color: '#00f0ff',
    iconClass: 'total'
  },
  {
    label: '在线数',
    value: overview.value.online,
    color: '#6bcf7f',
    iconClass: 'online'
  },
  {
    label: '离线数',
    value: overview.value.offline,
    color: '#ff6b6b',
    iconClass: 'offline'
  },
  {
    label: '告警数',
    value: overview.value.warning,
    color: '#ffd93d',
    iconClass: 'warning'
  }
])
</script>

<style scoped>
.overview-content {
  display: flex;
  justify-content: space-around;
  padding: 20px 10px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: linear-gradient(135deg, rgba(0, 240, 255, 0.05), rgba(0, 128, 255, 0.05));
  border-radius: 8px;
  border: 1px solid rgba(0, 240, 255, 0.15);
  transition: all 0.3s ease;
}

.stat-card:hover {
  border-color: rgba(0, 240, 255, 0.4);
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.1);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon svg {
  width: 28px;
  height: 28px;
}

.stat-icon.total {
  background: linear-gradient(135deg, rgba(0, 240, 255, 0.2), rgba(0, 128, 255, 0.2));
  color: #00f0ff;
}

.stat-icon.online {
  background: linear-gradient(135deg, rgba(107, 207, 127, 0.2), rgba(50, 160, 80, 0.2));
  color: #6bcf7f;
}

.stat-icon.offline {
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.2), rgba(200, 60, 60, 0.2));
  color: #ff6b6b;
}

.stat-icon.warning {
  background: linear-gradient(135deg, rgba(255, 217, 61, 0.2), rgba(220, 180, 40, 0.2));
  color: #ffd93d;
}

.stat-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-value {
  font-family: 'Courier New', monospace;
  font-size: 32px;
  font-weight: bold;
  line-height: 1;
}

.stat-label {
  font-size: 14px;
  opacity: 0.9;
}
</style>
