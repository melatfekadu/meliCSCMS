<template>
  <v-container id="AddEmployee" fluid tag="section">
    <!-- <AddEmployeeDrawer />
  <AddEmployeeAppBar />
  <AddEmployeeView />
  <AddEmployeeSettings /> -->
    <v-row justify="center">
      <v-col cols="12" md="8">
        <base-material-card>
          <template v-slot:heading>
            <div class="text-h3 font-weight-light">
              Add New Employee
            </div>
          </template>

          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="user_name"
                    class="purple-input"
                    label="User Name"
                    :rules="[v => !!v || 'username is required']"
                  />
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="email"
                    label="Email Address"
                    class="purple-input"
                    :rules="[v => !!v || 'Email is required']"
                  />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="first_name"
                    label="First Name"
                    class="purple-input"
                    :rules="[v => !!v || 'First name is required']"
                  />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="last_name"
                    label="Last Name"
                    class="purple-input"
                    :rules="[v => !!v || 'Last name is required']"
                  />
                </v-col>

                <v-col cols="12" md="4">
                  <v-select
                    v-model="gender"
                    :items="items2"
                    label="Gender"
                    class="purple-input"
                    :rules="[v => !!v || 'Gender is required']"
                  />
                </v-col>
                <v-col cols="12" md="4">
                  <v-select
                    v-model="department"
                    :items="items"
                    label="Department"
                    class="purple-input"
                    :rules="[v => !!v || 'Departement is required']"
                  />
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="phone_no"
                    class="purple-input"
                    label="Phone Number"
                    :counter="10"
                    :rules="phoneRules"
                  />
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="password"
                    label="Password"
                    class="purple-input"
                    :rules="[v => !!v || 'Password is required']"
                  />
                </v-col>
                <v-col cols="12" class="text-right">
                  <v-btn
                    color="success"
                    class="mr-0"
                    @click="empRegister"
                    :disabled="false"
                  >
                    Register
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      drawer: false,
      links: [],
      valid: true,
      first_name: "",
      // firstnameRules: [
      //   v => !!v || 'Fisrt Name is required',
      //   v => (v && v.length <= 20) || 'Name must be less than 10 characters',
      // ],
      last_name: "",
      // lastnameRules: [
      //   v => !!v || 'Last Name is required',
      //   v => (v && v.length <= 20) || 'Name must be less than 10 characters',
      // ],
      email: "",
      // emailRules: [
      //   v => !!v || 'E-mail is required',
      //   v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      // ],
      phone_no: "",
      phoneRules: [
        v => !!v || "phone number is required",
        v => (v && v.length <= 10) || ""
      ],
      gender: null,
      items2: ["Female", "Male"],

      department: null,
      items: [
        "manager",
        "Operation_Maintenance",
        "Customer_Service",
        "caseworker",
        "Admin"
      ],
      user_name: "",
      // idRules: [
      //   v => !!v || 'ID is required',
      //   v => (v && v.length <= 20) || 'ID must be less than 10 characters',
      // ],

      password: ""
    };
  },
  methods: {
    validate() {
      if (
        this.first_name == "" ||
        this.last_name == "" ||
        this.email == "" ||
        this.phone_no == "" ||
        this.select == "" ||
        this.location == "" ||
        this.description == ""
      ) {
        return false;
      } else {
        return true;
      }
    },
    generateId() {
      this.str = "";
      this.bank =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (this.i = 0; this.i < 6; this.i++) {
        this.str += this.bank[Math.floor(Math.random() * this.bank.length)];
      }
      return this.str;
    },

    username(newEmployee) {
      this.newValue = newEmployee.email;
      this.networkIssueVerifyingCustomerUsername = false;
      //this.valid = false;
      this.isCustomerUsernameTaken = false;
      axios
        .get("http://localhost:3000/employees/isIdTaken?email=" + this.newValue)
        .then(({ data: { isTaken } }) => {
          if (isTaken) {
            this.isCustomerUsernameTaken = true;
            this.valid = false;
            swal("Warning", "This Employee Already Exists", "warning");
          } else {
            this.isCustomerUsernameTaken = false;
            this.valid = true;
            axios
              .post("http://localhost:3000/employees", newEmployee)

              .then(() => {
                this.$router.push({ path: "/admin" });
                this.$refs.form.reset();
              })
              .catch(err => {
                console.log(err);
              });
          }
        })
        .catch(err => {
          this.networkIssueVerifyingCustomerUsername = true;
          this.valid = false;
          console.log("Dasdasdasd" + true);
          swal("Error!", "Network Error", "error");
        });
    },

    empRegister() {
      // if (this.$refs.form.validate()) {
      if (this.validate()) {
        let newEmployee = {
          emp_id: this.generateId(),
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          phone_no: this.phone_no,
          branch: this.branch,
          department: this.department,
          gender: this.gender,
          user_name: this.user_name,
          password: this.password
        };

        ///////start
        this.username(newEmployee);
        //////////end
        //} // VALIDATION END
        return true;
      } else {
        swal("Error!", "Required field missing", "error");
      }
    }
  }
};
</script>
