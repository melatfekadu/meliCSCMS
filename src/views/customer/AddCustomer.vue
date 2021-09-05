<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <base-material-card>
          <template v-slot:heading>
            <div class="text-h3 font-weight-light">Add New Customer</div>
          </template>

          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="bp_number"
                    label="Bp_number"
                    :rules="[v => !!v || 'Bp number is required']"
                    class="purple-input"
                  />
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="user_name"
                    class="purple-input"
                    :rules="[v => !!v || 'username is required']"
                    label="User Name"
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

                <v-col cols="12">
                  <v-text-field
                    v-model="address"
                    label="Adress"
                    class="purple-input"
                    :rules="[v => !!v || 'Address is required']"
                  />
                </v-col>

                <v-col cols="12" md="4">
                  <v-select
                    v-model="gender"
                    :items="items"
                    label="Gender"
                    class="purple-input"
                  />
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="phone_no"
                    class="purple-input"
                    label="Phone Number"
                    :counter="10"
                    :rules="phoneRules"
                    type="number"
                  />
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="password"
                    label="Password"
                    class="purple-input"
                    :rules="[v => !!v || 'password is required']"
                  />
                </v-col>
                <v-col cols="12" class="text-right">
                  <v-btn
                    color="success"
                    class="mr-0"
                    @click="register"
                    :disabled="!true"
                    >Register</v-btn
                  >
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
      bp_number: "",
      first_name: "",
      last_name: "",
      email: "",
      phone_no: "",
      phoneRules: [
        v => !!v || "phone number is required",
        v => (v && v.length <= 10) || ""
      ],
      address: "",
      gender: null,
      items: ["Female", "Male"],

      user_name: "",
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
    username(newCustomer) {
      this.newValue = newCustomer.bp_number;
      this.networkIssueVerifyingCustomerUsername = false;
      //this.valid = false;
      this.isCustomerUsernameTaken = false;
      axios
        .get(
          "http://localhost:3000/customers/isUsernameTaken?bp_number=" +
            this.newValue
        )
        .then(({ data: { isTaken } }) => {
          if (isTaken) {
            this.isCustomerUsernameTaken = true;
            this.valid = false;
            swal("Warning", "This Customer Already Exists", "warning");
          } else {
            this.isCustomerUsernameTaken = false;
            this.valid = true;
            console.log(true);
            axios
              .post("http://localhost:3000/customers", newCustomer)

              .then(() => {
                swal("Great!", "customer added successfully", "success"),
                  this.$router.push({ path: "/admin" });
                this.$refs.form.reset();
                this.get("/customers", (req, res) => {
                  res.render("/");
                }).t;
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

    register() {
      if (this.validate()) {
        let newCustomer = {
          bp_number: this.bp_number,
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          phone_no: this.phone_no,
          address: this.address,
          gender: this.gender,
          user_name: this.user_name,
          password: this.password
        };

        this.username(newCustomer);

        return true;
      } else {
        swal("Error!", "Requirred field missing", "error");
      }
    }
  }
};
</script>
