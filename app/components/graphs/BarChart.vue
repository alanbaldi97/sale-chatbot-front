<template>
  <BarChart :chartData="props.chartData" :chartOptions="props.chartOptions" />
</template>

<script setup lang="ts">
import { BarChart } from 'vue-chart-3';
import { Chart, registerables, type ChartData, type ChartOptions } from "chart.js";

Chart.register(...registerables);


const props = defineProps({
    chartData: {
        type: Object as () => ChartData<'bar'>,
        required: true
    },
    chartOptions: {
        type: Object as () => ChartOptions<'bar'>,
        required: false,
        default: () => ({})
    }
});


</script>