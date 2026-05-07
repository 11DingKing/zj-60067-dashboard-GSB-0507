<template>
  <div class="app-container">
    <div class="dashboard-wrapper" :style="wrapperStyle">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 1080;

const scale = ref(1);
const offsetX = ref(0);
const offsetY = ref(0);

const wrapperStyle = computed(() => ({
  width: `${DESIGN_WIDTH}px`,
  height: `${DESIGN_HEIGHT}px`,
  transform: `scale(${scale.value}) translate(${offsetX.value}px, ${offsetY.value}px)`,
  transformOrigin: "top left",
}));

function updateScale() {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const scaleX = windowWidth / DESIGN_WIDTH;
  const scaleY = windowHeight / DESIGN_HEIGHT;
  scale.value = Math.min(scaleX, scaleY);

  const scaledWidth = DESIGN_WIDTH * scale.value;
  const scaledHeight = DESIGN_HEIGHT * scale.value;
  offsetX.value = (windowWidth - scaledWidth) / (2 * scale.value);
  offsetY.value = (windowHeight - scaledHeight) / (2 * scale.value);
}

let resizeTimer: number | null = null;

function handleResize() {
  if (resizeTimer) {
    cancelAnimationFrame(resizeTimer);
  }
  resizeTimer = requestAnimationFrame(updateScale);
}

onMounted(() => {
  updateScale();
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  if (resizeTimer) {
    cancelAnimationFrame(resizeTimer);
  }
});
</script>

<style scoped>
.app-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000;
  overflow: hidden;
}

.dashboard-wrapper {
  position: relative;
  flex-shrink: 0;
}
</style>
