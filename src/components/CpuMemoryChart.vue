<template>
  <div class="cpu-memory-chart gradient-border">
    <div class="card-title">CPU/内存趋势</div>
    <div ref="chartRef" class="chart-container"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, nextTick } from "vue";
import { useDashboardStore } from "../stores/dashboard";
import { storeToRefs } from "pinia";
import * as echarts from "echarts";

const store = useDashboardStore();
const { trendData } = storeToRefs(store);

const chartRef = ref<HTMLDivElement | null>(null);
let chartInstance: echarts.ECharts | null = null;
let initTimeout: number | null = null;
let initAttempts = 0;
const MAX_INIT_ATTEMPTS = 100;

function initChart() {
  if (!chartRef.value) return;

  chartInstance = echarts.init(chartRef.value);

  chartInstance.setOption({
    backgroundColor: "transparent",
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(10, 22, 40, 0.9)",
      borderColor: "rgba(0, 240, 255, 0.5)",
      borderWidth: 1,
      textStyle: {
        color: "#ffffff",
      },
    },
    legend: {
      data: ["CPU使用率", "内存使用率"],
      textStyle: {
        color: "#a0b0c0",
      },
      top: 10,
      right: 20,
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      top: "18%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: [],
      axisLine: {
        lineStyle: {
          color: "rgba(0, 240, 255, 0.3)",
        },
      },
      axisLabel: {
        color: "#a0b0c0",
        fontSize: 10,
        interval: "auto",
      },
      splitLine: {
        show: false,
      },
    },
    yAxis: [
      {
        type: "value",
        name: "CPU (%)",
        min: 0,
        max: 100,
        axisLine: {
          show: false,
        },
        axisLabel: {
          color: "#00f0ff",
          fontSize: 11,
        },
        splitLine: {
          lineStyle: {
            color: "rgba(0, 240, 255, 0.1)",
          },
        },
      },
      {
        type: "value",
        name: "内存 (%)",
        min: 0,
        max: 100,
        axisLine: {
          show: false,
        },
        axisLabel: {
          color: "#ff6b6b",
          fontSize: 11,
        },
        splitLine: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: "CPU使用率",
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 4,
        showSymbol: false,
        data: [],
        lineStyle: {
          color: "#00f0ff",
          width: 2,
        },
        itemStyle: {
          color: "#00f0ff",
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(0, 240, 255, 0.3)" },
              { offset: 1, color: "rgba(0, 240, 255, 0.05)" },
            ],
          },
        },
      },
      {
        name: "内存使用率",
        type: "line",
        yAxisIndex: 1,
        smooth: true,
        symbol: "circle",
        symbolSize: 4,
        showSymbol: false,
        data: [],
        lineStyle: {
          color: "#ff6b6b",
          width: 2,
        },
        itemStyle: {
          color: "#ff6b6b",
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(255, 107, 107, 0.3)" },
              { offset: 1, color: "rgba(255, 107, 107, 0.05)" },
            ],
          },
        },
      },
    ],
    animationDuration: 500,
  });
}

function updateChart() {
  if (!chartInstance) return;

  const times = trendData.value.map((d) => d.time);
  const cpuData = trendData.value.map((d) => d.cpu);
  const memoryData = trendData.value.map((d) => d.memory);

  chartInstance.setOption({
    xAxis: {
      data: times,
    },
    series: [
      {
        data: cpuData,
      },
      {
        data: memoryData,
      },
    ],
  });
}

function handleResize() {
  chartInstance?.resize();
}

watch(
  () => trendData.value,
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
      console.warn("CpuMemoryChart: Failed to initialize after max attempts");
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
.cpu-memory-chart {
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.chart-container {
  flex: 1;
  width: 100%;
  padding: 10px;
  min-height: 0;
}
</style>
