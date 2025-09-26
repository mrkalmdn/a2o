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

const data = ref();
const status = ref();
const range = ref({
  start: "2024-08-01",
  end: "2024-08-31",
});

const handleFetchData = async () => {
  const response = await useFetch(
    `http://a2o-api.test/api/reports?start=${range.value.start}&end=${range.value.end}&type=job_booking`
  );

  status.value = response.status.value;
  data.value = response.data.value;
};

await handleFetchData();

const handleDateRange = async (event: DateRange) => {
  if (!event.start || !event.end) {
    return;
  }

  range.value.start = dayjs(event.start.toString()).format("YYYY-MM-DD");
  range.value.end = dayjs(event.end.toString()).format("YYYY-MM-DD");

  await handleFetchData();
};

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
    <div v-if="status === 'success'" class="h-[600px]">
      <div class="flex items-center justify-end p-6 gap-2">
        <div>
          <DateRange @update="handleDateRange($event)" />
        </div>
        <div>
          <Button> Download CSV </Button>
        </div>
      </div>

      <Line :data="(data as ChartData<'line'>)" :options="options" />
    </div>
  </div>
</template>
