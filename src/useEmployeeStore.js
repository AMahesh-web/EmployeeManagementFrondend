import { defineStore } from "pinia";
import Swal from "sweetalert2";
import employeeData from "@/Api/Modules/employee";

export const useEmployeeStore = defineStore("employeetore", {
  state: () => ({
    parentStockData: [],
    loading: false,
    dashBoard: [],
  }),

  actions: {
    //get employee details
    async getEmployeeDetails() {
      try {
        this.loading = true;
        const res = await employeeData.getemployeeDetails();
        this.parentStockData = res.data.data;
      } catch (err) {
        this.error = err;
        throw err;
      } finally {
        this.loading = false;
      }
    },

    //get count of designation
    async getCountOfdata() {
      try {
        const res = await employeeData.countOfdes();
        this.dashBoard = res.data.data;
      } catch (err) {
        this.error = err;
        throw err;
      } finally {
      }
    },

    //delete employee
    async deletEmp(id) {
      try {
        this.loading = true;
        await employeeData.deleteEmp(id);
        await this.getEmployeeDetails();
      } catch (err) {
        this.error = err;
        throw err;
      } finally {
        this.loading = false;
      }
    },
    //add employee
    async addemp(payload) {
      try {
        this.loading = true;
        await employeeData.addEmp(payload);
        await this.getEmployeeDetails();
        Swal.fire("Success", "Data added successfully", "success");
      } catch (err) {
        Swal.fire("Error", "Failed to add Employee", "error");
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    //update employee
    async updateEmp(payload) {
      try {
        this.loading = true;
        await employeeData.updateEmp(payload);
        await this.getEmployeeDetails();
        Swal.fire("Success", "Updated successfully", "success");
      } catch (err) {
        Swal.fire("Error", "Data Update is failed", "error");
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
  },
});
