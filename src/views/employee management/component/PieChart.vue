<template>
  <Chart
    v-if="parentData && parentData.labels.length"
    :chart-data="parentData"
    :chart-options="chartOptions"
    type="pie"
  />
</template>

<script>
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { Chart } from "vue-chartjs";

// Register Chart.js modules
ChartJS.register(Title, Tooltip, Legend, ArcElement);

export default {
  name: "PieChart",
  components: { Chart },
  props: {
    parentData: {
      type: Object,
      required: true,
    },
    chartOptions: {
      type: Object,
      default: () => ({
        responsive: true,
        maintainAspectRatio: false,
      }),
    },
  },
};
</script>
