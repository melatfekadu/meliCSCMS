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
                <v-col cols="6">
                  <v-text-field
                    v-model="date"
                    label="Date"
                    class="purple-input"
                    type="date"
                  />
                </v-col>
                <v-col cols="6">
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
                  />
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="phone_no"
                    class="purple-input"
                    label="Phone Number"
                    type="number"
                  />
                </v-col>
                <v-card>
                  <v-card-title> List of possible Complaints </v-card-title>
                  <v-card-text>
                    <div
                      style="
                        font-family: sans-serif;
                        font-size: 17px;
                        font-weight: lighter;
                        margin-bottom: 0;
                      "
                    >
                      1. If your complaint is "Emergency"= choose Operation
                      Maintenance.
                    </div>
                  </v-card-text>
                  <v-card-text>
                    <div
                      style="
                        font-family: sans-serif;
                        font-size: 17px;
                        font-weight: lighter;
                        margin-bottom: 0;
                      "
                    >
                      2.If your complaint is "curruption"= choose Customer
                      Service.
                    </div>
                  </v-card-text>
                  <v-card-text>
                    <div
                      style="
                        font-family: sans-serif;
                        font-size: 17px;
                        font-weight: lighter;
                        margin-bottom: 0;
                      "
                    >
                      3. If your complaint is "Meter"= choose Customer Service.
                    </div>
                  </v-card-text>
                  <v-card-text>
                    <div
                      style="
                        font-family: sans-serif;
                        font-size: 17px;
                        font-weight: lighter;
                        margin-bottom: 0;
                      "
                    >
                      4. If your complaint is "Bill Unavailable"= choose Customer
                      Service.
                    </div>
                  </v-card-text>
                  <v-card-text>
                    <div
                      style="
                        font-family: sans-serif;
                        font-size: 17px;
                        font-weight: lighter;
                        margin-bottom: 0;
                      "
                    >
                      5. If your complaint is "New Connection Delay"= choose
                      Operation Maintenance.
                    </div>
                  </v-card-text>
                  <v-card-text>
                    <div
                      style="
                        font-family: sans-serif;
                        font-size: 17px;
                        font-weight: lighter;
                        margin-bottom: 0;
                      "
                    >
                      6. If your complaint is "Relocation Delay"= choose Operation
                      Maintenance.
                    </div>
                  </v-card-text>
                  <v-card-text>
                    <div
                      style="
                        font-family: sans-serif;
                        font-size: 17px;
                        font-weight: lighter;
                        margin-bottom: 0;
                      "
                    >
                      7. If your complaint is "Manintenance Problem"= choose
                      Operation Maintenance.
                    </div>
                  </v-card-text>
                  <v-card-text>
                    <div
                      style="
                        font-family: sans-serif;
                        font-size: 17px;
                        font-weight: lighter;
                        margin-bottom: 0;
                      "
                    >
                      8. If your complaint is "Unsatisfaied by Service"= choose
                      Customer Service.
                    </div>
                  </v-card-text>
                  <v-card-text>
                    <div
                      style="
                        font-family: sans-serif;
                        font-size: 17px;
                        font-weight: lighter;
                        margin-bottom: 0;
                      "
                    >
                      9. If your complaint is "Unqualified Employee"= choose
                      Customer Service.
                    </div>
                  </v-card-text>
                  <v-card-text>
                    <div
                      style="
                        font-family: sans-serif;
                        font-size: 17px;
                        font-weight: lighter;
                        margin-bottom: 0;
                      "
                    >
                      10. If your complaint is "Power Loss"= choose
                      Operation Maintenance.
                    </div>
                  </v-card-text>
                </v-card>
                <v-col cols="50" md="11">
                <v-select
                  v-model="select"
                  :items="items"
                  :rules="[(v) => !!v || ' Compliant is required']"
                  label="Complaint"
                  required
                ></v-select>
                </v-col>
                <v-col cols="50" md="11">
                <v-select
                  v-model="department"
                  :items="items2"
                  :rules="[(v) => !!v || ' Department  is required']"
                  label="Department"
                  required
                ></v-select>
                </v-col>
                <v-col cols="50" md="11">
                  <v-textarea
                    v-model="description"
                    class="purple-input"
                    label="Fill Your Complaints"
                    value=""
                  />
                </v-col>

                <v-col cols="12" class="text-left">
                  <v-btn color="success" class="mr-0"> upload file </v-btn>
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
      date: "",
      user_name: "",
      address: "",
      phone_no: "",
      select: "",
      department:"",
      description: "",
    };
  },
  methods: {
    async logout() {
      let token = cookies.get("logged_user");
      //console.log(token);
      await axios
        .post("http://localhost:3000/logout", { token: token })
        .then((response) => {
          if (!response.data.header.error) {
            cookies.remove("logged_user");
            variables.logged_user = {};
            this.$router.push("/login");
          }
        });
    },
    registerComplaint() {
      //if (this.$refs.form.validate()) {
      let newComplaint = {
        date: this.date,
        user_name: this.user_name,
        address: this.address,
        phone_no: this.phone_no,
        select: this.select,
        department: this.department,
        description: this.description,
      };
      // console.log("newCustomer", newCustomer);
      axios
        .post("http://localhost:3000/complaints", newComplaint)

        .then(() => {
          this.get("/complaints", (req, res) => {
            res.render("/");
          });
          // this.$router.push({ path: "/" });
          this.$refs.form.reset();
        })
        .catch((err) => {
          console.log(err);
        });
      //} // VALIDATION END
      return true;
    },
  },
};
</script>
