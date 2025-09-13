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
                @click="uiStore.openAddItem"
                ><span class="btnText">Add Employee</span></v-btn
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
                <!--Action Button -->
                <div v-if="header.value === 'Action'" class="d-flex gap-2">
                  <v-btn icon @click="updateemp(props.item)" color="">
                    <v-icon color="#2196F3">mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn icon @click="deleteEmp(props.item.id)">
                    <v-icon color="#D50000">mdi-delete</v-icon>
                  </v-btn>
                  <v-btn icon @click="getReport(props.item.id)">
                    <v-icon color="#009688">mdi-file-pdf-box</v-icon>
                  </v-btn>
                </div>

                &nbsp;&nbsp;&nbsp;
              </div>
            </template>
          </v-data-table>
        </v-card>
      </v-container>
    </div>
  </div>
  <div></div>
  <!--Add employee form-->
  <div>
    <v-dialog
      class="v-dialog1"
      v-model="uiStore.addItem"
      zIndex="1056"
      persistent
    >
      <addEmployeeForm />
    </v-dialog>
  </div>

  <!--Update Form-->
  <div>
    <v-dialog
      class="v-dialog1"
      v-model="uiStore.updateItem"
      zIndex="1055"
      persistent
      ><updateEmployeeForm :updateFoem="updatevalue"
    /></v-dialog>
  </div>
</template>
<script>
import addEmployeeForm from "@/views/employee management/component/addEmployee.vue";
import updateEmployeeForm from "@/views/employee management/component/update.vue";

//import pinia store
import { useEmployeeStore } from "@/useEmployeeStore";
import { uiStock } from "@/functionStock";

//import sweet alert
import Swal from "sweetalert2";

//import jspdf
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default {
  components: {
    addEmployeeForm,
    updateEmployeeForm,
  },

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
        { title: "Action", value: "Action" },
      ],
      search: "",
      employees: [],

      //update form
      updatevalue: [],

      //define pinia
      store: useEmployeeStore(),
      uiStore: uiStock(),
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
    //update employee
    updateemp(value) {
      this.uiStore.openEditForm();
      this.updatevalue = { ...value };
    },

    //delete emp details
    async deleteEmp(id) {
      const result = await Swal.fire({
        title: "Do you want to Delete the record?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes,Do ",
        cancelButtonText: "No, keep it as it is.",
        confirmButtonColor: "#ff0900",
        cancelButtonColor: "#004DA7",
        color: "#000000",
      });
      if (result.isConfirmed) {
        await this.store.deletEmp(id);
        Swal.fire("success", "The Employee has been deleted", "success");
      }
    },

    //report Generate
    getReport(data) {
      //get id related data
      const emp = this.store.parentStockData.find((e) => e.id === data);
      if (!emp) return;

      const doc = new jsPDF();

      //set the heading
      doc.setFontSize(18);
      doc.text("Mahesh & sons Pvt Ltd", 105, 20, { align: "center" });
      doc.setFontSize(14);
      doc.text("Employee Payslip", 105, 30, { align: "center" });
      doc.line(20, 35, 190, 35);

      autoTable(doc, {
        startY: 45,
        theme: "grid",
        head: [["Field", "Value"]],
        body: [
          ["Name", emp.name],
          ["Email", emp.email],
          ["Phone", emp.phone],
          ["Designation", emp.designation],
          ["Monthly Salary", emp.monthly_salary_package],
          ["Monthly Tax", emp.monthly_tax_value],
          ["Yearly Bonus", emp.yearly_increasing_bonus],
          ["Monthly Net Salary", emp.monthly_net_salary],
          ["Yearly Net Salary", emp.yearly_net_salary],
        ],
        styles: { fontSize: 11, cellPadding: 4 },
        headStyles: { fillColor: [63, 81, 181] },
      });
      //set the footer and signature
      const pageHeight = doc.internal.pageSize.height;
      doc.setFontSize(10);
      doc.text("This is a system generated payslip.", 20, pageHeight - 20);
      doc.text(
        "Authorized Signature: ___________________",
        120,
        pageHeight - 20
      );
      // Save PDF with employee name
      doc.save(`${emp.name}_Payslip.pdf`);
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
