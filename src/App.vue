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
const left = ref(0);
const top = ref(0);

const wrapperStyle = computed(() => ({
  width: `${DESIGN_WIDTH}px`,
  height: `${DESIGN_HEIGHT}px`,
  transform: `scale(${scale.value})`,
  transformOrigin: "0 0",
  position: "absolute" as const,
  left: `${left.value}px`,
  top: `${top.value}px`,
}));

function updateScale() {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const scaleX = windowWidth / DESIGN_WIDTH;
  const scaleY = windowHeight / DESIGN_HEIGHT;
  scale.value = Math.min(scaleX, scaleY);

  const scaledWidth = DESIGN_WIDTH * scale.value;
  const scaledHeight = DESIGN_HEIGHT * scale.value;

  left.value = (windowWidth - scaledWidth) / 2;
  top.value = (windowHeight - scaledHeight) / 2;
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
  position: relative;
  background: #000;
  overflow: hidden;
}

.dashboard-wrapper {
  position: relative;
}
</style>
