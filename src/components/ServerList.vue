<template>
  <div class="server-list gradient-border">
    <div class="card-title">服务器列表</div>
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th @click="sortBy('ip')">
              IP地址
              <span class="sort-icon" :class="{ active: sortKey === 'ip' }">
                {{ sortOrder === "asc" ? "▲" : "▼" }}
              </span>
            </th>
            <th @click="sortBy('name')">
              服务器名称
              <span class="sort-icon" :class="{ active: sortKey === 'name' }">
                {{ sortOrder === "asc" ? "▲" : "▼" }}
              </span>
            </th>
            <th @click="sortBy('status')">
              状态
              <span class="sort-icon" :class="{ active: sortKey === 'status' }">
                {{ sortOrder === "asc" ? "▲" : "▼" }}
              </span>
            </th>
            <th @click="sortBy('cpu')">
              CPU
              <span class="sort-icon" :class="{ active: sortKey === 'cpu' }">
                {{ sortOrder === "asc" ? "▲" : "▼" }}
              </span>
            </th>
            <th @click="sortBy('memory')">
              内存
              <span class="sort-icon" :class="{ active: sortKey === 'memory' }">
                {{ sortOrder === "asc" ? "▲" : "▼" }}
              </span>
            </th>
            <th @click="sortBy('disk')">
              磁盘
              <span class="sort-icon" :class="{ active: sortKey === 'disk' }">
                {{ sortOrder === "asc" ? "▲" : "▼" }}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="server in sortedServers" :key="server.id">
            <td class="ip-cell">{{ server.ip }}</td>
            <td class="name-cell">{{ server.name }}</td>
            <td class="status-cell">
              <span class="status-dot" :class="server.status"></span>
              <span :class="`status-${server.status}`">
                {{ statusText[server.status] }}
              </span>
            </td>
            <td
              class="usage-cell"
              :class="{ 'highlight-danger': server.cpu > CPU_THRESHOLD }"
            >
              <div class="usage-bar">
                <div
                  class="usage-fill"
                  :class="{ danger: server.cpu > CPU_THRESHOLD }"
                  :style="{ width: `${server.cpu}%` }"
                ></div>
              </div>
              <span>{{ server.cpu }}%</span>
            </td>
            <td
              class="usage-cell"
              :class="{ 'highlight-danger': server.memory > MEMORY_THRESHOLD }"
            >
              <div class="usage-bar">
                <div
                  class="usage-fill"
                  :class="{ danger: server.memory > MEMORY_THRESHOLD }"
                  :style="{ width: `${server.memory}%` }"
                ></div>
              </div>
              <span>{{ server.memory }}%</span>
            </td>
            <td
              class="usage-cell"
              :class="{ 'highlight-danger': server.disk > DISK_THRESHOLD }"
            >
              <div class="usage-bar">
                <div
                  class="usage-fill"
                  :class="{ danger: server.disk > DISK_THRESHOLD }"
                  :style="{ width: `${server.disk}%` }"
                ></div>
              </div>
              <span>{{ server.disk }}%</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useDashboardStore } from "../stores/dashboard";
import { storeToRefs } from "pinia";
import {
  CPU_THRESHOLD,
  MEMORY_THRESHOLD,
  DISK_THRESHOLD,
} from "../utils/dataGenerator";
import type { Server } from "../types";

const store = useDashboardStore();
const { servers } = storeToRefs(store);

const sortKey = ref<string>("name");
const sortOrder = ref<"asc" | "desc">("asc");

const statusText: Record<string, string> = {
  online: "在线",
  offline: "离线",
  warning: "告警",
};

const sortedServers = computed(() => {
  const list = [...servers.value];
  const statusPriority: Record<string, number> = {
    offline: 0,
    warning: 1,
    online: 2,
  };

  list.sort((a, b) => {
    let aVal: string | number;
    let bVal: string | number;

    switch (sortKey.value) {
      case "status":
        aVal = statusPriority[a.status];
        bVal = statusPriority[b.status];
        break;
      case "cpu":
        aVal = a.cpu;
        bVal = b.cpu;
        break;
      case "memory":
        aVal = a.memory;
        bVal = b.memory;
        break;
      case "disk":
        aVal = a.disk;
        bVal = b.disk;
        break;
      case "ip":
        aVal = a.ip;
        bVal = b.ip;
        break;
      default:
        aVal = a.name;
        bVal = b.name;
    }

    if (typeof aVal === "number") {
      return sortOrder.value === "asc" ? aVal - bVal : bVal - aVal;
    } else {
      return sortOrder.value === "asc"
        ? (aVal as string).localeCompare(bVal as string)
        : (bVal as string).localeCompare(aVal as string);
    }
  });

  return list;
});

function sortBy(key: string) {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  } else {
    sortKey.value = key;
    sortOrder.value = "asc";
  }
}
</script>

<style scoped>
.server-list {
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.table-wrapper {
  flex: 1;
  overflow: auto;
  padding: 10px;
  min-height: 0;
}

table {
  width: 100%;
  min-width: 550px;
  border-collapse: collapse;
  font-size: 12px;
}

thead {
  position: sticky;
  top: 0;
  z-index: 1;
}

th {
  background: linear-gradient(
    180deg,
    rgba(0, 128, 255, 0.2),
    rgba(0, 128, 255, 0.1)
  );
  color: var(--primary-color);
  padding: 10px 5px;
  text-align: left;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
  border-bottom: 1px solid rgba(0, 240, 255, 0.3);
  white-space: nowrap;
}

th:hover {
  background: linear-gradient(
    180deg,
    rgba(0, 128, 255, 0.3),
    rgba(0, 128, 255, 0.2)
  );
}

.sort-icon {
  margin-left: 4px;
  opacity: 0.4;
  font-size: 10px;
}

.sort-icon.active {
  opacity: 1;
}

td {
  padding: 10px 5px;
  color: var(--text-secondary);
  border-bottom: 1px solid rgba(0, 240, 255, 0.1);
  vertical-align: middle;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

tr:hover td {
  background: rgba(0, 240, 255, 0.05);
}

.ip-cell {
  font-family: "Courier New", monospace;
  color: var(--primary-color);
}

.name-cell {
  max-width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.status-cell {
  display: flex;
  align-items: center;
  gap: 6px;
}

.usage-cell {
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 0;
}

.usage-bar {
  width: 30px;
  height: 5px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  overflow: hidden;
  flex-shrink: 0;
}

.usage-fill {
  height: 100%;
  background: linear-gradient(90deg, #00f0ff, #0080ff);
  border-radius: 3px;
  transition: width 0.3s ease;
}

.usage-fill.danger {
  background: linear-gradient(90deg, #ff6b6b, #ff4444);
}
</style>
