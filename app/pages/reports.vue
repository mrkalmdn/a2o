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

interface ComboBoxType {
  value: string;
  label: string;
}
const reportComponents: any = {
  JobBooking,
  ConversionFunnel,
};
const reportTypes: ComboBoxType[] = [
  { value: "JobBooking", label: "Job Booking" },
  { value: "ConversionFunnel", label: "Conversion Funnel" },
];

const report = ref();
const markets = ref<ComboBoxType[]>([]);
const market = ref();
const currentReport = computed(() => reportComponents[report.value]);

const handleFetchMarkets = async () => {
  const { data, status, error } = await useApi("api/markets");

  if (status.value === "error") {
    throw error;
  }

  markets.value = data.value as ComboBoxType[];
};
const handleDateRange = (event: any) => {};

await handleFetchMarkets();
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

    <Combobox v-model="report" by="value">
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

    <Button> Download CSV </Button>
  </div>

  <component :is="currentReport" />
</template>
