<script lang="ts" setup>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Colors,
  type ChartOptions,
  type ChartData,
} from "chart.js";
import { Line } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Colors,
  Title,
  Tooltip,
  Legend
);

const loading = ref();

loading.value = true;
const { data, status } = await useFetch(
  "http://a2o-api.test/api/reports?start=2024-08-01&end=2024-08-31&type=job_booking"
);

if (status.value === "success") {
  loading.value = false;
  console.log(data.value);
}

const options: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    colors: {
      enabled: true,
    },
  },
};
</script>

<template>
  <div>
    <div v-if="loading">Loading</div>
    <div v-else class="h-[500px]">
      <Line :data="(data as ChartData<'line'>)" :options="options" />
    </div>
  </div>
</template>
