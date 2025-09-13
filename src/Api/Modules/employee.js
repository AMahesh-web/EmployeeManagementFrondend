import { api } from "../index";
export default {
  //get all details
  async getemployeeDetails() {
    return await api.get("/employee/viewEmployee");
  },

  //disable the item
  async deleteEmp(id) {
    return await api.delete(`/employee/deleteemp/${id}`);
  },

  //add employee
  async addEmp(payload) {
    return await api.post("/employee/addData", payload);
  },

  //update the data
  async updateEmp(payload) {
    return await api.post("/employee/updateData", payload);
  },

  //get  count of designation
  async countOfdes() {
    return await api.get("/employee/countDes");
  },
};
