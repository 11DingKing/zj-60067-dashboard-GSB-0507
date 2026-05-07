<template>
  <div class="disk-chart gradient-border">
    <div class="card-title">磁盘使用分布</div>
    <div class="chart-wrapper">
      <div ref="chartRef" class="chart-container"></div>
      <div class="disk-summary">
        <div class="summary-label">总磁盘容量</div>
        <div class="summary-value">{{ diskTotal.total }} TB</div>
        <div class="summary-used">
          <span class="used-value">{{ diskTotal.used }} TB</span>
          <span class="used-percent">{{ diskTotal.percentage }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, nextTick, computed } from "vue";
import { useDashboardStore } from "../stores/dashboard";
import { storeToRefs } from "pinia";
import * as echarts from "echarts";

const store = useDashboardStore();
const { diskUsage, diskTotal } = storeToRefs(store);

const chartRef = ref<HTMLDivElement | null>(null);
let chartInstance: echarts.ECharts | null = null;
let initTimeout: number | null = null;
let initAttempts = 0;
const MAX_INIT_ATTEMPTS = 100;

const colors = [
  "#00f0ff",
  "#0080ff",
  "#6bcf7f",
  "#ffd93d",
  "#ff6b6b",
  "#9b59b6",
  "#e67e22",
  "#1abc9c",
  "#3498db",
  "#e74c3c",
  "#f39c12",
  "#2ecc71",
];

function initChart() {
  if (!chartRef.value) return;

  chartInstance = echarts.init(chartRef.value);

  chartInstance.setOption({
    backgroundColor: "transparent",
    tooltip: {
      trigger: "item",
      backgroundColor: "rgba(10, 22, 40, 0.9)",
      borderColor: "rgba(0, 240, 255, 0.5)",
      borderWidth: 1,
      textStyle: {
        color: "#ffffff",
      },
      formatter: (params: any) => {
        return `${params.name}<br/>磁盘使用率: ${params.value}%`;
      },
    },
    series: [
      {
        name: "磁盘使用",
        type: "pie",
        radius: ["40%", "65%"],
        center: ["50%", "50%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 4,
          borderColor: "rgba(10, 22, 40, 0.8)",
          borderWidth: 2,
        },
        label: {
          show: false,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 12,
            fontWeight: "bold",
            color: "#ffffff",
          },
          itemStyle: {
            shadowBlur: 10,
            shadowColor: "rgba(0, 240, 255, 0.5)",
          },
        },
        labelLine: {
          show: false,
        },
        data: [],
      },
    ],
    color: colors,
  });
}

function updateChart() {
  if (!chartInstance) return;

  const data = diskUsage.value
    .filter((d) => d && d.name != null && d.percentage != null)
    .map((d, index) => ({
      name: d.name,
      value: d.percentage,
      itemStyle: {
        color: colors[index % colors.length],
      },
    }));

  chartInstance.setOption(
    {
      series: [
        {
          data: data,
        },
      ],
    },
    { replaceMerge: ["series"] },
  );
}

function handleResize() {
  chartInstance?.resize();
}

watch(
  () => diskUsage.value,
  () => {
    updateChart();
  },
  { deep: true },
);

function tryInitChart() {
  if (!chartRef.value) return;

  const { clientWidth, clientHeight } = chartRef.value;
  if (clientWidth === 0 || clientHeight === 0) {
    initAttempts++;
    if (initAttempts < MAX_INIT_ATTEMPTS) {
      initTimeout = window.setTimeout(tryInitChart, 50);
    } else {
      console.warn("DiskChart: Failed to initialize after max attempts");
    }
    return;
  }

  initChart();
  updateChart();
  window.addEventListener("resize", handleResize);
}

onMounted(() => {
  nextTick(tryInitChart);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  if (initTimeout) {
    clearTimeout(initTimeout);
  }
  chartInstance?.dispose();
});
</script>

<style scoped>
.disk-chart {
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.chart-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  position: relative;
  min-height: 0;
}

.chart-container {
  width: 100%;
  height: 100%;
  min-height: 0;
}

.disk-summary {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  pointer-events: none;
}

.summary-label {
  font-size: 11px;
  color: var(--text-dim);
  margin-bottom: 3px;
}

.summary-value {
  font-size: 20px;
  font-weight: bold;
  color: var(--primary-color);
  text-shadow: 0 0 8px var(--primary-color);
}

.summary-used {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 3px;
}

.used-value {
  font-size: 11px;
  color: var(--text-secondary);
}

.used-percent {
  font-size: 14px;
  font-weight: bold;
  color: var(--warning-color);
}
</style>
