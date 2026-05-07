<template>
  <div class="flip-number-wrapper">
    <span
      v-for="(digit, index) in displayDigits"
      :key="index"
      class="digit-container"
      :class="{ flipping: flippingDigits[index] }"
    >
      <span class="digit" :style="{ color: color }">{{ digit }}</span>
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, nextTick } from "vue";

const props = defineProps<{
  value: number;
  color?: string;
}>();

const displayDigits = ref<string[]>([]);
const flippingDigits = ref<boolean[]>([]);
let flipTimeout: number | null = null;

function getDigits(num: number): string[] {
  return num.toString().split("");
}

function updateDigits() {
  const newDigits = getDigits(props.value);
  const oldDigits = [...displayDigits.value];

  while (oldDigits.length < newDigits.length) {
    oldDigits.unshift("0");
  }

  flippingDigits.value = newDigits.map((_, index) => {
    const oldIndex = index - (newDigits.length - oldDigits.length);
    return oldIndex >= 0 ? oldDigits[oldIndex] !== newDigits[index] : true;
  });

  displayDigits.value = newDigits;

  if (flipTimeout) {
    clearTimeout(flipTimeout);
  }

  nextTick(() => {
    flipTimeout = window.setTimeout(() => {
      flippingDigits.value = flippingDigits.value.map(() => false);
      flipTimeout = null;
    }, 500);
  });
}

watch(
  () => props.value,
  () => {
    updateDigits();
  },
);

onMounted(() => {
  updateDigits();
});

onUnmounted(() => {
  if (flipTimeout) {
    clearTimeout(flipTimeout);
    flipTimeout = null;
  }
});
</script>

<style scoped>
.flip-number-wrapper {
  display: flex;
  gap: 2px;
  font-family: "Courier New", monospace;
}

.digit-container {
  position: relative;
  display: inline-block;
  width: 28px;
  height: 44px;
  background: linear-gradient(
    180deg,
    rgba(0, 240, 255, 0.1),
    rgba(0, 128, 255, 0.1)
  );
  border-radius: 4px;
  overflow: hidden;
}

.digit-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 1px solid rgba(0, 240, 255, 0.3);
  border-radius: 4px;
  pointer-events: none;
}

.digit {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  font-weight: bold;
  text-shadow: 0 0 10px currentColor;
  transition:
    transform 0.5s ease,
    opacity 0.5s ease;
}

.digit-container.flipping .digit {
  animation: flip 0.5s ease;
}

@keyframes flip {
  0% {
    transform: rotateX(0);
    opacity: 1;
  }
  50% {
    transform: rotateX(-90deg);
    opacity: 0.5;
  }
  50.1% {
    transform: rotateX(90deg);
  }
  100% {
    transform: rotateX(0);
    opacity: 1;
  }
}
</style>
