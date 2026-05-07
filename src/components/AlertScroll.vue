<template>
  <div class="alert-scroll gradient-border">
    <div class="card-title">告警信息</div>
    <div class="alert-container" ref="containerRef">
      <div
        class="alert-item"
        v-for="(alert, index) in displayAlerts"
        :key="alert.id"
        :class="{ 'alert-new': index === 0 && isNewAlert }"
      >
        <div class="alert-time">{{ alert.time.split(" ")[1] }}</div>
        <div class="alert-server" :title="alert.server">
          {{ truncate(alert.server, 10) }}
        </div>
        <div class="alert-level">
          <span :class="`level-${alert.level}`">
            {{ levelText[alert.level] }}
          </span>
        </div>
        <div class="alert-content" :title="alert.content">
          {{ truncate(alert.content, 20) }}
        </div>
      </div>
      <div v-if="displayAlerts.length === 0" class="no-alert">暂无告警信息</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { useDashboardStore } from "../stores/dashboard";
import { storeToRefs } from "pinia";

const store = useDashboardStore();
const { alerts } = storeToRefs(store);

const containerRef = ref<HTMLDivElement | null>(null);
const isNewAlert = ref(false);
const scrollPosition = ref(0);
let animationFrame: number | null = null;
let newAlertTimer: number | null = null;
let previousCount = 0;

const levelText: Record<string, string> = {
  critical: "严重",
  warning: "警告",
  info: "提示",
};

const displayAlerts = computed(() => {
  return alerts.value.slice(0, 20);
});

function truncate(str: string, maxLen: number): string {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen) + "...";
}

let scrollRetryCount = 0;
const MAX_SCROLL_RETRIES = 200;
let isScrollActive = false;

function startScrollLoop() {
  if (isScrollActive) return;
  isScrollActive = true;
  animationFrame = requestAnimationFrame(autoScroll);
}

function stopScrollLoop() {
  isScrollActive = false;
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
    animationFrame = null;
  }
}

function autoScroll() {
  if (!isScrollActive) return;

  if (!containerRef.value) {
    scrollRetryCount++;
    if (scrollRetryCount < MAX_SCROLL_RETRIES) {
      animationFrame = requestAnimationFrame(autoScroll);
    }
    return;
  }

  scrollRetryCount = 0;
  const container = containerRef.value;
  const scrollHeight = container.scrollHeight;
  const clientHeight = container.clientHeight;

  if (scrollHeight > clientHeight) {
    scrollPosition.value += 0.5;

    if (scrollPosition.value >= scrollHeight - clientHeight) {
      scrollPosition.value = 0;
    }

    container.scrollTop = scrollPosition.value;
  }

  animationFrame = requestAnimationFrame(autoScroll);
}

function handleVisibilityChange() {
  if (document.hidden) {
    stopScrollLoop();
  } else {
    startScrollLoop();
  }
}

watch(
  () => alerts.value.length,
  (newCount) => {
    if (newCount > previousCount && previousCount > 0) {
      isNewAlert.value = true;
      if (newAlertTimer) clearTimeout(newAlertTimer);
      newAlertTimer = window.setTimeout(() => {
        isNewAlert.value = false;
        newAlertTimer = null;
      }, 2000);
    }
    previousCount = newCount;
  },
);

onMounted(() => {
  previousCount = alerts.value.length;
  startScrollLoop();
  document.addEventListener("visibilitychange", handleVisibilityChange);
});

onUnmounted(() => {
  stopScrollLoop();
  if (newAlertTimer) {
    clearTimeout(newAlertTimer);
    newAlertTimer = null;
  }
  document.removeEventListener("visibilitychange", handleVisibilityChange);
});
</script>

<style scoped>
.alert-scroll {
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.alert-container {
  flex: 1;
  overflow-y: hidden;
  padding: 10px;
  min-height: 0;
}

.alert-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  margin-bottom: 8px;
  background: linear-gradient(90deg, rgba(0, 240, 255, 0.05), transparent);
  border-left: 3px solid var(--primary-color);
  border-radius: 0 4px 4px 0;
  font-size: 13px;
  transition: all 0.3s ease;
}

.alert-item:hover {
  background: linear-gradient(90deg, rgba(0, 240, 255, 0.1), transparent);
}

.alert-item.alert-new {
  animation: slideIn 0.5s ease;
  border-left-color: var(--accent-color);
  background: linear-gradient(90deg, rgba(255, 107, 107, 0.15), transparent);
}

@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.alert-time {
  flex-shrink: 0;
  width: 65px;
  font-family: "Courier New", monospace;
  color: var(--primary-color);
  font-size: 12px;
}

.alert-server {
  flex-shrink: 0;
  width: 90px;
  color: var(--text-secondary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.alert-level {
  flex-shrink: 0;
}

.alert-content {
  flex: 1;
  color: var(--text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.no-alert {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--text-dim);
  font-size: 14px;
}
</style>
