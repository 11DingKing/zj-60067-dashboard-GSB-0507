<template>
  <div class="dashboard-view">
    <Header />

    <div class="main-content">
      <div class="left-column">
        <ServerOverview />
        <CpuMemoryChart />
        <ServerList />
      </div>

      <div class="center-column">
        <AlertScroll />
      </div>

      <div class="right-column">
        <NetworkChart />
        <DiskChart />
        <ChinaMap />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { useDashboardStore } from "../stores/dashboard";
import Header from "../components/Header.vue";
import ServerOverview from "../components/ServerOverview.vue";
import CpuMemoryChart from "../components/CpuMemoryChart.vue";
import ServerList from "../components/ServerList.vue";
import AlertScroll from "../components/AlertScroll.vue";
import NetworkChart from "../components/NetworkChart.vue";
import DiskChart from "../components/DiskChart.vue";
import ChinaMap from "../components/ChinaMap.vue";

const store = useDashboardStore();

let updateInterval: number | null = null;

onMounted(() => {
  store.initializeData();
  updateInterval = window.setInterval(() => {
    store.updateData();
  }, 3000);
});

onUnmounted(() => {
  if (updateInterval) {
    clearInterval(updateInterval);
    updateInterval = null;
  }
});
</script>

<style scoped>
.dashboard-view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: transparent;
}

.main-content {
  flex: 1;
  display: grid;
  grid-template-columns: 580px 460px 820px;
  grid-template-rows: 1fr;
  gap: 20px;
  padding: 0 20px 20px 20px;
  height: 960px;
}

.left-column {
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
}

.left-column > :nth-child(1) {
  height: 140px;
  flex-shrink: 0;
}

.left-column > :nth-child(2) {
  height: 280px;
  flex-shrink: 0;
}

.left-column > :nth-child(3) {
  height: 480px;
  flex-shrink: 0;
}

.center-column {
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
}

.center-column > :nth-child(1) {
  flex: 1;
  min-height: 0;
}

.right-column {
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
}

.right-column > :nth-child(1) {
  height: 220px;
  flex-shrink: 0;
}

.right-column > :nth-child(2) {
  height: 220px;
  flex-shrink: 0;
}

.right-column > :nth-child(3) {
  height: 460px;
  flex-shrink: 0;
}
</style>
