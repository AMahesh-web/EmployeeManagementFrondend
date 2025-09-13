<template>
  <div>
    <employee />
  </div>
</template>
<script>
import employee from "@/views/employee management/component/Table.vue";
export default {
  components: {
    employee,
  },
  //   async created() {
  //     await this.getStockDetails();
  //   },

  //   data() {
  //     return {
  //       parentStockData: [],
  //       loading: "",
  //       dataVal: "",
  //     };
  //   },
  //   methods: {
  //     async getStockDetails() {
  //       this.loading = true;
  //       const res = await stockData.getStockDetails();
  //       await new Promise((resolve) => setTimeout(resolve, 2000));
  //       this.parentStockData = res.data.data;
  //       this.loading = false;
  //     },
  //     async disableId(value) {
  //       await stockData.dIsable({ id: value });
  //     },
  //   },
};
</script>
