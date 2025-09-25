<script setup lang="ts">
import { LineChart } from "~/components/ui/chart-line";

const data: any = [
  {
    date: "2024-08-01",
    "pd-memphis": 0,
    "pd-northern-nj": 3,
    "pd-long-island": 6,
  },
  {
    date: "2024-08-02",
    "pd-memphis": 0,
    "pd-northern-nj": 3,
    "pd-long-island": 5,
  },
  {
    date: "2024-08-03",
    "pd-memphis": 0,
    "pd-northern-nj": 6,
    "pd-long-island": 5,
  },
  {
    date: "2024-08-04",
    "pd-memphis": 0,
    "pd-northern-nj": 6,
    "pd-long-island": 2,
  },
  {
    date: "2024-08-05",
    "pd-memphis": 0,
    "pd-northern-nj": 12,
    "pd-long-island": 3,
  },
  {
    date: "2024-08-06",
    "pd-memphis": 0,
    "pd-northern-nj": 9,
    "pd-long-island": 9,
  },
  {
    date: "2024-08-07",
    "pd-memphis": 2,
    "pd-northern-nj": 11,
    "pd-long-island": 3,
  },
  {
    date: "2024-08-08",
    "pd-memphis": 0,
    "pd-northern-nj": 9,
    "pd-long-island": 1,
  },
  {
    date: "2024-08-09",
    "pd-memphis": 0,
    "pd-northern-nj": 5,
    "pd-long-island": 4,
  },
  {
    date: "2024-08-10",
    "pd-memphis": 0,
    "pd-northern-nj": 5,
    "pd-long-island": 2,
  },
  {
    date: "2024-08-11",
    "pd-memphis": 0,
    "pd-northern-nj": 6,
    "pd-long-island": 1,
  },
  {
    date: "2024-08-12",
    "pd-memphis": 0,
    "pd-northern-nj": 5,
    "pd-long-island": 3,
  },
  {
    date: "2024-08-13",
    "pd-memphis": 2,
    "pd-northern-nj": 4,
    "pd-long-island": 7,
  },
  {
    date: "2024-08-14",
    "pd-memphis": 0,
    "pd-northern-nj": 11,
    "pd-long-island": 4,
  },
  {
    date: "2024-08-15",
    "pd-memphis": 0,
    "pd-northern-nj": 3,
    "pd-long-island": 2,
  },
  {
    date: "2024-08-16",
    "pd-memphis": 0,
    "pd-northern-nj": 7,
    "pd-long-island": 3,
  },
  {
    date: "2024-08-17",
    "pd-memphis": 0,
    "pd-northern-nj": 4,
    "pd-long-island": 3,
  },
  {
    date: "2024-08-18",
    "pd-memphis": 0,
    "pd-northern-nj": 2,
    "pd-long-island": 1,
  },
  {
    date: "2024-08-19",
    "pd-memphis": 0,
    "pd-northern-nj": 8,
    "pd-long-island": 3,
  },
  {
    date: "2024-08-20",
    "pd-memphis": 0,
    "pd-northern-nj": 5,
    "pd-long-island": 4,
  },
  {
    date: "2024-08-21",
    "pd-memphis": 0,
    "pd-northern-nj": 9,
    "pd-long-island": 4,
  },
  {
    date: "2024-08-22",
    "pd-memphis": 0,
    "pd-northern-nj": 2,
    "pd-long-island": 2,
  },
  {
    date: "2024-08-23",
    "pd-memphis": 0,
    "pd-northern-nj": 5,
    "pd-long-island": 6,
  },
  {
    date: "2024-08-24",
    "pd-memphis": 0,
    "pd-northern-nj": 5,
    "pd-long-island": 3,
  },
  {
    date: "2024-08-25",
    "pd-memphis": 0,
    "pd-northern-nj": 7,
    "pd-long-island": 4,
  },
  {
    date: "2024-08-26",
    "pd-memphis": 0,
    "pd-northern-nj": 7,
    "pd-long-island": 1,
  },
  {
    date: "2024-08-27",
    "pd-memphis": 0,
    "pd-northern-nj": 3,
    "pd-long-island": 6,
  },
  {
    date: "2024-08-28",
    "pd-memphis": 0,
    "pd-northern-nj": 3,
    "pd-long-island": 5,
  },
  {
    date: "2024-08-29",
    "pd-memphis": 0,
    "pd-northern-nj": 9,
    "pd-long-island": 3,
  },
  {
    date: "2024-08-30",
    "pd-memphis": 0,
    "pd-northern-nj": 7,
    "pd-long-island": 8,
  },
  {
    date: "2024-08-31",
    "pd-memphis": 0,
    "pd-northern-nj": 0,
    "pd-long-island": 0,
  },
];
const categories: any = ["pd-memphis", "pd-northern-nj", "pd-long-island"];
</script>

<template>
  <div class="max-w-7xl mx-auto p-10">
    <LineChart
      class="h-1/2"
      :data="data"
      :categories="categories"
      :colors="['blue', 'pink', 'orange', 'red']"
      index="date"
      :show-x-axis="true"
      :show-y-axis="true"
    />
  </div>
</template>
