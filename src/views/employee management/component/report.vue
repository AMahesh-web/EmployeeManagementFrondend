<template>
  <div class="stock-main">
    <div class="stock-sub">
      <div class="stock-head">
        <!--Title of the page-->
        <h2 class="head-title">Employee Details</h2>
      </div>
      <!--Add item Button-->
      <div>
        <v-row>
          <v-col lg="6">
            <v-text-field
              v-model="search"
              variant="outlined"
              placeholder="Search by phone number....."
              label="Phone Number"
              density="compact"
              class="input-items pl-4"
              prepend-inner-icon="mdi-magnify"
            >
            </v-text-field>
          </v-col>
          <v-col lg="6">
            <div class="d-flex justify-content-end">
              <v-btn
                class="add-item"
                height="40px"
                dense
                hide-details
                clearable
                @click="getReport()"
                ><span class="btnText">Generate Report</span></v-btn
              >
            </div>
          </v-col>
        </v-row>
      </div>
      <!-- progess Circular -->
      <div class="text-center"></div>
      <!--table content-->
      <v-container id="data-app">
        <v-card class="pa-1" elevation="6" id="data-card">
          <v-data-table
            :items="filteredEmployees"
            :headers="headers"
            :loading="store.loading"
            :search="search"
          >
            <template #loading>
              <v-progress-linear
                indeterminate
                color="#03a9f4"
                height="4"
              ></v-progress-linear>
              <div class="loading-message">Data Is Loading...</div>
            </template>
            <template
              v-for="header in headers"
              :key="header.value"
              v-slot:[`item.${header.value}`]="props"
            >
              <div class="table-values mt-2">
                <div>
                  <div v-if="header.value === 'name'">
                    {{ props.item.name }}
                  </div>
                  <div v-if="header.value === 'email'">
                    {{ props.item.email }}
                  </div>
                  <div v-if="header.value === 'phone'">
                    {{ props.item.phone }}
                  </div>
                  <div v-if="header.value === 'designation'">
                    {{ props.item.designation }}
                  </div>
                  <div v-if="header.value === 'monthly_salary_package'">
                    {{ props.item.monthly_salary_package }}
                  </div>
                  <div v-if="header.value === 'monthly_tax_value'">
                    {{ props.item.monthly_tax_value }}
                  </div>
                  <div v-if="header.value === 'yearly_increasing_bonus'">
                    {{ props.item.yearly_increasing_bonus }}
                  </div>
                  <div v-if="header.value === 'monthly_net_salary'">
                    {{ props.item.monthly_net_salary }}
                  </div>
                  <div v-if="header.value === 'yearly_net_salary'">
                    {{ props.item.yearly_net_salary }}
                  </div>
                </div>

                &nbsp;&nbsp;&nbsp;
              </div>
            </template>
          </v-data-table>
        </v-card>
      </v-container>
    </div>
  </div>
</template>
<script>
//import pinia store
import { useEmployeeStore } from "@/useEmployeeStore";

//import jspdf
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default {
  components: {},

  data() {
    return {
      headers: [
        { title: "Name", value: "name" },
        { title: "Email", value: "email" },
        { title: "Phone", value: "phone" },
        { title: "Designation", value: "designation" },
        { title: "Monthly Salary", value: "monthly_salary_package" },
        { title: "Monthly Tax", value: "monthly_tax_value" },
        { title: "Yearly Bonus", value: "yearly_increasing_bonus" },
        { title: "Monthly Net Salary", value: "monthly_net_salary" },
        { title: "Yearly Net Salary", value: "yearly_net_salary" },
      ],
      search: "",

      //define pinia
      store: useEmployeeStore(),
    };
  },
  mounted() {
    this.store.getEmployeeDetails();
  },
  //search data
  computed: {
    filteredEmployees() {
      //if search is empty show all data
      if (!this.search) return this.store.parentStockData;
      //when the user find data
      return this.store.parentStockData.filter((emp) =>
        String(emp.phone).toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },

  methods: {
    //report Generate
    getReport() {
      const doc = new jsPDF();

      // Title
      doc.setFontSize(18);
      doc.text("Mahesh & sons Pvt Ltd", 105, 20, { align: "center" });
      doc.setFontSize(12);
      doc.text("Employee Payslip", 105, 30, { align: "center" });
      doc.line(10, 35, 200, 35);

      // Extract headers (exclude Action)
      const headers = this.headers
        .filter((h) => h.value !== "Action")
        .map((h) => h.title);

      // Extract rows
      const rows = this.store.parentStockData.map((emp) =>
        this.headers
          .filter((h) => h.value !== "Action")
          .map((h) => emp[h.value])
      );

      // Generate table
      autoTable(doc, {
        head: [headers],
        body: rows,
        startY: 40,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [3, 169, 244] }, // blue header
      });
      const pageHeight = doc.internal.pageSize.height;
      doc.setFontSize(10);
      doc.text("This is a system generated payslip.", 20, pageHeight - 20);
      doc.text(
        "Authorized Signature: ___________________",
        120,
        pageHeight - 20
      );

      //open separate tab
      window.open(doc.output("bloburl"), "_blank");
    },
  },
};
</script>
<style scoped>
.loading-message {
  font-size: 16px;
  text-align: center;
  padding: 10px 0;
  font-weight: bold;
  color: #03a9f4;
}
</style>
