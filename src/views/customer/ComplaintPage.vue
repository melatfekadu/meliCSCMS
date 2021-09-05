<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="12">
        <base-material-card color="warning">
          <template v-slot:heading>
            <div class="text-h3 font-weight-light">Fill your Complaint</div>
          </template>

          <v-form>
            <v-container class="py-0">
              <v-row>
                <!-- <v-col cols="6">
                  <v-text-field
                    v-model="user_name"
                    label="User Name"
                    class="purple-input"
                  />
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="address"
                    label="Address"
                    class="purple-input"
                    type="address"
                  /> -->

                <!-- <v-col cols="12" md="4">
                  <v-text-field
                    v-model="phone_no"
                    class="purple-input"
                    label="Phone Number"
                    type="number"
                  /> -->

                <v-select
                  v-model="select"
                  :items="items"
                  :rules="[v => !!v || ' Compliant is required']"
                  label="Complaint"
                  required
                ></v-select>

                <v-col cols="50" md="11">
                  <v-textarea
                    v-model="description"
                    class="purple-input"
                    label="Fill Your Complaints"
                    value=""
                  />
                </v-col>

                <v-col cols="12" class="text-right">
                  <v-btn
                    color="success"
                    class="mr-0"
                    @click="registerComplaint"
                    :disabled="!valid"
                  >
                    Register Complaint
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
import * as cookies from "@/cookies";
import { variables, checkAuth, separateView } from "@/global";
export default {
  async created() {
    if (!(await checkAuth())) {
      this.$router.push("/login");
    }

    if (variables.logged_user.type != "customer") {
      this.$router.push("/");
    }
  },

  data() {
    return {
      drawer: false,
      links: [],
      valid: true,
      select: null,
      customer_service: [
        "Corruption",
        "Meter",
        "Bill Unavailable",
        "New Connection Delay",
        "Relocation Delay",
        "Unsatisfaied by Service",
        "Unqualified Employee",
        "Power Loss"
      ],
      maintainance: ["Emergency", "Manintenance Problem"],
      assistance: ["Other"],
      items: [
        "Emergency",
        "Corruption",
        "Meter",
        "Bill Unavailable",
        "New Connection Delay",
        "Relocation Delay",
        "Manintenance Problem",
        "Unsatisfaied by Service",
        "Unqualified Employee",
        "Power Loss",
        "Other"
      ],
      department: null,

      description: ""
    };
  },
  methods: {
    async logout() {
      let token = cookies.get("logged_user");
      //console.log(token);
      await axios
        .post("http://localhost:3000/logout", { token: token })
        .then(response => {
          if (!response.data.header.error) {
            cookies.remove("logged_user");
            variables.logged_user = {};
            this.$router.push("/login");
          }
        });
    },
    registerComplaint() {
      //if (this.$refs.form.validate()) {
      let cust = [
        "Corruption",
        "Meter",
        "Bill Unavailable",
        "New Connection Delay",
        "Relocation Delay",
        "Unsatisfaied by Service",
        "Unqualified Employee",
        "Power Loss"
      ];
      let main = ["Emergency", "Manintenance Problem"];

      if (cust.find(value => value == this.select)) {
        this.department = "Customer_Service";
      } else {
        if (main.find(value => value == this.select)) {
          this.department = "Operation_Maintenance";
        } else {
          this.department = "Assistance";
        }
      }

      console.log(this.department);

      let token = cookies.get("logged_user");
      let newComplaint = {
        token: token,
        select: this.select,
        department: this.department,
        description: this.description
      };
      // console.log("newCustomer", newCustomer);
      axios
        .post("http://localhost:3000/complaints", newComplaint)

        .then(() => {
          console.log(variables.logged_user),
            swal("Great!", "Complaint registered successfuly", "success"),
            this.$router.push({ path: "/ongoing" });
          this.$refs.form.reset();
        })
        .catch(err => {
          console.log(err);
        });
      //} // VALIDATION END
      return true;
    }
  }
};
</script>
