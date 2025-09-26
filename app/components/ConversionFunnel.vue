<script lang="ts" setup>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Colors,
  BarElement,
  type ChartOptions,
  type ChartData,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Colors,
  Title,
  Tooltip,
  Legend
);
import { Bar } from "vue-chartjs";

const loading = ref(false);
const range = ref({
  start: "2025-09-01",
  end: "2025-09-30",
});

const params = new URLSearchParams({
  start: range.value.start,
  end: range.value.end,
  type: "conversion_funnel",
});
const markets = [1, 2, 4];
markets.forEach((market) => params.append("markets[]", String(market)));
const { data, status } = await useApi("api/reports?" + params);

if (status.value === "pending") {
  loading.value = true;
}

if (status.value === "success") {
  loading.value = false;
}

const options: ChartOptions<"bar"> = {
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "right",
    },
    colors: {
      enabled: true,
    },
  },
};
</script>

<template>
  <div>
    <div v-if="loading">Loading</div>
    <div v-else class="h-[800px]">
      <Bar :data="(data as ChartData<'bar'>)" :options="options" />
    </div>
  </div>
</template>
