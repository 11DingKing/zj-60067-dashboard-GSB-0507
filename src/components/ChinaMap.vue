<template>
  <div class="china-map gradient-border">
    <div class="card-title">服务器分布</div>
    <div class="map-container" ref="mapRef">
      <svg viewBox="0 0 1000 800" class="map-svg">
        <defs>
          <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color: #0a1628; stop-opacity: 0.8" />
            <stop offset="50%" style="stop-color: #1a2a4a; stop-opacity: 0.8" />
            <stop
              offset="100%"
              style="stop-color: #0a1628; stop-opacity: 0.8"
            />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="shadow">
            <feDropShadow
              dx="0"
              dy="2"
              stdDeviation="3"
              flood-color="#000"
              flood-opacity="0.5"
            />
          </filter>
        </defs>

        <g class="map-province" fill="url(#mapGradient)">
          <path
            d="M 750 150 L 850 160 L 880 220 L 870 280 L 810 300 L 760 290 L 720 250 L 710 200 L 750 150 Z"
            stroke="#00f0ff"
            stroke-width="1"
            opacity="0.9"
          />
          <path
            d="M 850 160 L 920 150 L 960 200 L 950 280 L 900 320 L 870 280 L 880 220 L 850 160 Z"
            stroke="#00f0ff"
            stroke-width="1"
            opacity="0.9"
          />
          <path
            d="M 870 280 L 900 320 L 920 380 L 880 400 L 830 380 L 810 340 L 810 300 L 870 280 Z"
            stroke="#00f0ff"
            stroke-width="1"
            opacity="0.9"
          />
          <path
            d="M 830 380 L 880 400 L 900 450 L 870 490 L 820 480 L 780 450 L 790 400 L 830 380 Z"
            stroke="#00f0ff"
            stroke-width="1"
            opacity="0.9"
          />
          <path
            d="M 780 450 L 820 480 L 870 490 L 880 550 L 840 580 L 790 570 L 760 530 L 760 490 L 780 450 Z"
            stroke="#00f0ff"
            stroke-width="1"
            opacity="0.9"
          />
          <path
            d="M 760 530 L 790 570 L 840 580 L 860 630 L 820 670 L 770 660 L 740 620 L 730 570 L 760 530 Z"
            stroke="#00f0ff"
            stroke-width="1"
            opacity="0.9"
          />
          <path
            d="M 790 400 L 780 450 L 760 490 L 760 530 L 730 570 L 690 560 L 660 520 L 670 470 L 710 440 L 750 420 L 790 400 Z"
            stroke="#00f0ff"
            stroke-width="1"
            opacity="0.9"
          />
          <path
            d="M 670 470 L 660 520 L 690 560 L 730 570 L 740 620 L 770 660 L 760 710 L 710 720 L 660 690 L 640 650 L 630 600 L 610 550 L 620 500 L 650 480 L 670 470 Z"
            stroke="#00f0ff"
            stroke-width="1"
            opacity="0.9"
          />
          <path
            d="M 750 420 L 710 440 L 670 470 L 650 480 L 620 500 L 610 550 L 630 600 L 640 650 L 660 690 L 650 640 L 630 590 L 620 540 L 640 500 L 680 470 L 720 450 L 750 420 Z"
            stroke="#00f0ff"
            stroke-width="1"
            opacity="0.9"
            fill="none"
          />
          <path
            d="M 710 440 L 670 470 L 650 480 L 620 500 L 610 550 L 580 540 L 560 500 L 580 460 L 620 440 L 660 430 L 710 440 Z"
            stroke="#00f0ff"
            stroke-width="1"
            opacity="0.9"
          />
          <path
            d="M 620 440 L 580 460 L 560 500 L 580 540 L 610 550 L 630 600 L 640 650 L 660 690 L 620 680 L 580 650 L 560 600 L 540 550 L 550 500 L 570 460 L 620 440 Z"
            stroke="#00f0ff"
            stroke-width="1"
            opacity="0.9"
            fill="none"
          />
          <path
            d="M 660 430 L 620 440 L 570 460 L 550 500 L 540 550 L 510 530 L 490 490 L 510 450 L 550 430 L 600 420 L 660 430 Z"
            stroke="#00f0ff"
            stroke-width="1"
            opacity="0.9"
          />
          <path
            d="M 600 420 L 550 430 L 510 450 L 490 490 L 510 530 L 540 550 L 560 600 L 580 650 L 620 680 L 650 640 L 640 600 L 620 560 L 610 520 L 600 480 L 620 450 L 660 430 L 600 420 Z"
            stroke="#00f0ff"
            stroke-width="1"
            opacity="0.9"
            fill="none"
          />
          <path
            d="M 550 430 L 510 450 L 490 490 L 510 530 L 540 550 L 540 590 L 510 620 L 460 630 L 420 610 L 400 570 L 410 520 L 440 490 L 480 470 L 520 450 L 550 430 Z"
            stroke="#00f0ff"
            stroke-width="1"
            opacity="0.9"
          />
          <path
            d="M 600 420 L 660 430 L 680 470 L 720 450 L 750 420 L 720 380 L 690 370 L 650 380 L 620 390 L 600 420 Z"
            stroke="#00f0ff"
            stroke-width="1"
            opacity="0.9"
          />
          <path
            d="M 750 420 L 720 380 L 690 370 L 650 380 L 620 390 L 600 420 L 550 430 L 520 450 L 480 470 L 480 440 L 520 420 L 560 400 L 600 390 L 650 380 L 690 370 L 720 380 L 750 420 Z"
            stroke="#00f0ff"
            stroke-width="1"
            opacity="0.9"
            fill="none"
          />
          <path
            d="M 600 390 L 560 400 L 520 420 L 480 440 L 440 430 L 400 420 L 380 390 L 400 360 L 450 350 L 500 350 L 550 360 L 580 370 L 600 390 Z"
            stroke="#00f0ff"
            stroke-width="1"
            opacity="0.9"
          />
          <path
            d="M 500 350 L 450 350 L 400 360 L 380 390 L 400 420 L 440 430 L 480 440 L 480 470 L 520 450 L 550 430 L 560 400 L 520 380 L 480 370 L 500 350 Z"
            stroke="#00f0ff"
            stroke-width="1"
            opacity="0.9"
            fill="none"
          />
          <path
            d="M 450 350 L 400 360 L 380 390 L 350 380 L 320 360 L 310 330 L 330 300 L 380 290 L 430 300 L 460 320 L 450 350 Z"
            stroke="#00f0ff"
            stroke-width="1"
            opacity="0.9"
          />
          <path
            d="M 500 350 L 550 360 L 580 370 L 600 390 L 620 390 L 650 380 L 690 370 L 720 380 L 750 420 L 790 400 L 810 340 L 810 300 L 760 290 L 720 250 L 710 200 L 750 150 L 760 200 L 780 240 L 750 260 L 720 250 L 680 260 L 650 280 L 620 300 L 590 320 L 560 340 L 530 350 L 500 350 Z"
            stroke="#00f0ff"
            stroke-width="1"
            opacity="0.9"
            fill="none"
          />
          <path
            d="M 400 360 L 380 390 L 350 380 L 320 360 L 310 330 L 330 300 L 380 290 L 430 300 L 460 320 L 450 350 L 500 350 L 530 350 L 560 340 L 590 320 L 620 300 L 650 280 L 680 260 L 720 250 L 750 260 L 780 240 L 760 200 L 750 150 L 710 140 L 660 130 L 620 140 L 580 150 L 540 170 L 510 190 L 480 210 L 450 230 L 420 260 L 400 290 L 380 290 L 330 300 L 310 330 L 290 360 L 280 390 L 300 420 L 330 440 L 370 450 L 400 450 L 440 430 L 400 420 L 380 390 L 400 360 Z"
            stroke="#00f0ff"
            stroke-width="1"
            opacity="0.9"
            fill="none"
          />
        </g>

        <g
          class="grid-lines"
          stroke="rgba(0, 240, 255, 0.1)"
          stroke-width="0.5"
        >
          <line x1="100" y1="100" x2="900" y2="100" />
          <line x1="100" y1="200" x2="900" y2="200" />
          <line x1="100" y1="300" x2="900" y2="300" />
          <line x1="100" y1="400" x2="900" y2="400" />
          <line x1="100" y1="500" x2="900" y2="500" />
          <line x1="100" y1="600" x2="900" y2="600" />
          <line x1="100" y1="700" x2="900" y2="700" />
          <line x1="200" y1="100" x2="200" y2="700" />
          <line x1="300" y1="100" x2="300" y2="700" />
          <line x1="400" y1="100" x2="400" y2="700" />
          <line x1="500" y1="100" x2="500" y2="700" />
          <line x1="600" y1="100" x2="600" y2="700" />
          <line x1="700" y1="100" x2="700" y2="700" />
          <line x1="800" y1="100" x2="800" y2="700" />
        </g>

        <g class="city-markers">
          <g
            v-for="city in cityServers"
            :key="city.name"
            class="city-group"
            @mouseenter="showTooltip(city)"
            @mouseleave="hideTooltip"
          >
            <circle
              :cx="city.x"
              :cy="city.y"
              :r="getMarkerSize(city.count)"
              :fill="getMarkerColor(city.health)"
              :stroke="getMarkerStroke(city.health)"
              stroke-width="2"
              opacity="0.9"
              class="city-dot"
              :class="{
                pulse: city.health === 'warning' || city.health === 'critical',
              }"
            />
            <circle
              :cx="city.x"
              :cy="city.y"
              :r="getMarkerSize(city.count) + 5"
              :fill="getMarkerColor(city.health)"
              opacity="0.2"
              class="city-glow"
            />
            <text
              :x="city.x"
              :y="city.y + getMarkerSize(city.count) + 16"
              text-anchor="middle"
              fill="#a0b0c0"
              font-size="11"
              font-weight="500"
            >
              {{ city.name }}
            </text>
          </g>
        </g>
      </svg>

      <div v-if="tooltipCity" class="map-tooltip" :style="tooltipStyle">
        <div class="tooltip-title">{{ tooltipCity.name }}</div>
        <div class="tooltip-content">
          <span class="tooltip-label">服务器数量:</span>
          <span class="tooltip-value">{{ tooltipCity.count }} 台</span>
        </div>
        <div class="tooltip-content">
          <span class="tooltip-label">健康状态:</span>
          <span
            class="tooltip-status"
            :style="{ color: getMarkerColor(tooltipCity.health) }"
          >
            {{ getHealthText(tooltipCity.health) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useDashboardStore } from "../stores/dashboard";
import { storeToRefs } from "pinia";
import type { CityServer } from "../types";

const store = useDashboardStore();
const { cityServers } = storeToRefs(store);

const mapRef = ref<HTMLDivElement | null>(null);
const tooltipCity = ref<CityServer | null>(null);
const tooltipPosition = ref({ x: 0, y: 0 });

const tooltipStyle = computed(() => ({
  left: `${tooltipPosition.value.x}px`,
  top: `${tooltipPosition.value.y}px`,
}));

function getMarkerSize(count: number): number {
  return Math.min(8 + count * 2, 18);
}

function getMarkerColor(health: string): string {
  switch (health) {
    case "critical":
      return "#ff6b6b";
    case "warning":
      return "#ffd93d";
    default:
      return "#6bcf7f";
  }
}

function getMarkerStroke(health: string): string {
  switch (health) {
    case "critical":
      return "#ff4444";
    case "warning":
      return "#ffcc00";
    default:
      return "#4bbf6b";
  }
}

function getHealthText(health: string): string {
  switch (health) {
    case "critical":
      return "异常";
    case "warning":
      return "警告";
    default:
      return "正常";
  }
}

function showTooltip(city: CityServer) {
  tooltipCity.value = city;
  tooltipPosition.value = {
    x: city.x * 0.86 + 20,
    y: city.y * 0.375 - 40,
  };
}

function hideTooltip() {
  tooltipCity.value = null;
}
</script>

<style scoped>
.china-map {
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.map-container {
  flex: 1;
  padding: 10px;
  position: relative;
  min-height: 0;
}

.map-svg {
  width: 100%;
  height: 100%;
}

.city-group {
  cursor: pointer;
}

.city-dot {
  transition: all 0.3s ease;
  filter: url(#glow);
}

.city-group:hover .city-dot {
  transform: scale(1.2);
  filter: url(#glow) url(#shadow);
}

.city-glow {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.2;
    transform: scale(1);
  }
  50% {
    opacity: 0.4;
    transform: scale(1.1);
  }
}

.city-dot.pulse {
  animation: dotPulse 1s infinite;
}

@keyframes dotPulse {
  0%,
  100% {
    opacity: 0.9;
  }
  50% {
    opacity: 0.5;
  }
}

.map-tooltip {
  position: absolute;
  z-index: 100;
  background: rgba(10, 22, 40, 0.95);
  border: 1px solid rgba(0, 240, 255, 0.5);
  border-radius: 4px;
  padding: 12px 16px;
  pointer-events: none;
  animation: fadeIn 0.2s ease;
}

.tooltip-title {
  color: #00f0ff;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
  text-shadow: 0 0 5px rgba(0, 240, 255, 0.5);
}

.tooltip-content {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  font-size: 12px;
}

.tooltip-label {
  color: #a0b0c0;
}

.tooltip-value {
  color: #ffffff;
  font-weight: 500;
}

.tooltip-status {
  font-weight: 500;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
