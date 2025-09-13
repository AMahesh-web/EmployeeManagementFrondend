<template>
  <v-container class="dashBord">
    <v-row>
      <!-- Pie Chart -->
      <v-col cols="12" md="6">
        <v-card class="dashboardCard">
          <!-- heading -->
          <v-card-title class="dasbordTitle"
            >Summary of Employee Positions</v-card-title
          >
          <v-card-text class="card-text">
            <canvas
              :lang="store.loading"
              class="cnavas"
              ref="pieCanvas"
            ></canvas>
          </v-card-text>
        </v-card>
      </v-col>
      <!-- Label counter -->
      <v-col cols="12" md="6">
        <v-card class="pa-4 label" outlined>
          <!-- label heading -->
          <v-card-title class="label-title">Number of posts</v-card-title>
          <v-list dense class="vlistCanvas">
            <v-list-item
              v-for="(count, index) in chartData.datasets[0].data"
              :key="index"
            >
              <v-list-item-content>
                <v-list-item-title>
                  <span
                    :style="{
                      color: chartData.datasets[0].backgroundColor[index],
                    }"
                  >
                  </span>
                  {{ chartData.labels[index] }}: {{ count }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
//import chart
import { Chart } from "chart.js/auto";
//import pinia store
import { useEmployeeStore } from "@/useEmployeeStore";

export default {
  name: "Dashboard",
  data() {
    return {
      chart: null,
      chartData: {
        labels: [],
        datasets: [
          {
            label: "Employee Count",
            data: [],
            backgroundColor: ["#3f51b5", "#e91e63", "#ff9800", "#4caf50"],
          },
        ],
      },
      //define pinia
      store: useEmployeeStore(),
    };
  },
  async created() {
    await this.store.getCountOfdata();

    // map to chart data
    this.chartData.labels = this.store.dashBoard.map(
      (item) => item.designation
    );
    this.chartData.datasets[0].data = this.store.dashBoard.map(
      (item) => item.total
    );

    //make chart
    const ctx = this.$refs.pieCanvas.getContext("2d");
    this.chart = new Chart(ctx, {
      type: "pie",
      data: this.chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  },
  beforeUnmount() {
    if (this.chart) this.chart.destroy();
  },
};
</script>
