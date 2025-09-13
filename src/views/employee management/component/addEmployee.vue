<template>
  <div class="addFormComponant">
    <v-sheet class="addFormSheet" v-model="showForm">
      <div class="sub-division">
        <v-btn
          class="position-absolute top-1 right-0 mt-2 mr-2 close-button"
          size="x-small"
          @click="closeForm()"
          elevation="4"
        >
          <v-icon class="close-icon">mdi-close</v-icon>
        </v-btn>
        <div class="sub-title">
          <h5 class="headdingTitle">Add New Employee</h5>
        </div>
      </div>
      <!--Form division-->
      <div class="item-form overflow-auto">
        <v-form ref="formDetails" v-model="formValid" class="item-input-form">
          <v-card class="form-card" elevation="8">
            <v-container>
              <v-row>
                <v-col lg="12" sm="12" xs="12" cols="12">
                  <v-row>
                    <v-col lg="12" md="12" sm="12" xs="12" cols="12">
                      <!-- employee Name -->
                      <v-label class="formLabel">Employee Id</v-label>
                      <div class="form-input">
                        <v-text-field
                          v-model="form.empid"
                          variant="outlined"
                          placeholder="Employee Id....."
                          label="Employee Id"
                          density="compact"
                          class="input-items"
                          readonly
                        ></v-text-field>
                      </div>
                    </v-col>
                    <v-col lg="12" md="12" sm="12" xs="12" cols="12">
                      <!-- employee Name -->
                      <v-label class="formLabel">Employee Name</v-label>
                      <div class="form-input">
                        <v-text-field
                          v-model="form.name"
                          variant="outlined"
                          placeholder="Employee Name....."
                          label="Employee Name"
                          density="compact"
                          class="input-items"
                          :rules="[required, lengthOfCharacter, stringAndSpace]"
                        ></v-text-field>
                      </div>
                    </v-col>
                  </v-row>
                  <!-- Employee Email.  -->
                  <v-row>
                    <v-col xl="12" lg="12" md="12" sm="12" xs="12" cols="12">
                      <v-label class="formLabel">Employee Email</v-label>
                      <div class="form-input">
                        <v-text-field
                          variant="outlined"
                          placeholder="Email....."
                          label="Email"
                          density="compact"
                          class="input-items"
                          v-model="form.email"
                          :rules="[required, email]"
                        ></v-text-field>
                      </div>
                    </v-col>
                  </v-row>
                  <!-- phone number -->
                  <v-row>
                    <v-col xl="12" lg="12" md="12" sm="12" xs="12" cols="12">
                      <v-label class="formLabel">Employee Phone number</v-label>
                      <div class="form-input">
                        <v-text-field
                          variant="outlined"
                          placeholder="Phone number....."
                          label="phone number"
                          density="compact"
                          class="input-items"
                          v-model="form.phone"
                          :rules="[required, onlyNumbers]"
                        ></v-text-field>
                      </div>
                    </v-col>
                  </v-row>
                  <!-- Designation -->
                  <v-row>
                    <v-col lg="12" md="12" sm="12" xs="12" cols="12">
                      <v-label class="formLabel">Designation</v-label>
                      <div class="form-input">
                        <v-select
                          :items="['Intern', 'Associate', 'Senior', 'Manager']"
                          variant="outlined"
                          label="Designation"
                          density="compact"
                          class="input-items"
                          v-model="form.designation"
                          :rules="[required]"
                        ></v-select>
                      </div>
                    </v-col>
                  </v-row>
                  <!--Monthly Salary -->
                  <v-row>
                    <v-col lg="12" md="12" sm="12" xs="12" cols="12">
                      <v-label class="formLabel">Monthly Salary</v-label>
                      <div class="form-input">
                        <v-text-field
                          variant="outlined"
                          placeholder="Monthly Salary....."
                          label="Monthly Salary"
                          density="compact"
                          class="input-items"
                          v-model="form.monthly_salary_package"
                          :rules="[required, onlyNumbers]"
                        >
                        </v-text-field>
                      </div>
                    </v-col>
                  </v-row>

                  <!-- submit button -->
                </v-col>
              </v-row>
              <v-row class="px-4 pt-4">
                <!-- Submit button -->
                <v-col lg="6" sm="12" xs="12" cols="12">
                  <v-btn
                    block
                    class="subButton"
                    elevation="8"
                    :disabled="!formValid"
                    @click="submitData"
                    :loading="store.loading"
                    ><span class="text">Submit</span></v-btn
                  >
                </v-col>
                <v-col lg="6" sm="12" xs="12" cols="12">
                  <!-- close Button -->
                  <v-btn
                    block
                    class="subButton"
                    color="#ff0900"
                    elevation="8"
                    @click="closeForm()"
                    ><span class="text">Cancel</span></v-btn
                  >
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-form>
      </div>
    </v-sheet>
  </div>
</template>
<script>
//import pinia
import { useEmployeeStore } from "@/useEmployeeStore";
import { uiStock } from "@/functionStock";
//import sweet alert
import Swal from "sweetalert2";

export default {
  //get item code randomly
  mounted() {
    this.itemIdRandom();
  },
  data() {
    return {
      //form validation
      formValid: false,
      //get data from form
      form: {
        empid: "",
        name: "",
        email: "",
        phone: "",
        designation: "",
        monthly_salary_package: "",
      },
      //PINIA STORE
      store: useEmployeeStore(),
      uiStore: uiStock(),
    };
  },
  methods: {
    //random item id
    itemIdRandom() {
      this.form.empid = "EMP/" + Math.floor(1 + Math.random() * 1000);
    },
    //CLOSE THE FORM
    async closeForm() {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "All unsaved changes will be lost.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, cancel",
        cancelButtonText: "No, keep editing",
        confirmButtonColor: "#ff0900",
        cancelButtonColor: "#004DA7",
        color: "#000000",
      });
      if (result.isConfirmed) {
        this.uiStore.closeAddItem();
        Swal.fire("Cancelled", "All Data has been cleared", "success");
      }
    },
    async submitData() {
      await this.store.addemp(this.form);
      this.uiStore.closeAddItem();
    },
  },
};
</script>
