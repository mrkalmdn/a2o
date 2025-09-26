<script setup lang="ts">
definePageMeta({
  middleware: ["sanctum:auth"],
});

import { Check, Search } from "lucide-vue-next";
import { Button } from "~/components/ui/button";
import {
  Combobox,
  ComboboxAnchor,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxList,
} from "~/components/ui/combobox";
import ConversionFunnel from "~/components/ConversionFunnel.vue";
import JobBooking from "~/components/JobBooking.vue";
import { useApi } from "~/composables/useApi";
import type { DateRange, DateValue } from "reka-ui";
import dayjs from "dayjs";

interface ComboBoxType {
  value: string;
  label: string;
}
const reportComponents: Record<string, any> = {
  job_booking: JobBooking,
  conversion_funnel: ConversionFunnel,
};
const reportTypes: ComboBoxType[] = [
  { value: "job_booking", label: "Job Booking" },
  { value: "conversion_funnel", label: "Conversion Funnel" },
];

const report = ref();
const markets = ref<ComboBoxType[]>([]);
const market = ref();

const filters = ref({
  start: dayjs().format("YYYY-MM-DD"),
  end: dayjs().add(1, "month").format("YYYY-MM-DD"),
  type: "",
  markets: [],
});

const currentReport = computed(() => reportComponents[filters.value.type]);

const handleFetchMarkets = async () => {
  const { data, status, error } = await useApi("api/markets");

  if (status.value === "error") {
    throw error;
  }

  markets.value = data.value as ComboBoxType[];
};
const handleDateRange = (event: DateRange) => {
  if (!event.start || !event.end) {
    return;
  }

  filters.value.start = dayjs(event.start.toString()).format("YYYY-MM-DD");
  filters.value.end = dayjs(event.end.toString()).format("YYYY-MM-DD");
};

await handleFetchMarkets();

const handleDownload = async () => {
  const token = useCookie("sanctum.token.cookie")?.value;

  const params = new URLSearchParams({
    start: filters.value.start,
    end: filters.value.end,
    type: filters.value.type,
  });

  [1, 2, 4].forEach((m: number) => params.append("markets[]", String(m)));

  const response = await fetch(
    `http://localhost:8000/api/exports?${params.toString()}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json, text/csv",
      },
      credentials: "include",
    }
  );

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `${filters.value.type}.csv`;
  a.click();
  window.URL.revokeObjectURL(url);
};
</script>

<template>
  <div class="flex items-center justify-end p-6 gap-2">
    <Combobox v-model="market" by="value" :multiple="true">
      <ComboboxAnchor>
        <div class="relative w-full max-w-sm items-center">
          <ComboboxInput
            class="pl-9"
            :display-value="(val) => val?.label ?? ''"
            placeholder="Select market..."
          />
          <span
            class="absolute start-0 inset-y-0 flex items-center justify-center px-3"
          >
            <Search class="size-4 text-muted-foreground" />
          </span>
        </div>
      </ComboboxAnchor>
      <ComboboxList>
        <ComboboxEmpty> No market found. </ComboboxEmpty>
        <ComboboxGroup>
          <ComboboxItem
            v-for="market in markets"
            :key="market.value"
            :value="market.value"
          >
            {{ market.label }}
            <ComboboxItemIndicator>
              <Check class="ml-auto size-4" />
            </ComboboxItemIndicator>
          </ComboboxItem>
        </ComboboxGroup>
      </ComboboxList>
    </Combobox>

    <Combobox v-model="filters.type" by="value">
      <ComboboxAnchor>
        <div class="relative w-full max-w-sm items-center">
          <ComboboxInput
            class="pl-9"
            :display-value="(val) => val?.label ?? ''"
            placeholder="Select report..."
          />
          <span
            class="absolute start-0 inset-y-0 flex items-center justify-center px-3"
          >
            <Search class="size-4 text-muted-foreground" />
          </span>
        </div>
      </ComboboxAnchor>
      <ComboboxList>
        <ComboboxEmpty> No report found. </ComboboxEmpty>
        <ComboboxGroup>
          <ComboboxItem
            v-for="framework in reportTypes"
            :key="framework.value"
            :value="framework.value"
          >
            {{ framework.label }}
            <ComboboxItemIndicator>
              <Check class="ml-auto size-4" />
            </ComboboxItemIndicator>
          </ComboboxItem>
        </ComboboxGroup>
      </ComboboxList>
    </Combobox>

    <DateRange @update="handleDateRange($event)" />

    <Button class="cursor-pointer" @click="handleDownload()">
      Download CSV
    </Button>
  </div>

  <component
    :is="currentReport"
    :filters="filters"
    :key="`${filters.type}-${filters.start}-${filters.end}`"
  />
</template>
