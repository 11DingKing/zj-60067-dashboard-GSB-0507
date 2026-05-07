<template>
  <header class="header">
    <div class="header-left">
      <div class="logo-icon"></div>
      <h1 class="title">服务器集群实时监控数据大屏</h1>
    </div>
    <div class="header-center">
      <span class="time-display">{{ currentTime }}</span>
    </div>
    <div class="header-right">
      <button 
        class="fullscreen-btn" 
        @click="toggleFullscreen"
        :class="{ active: isFullscreen }"
      >
        <svg v-if="!isFullscreen" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
        </svg>
        <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
        </svg>
        <span>{{ isFullscreen ? '退出全屏' : '全屏' }}</span>
      </button>
    </div>
    <div class="header-decoration left"></div>
    <div class="header-decoration right"></div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useDashboardStore } from '../stores/dashboard'
import { storeToRefs } from 'pinia'

const store = useDashboardStore()
const { currentTime } = storeToRefs(store)

const isFullscreen = ref(false)

async function toggleFullscreen() {
  try {
    if (!document.fullscreenElement) {
      const elem = document.documentElement
      if (elem.requestFullscreen) {
        await elem.requestFullscreen()
      } else if ((elem as any).webkitRequestFullscreen) {
        await (elem as any).webkitRequestFullscreen()
      } else if ((elem as any).msRequestFullscreen) {
        await (elem as any).msRequestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen()
      } else if ((document as any).webkitExitFullscreen) {
        await (document as any).webkitExitFullscreen()
      } else if ((document as any).msExitFullscreen) {
        await (document as any).msExitFullscreen()
      }
    }
  } catch (err) {
    console.error('Fullscreen error:', err)
  }
}

function handleFullscreenChange() {
  isFullscreen.value = !!document.fullscreenElement
}

onMounted(() => {
  document.addEventListener('fullscreenchange', handleFullscreenChange)
  document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
  document.addEventListener('msfullscreenchange', handleFullscreenChange)
})

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', handleFullscreenChange)
  document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
  document.removeEventListener('msfullscreenchange', handleFullscreenChange)
})
</script>

<style scoped>
.header {
  position: relative;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  background: linear-gradient(180deg, rgba(0, 128, 255, 0.3) 0%, rgba(10, 22, 40, 0.9) 100%);
  border-bottom: 2px solid var(--primary-color);
}

.header::before {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 3px;
  background: linear-gradient(90deg, transparent, var(--primary-color), var(--secondary-color), var(--primary-color), transparent);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.logo-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  animation: pulse 2s infinite;
}

.title {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  text-shadow: 0 0 20px var(--primary-color);
  letter-spacing: 4px;
  background: linear-gradient(90deg, var(--primary-color), #ffffff, var(--primary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.header-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.time-display {
  font-family: 'Courier New', monospace;
  font-size: 20px;
  font-weight: 600;
  color: var(--primary-color);
  text-shadow: 0 0 10px var(--primary-color);
  letter-spacing: 2px;
}

.header-right {
  display: flex;
  align-items: center;
}

.fullscreen-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 20px;
  background: linear-gradient(135deg, rgba(0, 240, 255, 0.1), rgba(0, 128, 255, 0.1));
  border: 1px solid var(--primary-color);
  border-radius: 4px;
  color: var(--primary-color);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.fullscreen-btn:hover {
  background: linear-gradient(135deg, rgba(0, 240, 255, 0.2), rgba(0, 128, 255, 0.2));
  box-shadow: 0 0 15px var(--primary-color);
}

.fullscreen-btn svg {
  width: 18px;
  height: 18px;
}

.header-decoration {
  position: absolute;
  bottom: -12px;
  width: 24px;
  height: 24px;
  border: 2px solid var(--primary-color);
  transform: rotate(45deg);
}

.header-decoration.left {
  left: 20px;
  border-top: none;
  border-right: none;
}

.header-decoration.right {
  right: 20px;
  border-bottom: none;
  border-left: none;
}
</style>
