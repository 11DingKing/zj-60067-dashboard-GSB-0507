<template>
  <div class="network-chart gradient-border">
    <div class="card-title">网络流量</div>
    <div ref="chartRef" class="chart-container"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, nextTick } from "vue";
import { useDashboardStore } from "../stores/dashboard";
import { storeToRefs } from "pinia";
import * as echarts from "echarts";

const store = useDashboardStore();
const { networkData } = storeToRefs(store);

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
      formatter: (params: any) => {
        let result = params[0].name + "<br/>";
        params.forEach((param: any) => {
          result += `${param.marker}${param.seriesName}: ${param.value} MB/s<br/>`;
        });
        return result;
      },
    },
    legend: {
      data: ["入站流量", "出站流量"],
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
    yAxis: {
      type: "value",
      name: "流量 (MB/s)",
      axisLine: {
        show: false,
      },
      axisLabel: {
        color: "#a0b0c0",
        fontSize: 11,
      },
      splitLine: {
        lineStyle: {
          color: "rgba(0, 240, 255, 0.1)",
        },
      },
    },
    series: [
      {
        name: "入站流量",
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
              { offset: 0, color: "rgba(0, 240, 255, 0.4)" },
              { offset: 1, color: "rgba(0, 240, 255, 0.05)" },
            ],
          },
        },
      },
      {
        name: "出站流量",
        type: "line",
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
              { offset: 0, color: "rgba(255, 107, 107, 0.4)" },
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

  const times = networkData.value.map((d) => d.time);
  const inboundData = networkData.value.map((d) => d.inbound);
  const outboundData = networkData.value.map((d) => d.outbound);

  chartInstance.setOption({
    xAxis: {
      data: times,
    },
    series: [
      {
        data: inboundData,
      },
      {
        data: outboundData,
      },
    ],
  });
}

function handleResize() {
  chartInstance?.resize();
}

watch(
  () => networkData.value,
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
      console.warn("NetworkChart: Failed to initialize after max attempts");
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
.network-chart {
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
