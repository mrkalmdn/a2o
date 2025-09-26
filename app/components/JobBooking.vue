<script lang="ts" setup>
import { Button } from "./ui/button";
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
import dayjs from "dayjs";
import type { DateRange } from "reka-ui";
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

const props = defineProps(["filters"]);

const data = ref();
const status = ref();
const range = ref({
  start: "2024-08-01",
  end: "2024-08-31",
});

const handleFetchData = async () => {
  const params = new URLSearchParams({
    start: props.filters?.start,
    end: props.filters?.end,
    type: "job_booking",
  });

  const markets = [1, 2, 4];

  markets.forEach((market) => params.append("markets[]", String(market)));

  const response = await useApi("api/reports?" + params);

  status.value = response.status.value;
  data.value = response.data.value;
};

await handleFetchData();

const options: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    colors: {
      enabled: true,
    },
  },
};

watch(
  () => props.filters,
  async (newFilters) => {
    await handleFetchData();
  },
  { deep: true }
);
</script>

<template>
  <div>
    <div v-if="status === 'success'" class="h-[800px]">
      <Line :data="(data as ChartData<'line'>)" :options="options" />
    </div>
  </div>
</template>
