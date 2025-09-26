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

const props = defineProps(["filters"]);

const loading = ref(false);
const data = ref();
const status = ref();

const handleFetchData = async () => {
  const params = new URLSearchParams({
    start: props.filters?.start,
    end: props.filters?.end,
    type: "conversion_funnel",
  });
  const markets = [1, 2, 4];
  markets.forEach((market) => params.append("markets[]", String(market)));
  const response = await useApi("api/reports?" + params);

  data.value = response.data.value;
  status.value = response.status.value;
};

await handleFetchData();

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
    <div v-if="status === 'success'" class="h-[800px]">
      <Bar :data="(data as ChartData<'bar'>)" :options="options" />
    </div>
  </div>
</template>
