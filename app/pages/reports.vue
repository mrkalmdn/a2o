<script setup lang="ts">
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

interface ReportType {
  value: string;
  label: string;
}

const reportComponents: any = {
  JobBooking,
  ConversionFunnel,
};
const reportTypes: ReportType[] = [
  { value: "JobBooking", label: "Job Booking" },
  { value: "ConversionFunnel", label: "Conversion Funnel" },
];
const report = ref("JobBooking");

const currentReport = computed(() => reportComponents[report.value]);

const handleDateRange = (event: any) => {};
</script>

<template>
  <div class="flex items-center justify-end p-6 gap-2">
    <div>
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
    </div>
    <div>
      <DateRange @update="handleDateRange($event)" />
    </div>
    <div>
      <Button> Download CSV </Button>
    </div>
  </div>

  <component :is="currentReport" />
</template>
