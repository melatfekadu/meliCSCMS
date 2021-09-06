<template>
  <v-container id="assistance" fluid tag="section">
    <v-row>
      <v-col cols="12" md="11">
        <base-material-card class="px-5 py-3">
          <template v-slot:heading>
            <v-tabs
              v-model="tabs"
              background-color="transparent"
              slider-color="white"
            >
              <v-tab class="mr-3">
                Complaints
              </v-tab>
            </v-tabs>
          </template>

          <v-tabs-items v-model="tabs" class="transparent">
            <v-list v-for="(complaint, index) in complaints" :key="index">
              <v-list-item>
                <v-col cols="1"> </v-col>
                <v-col class cols="12">
                  <v-col cols="12">
                    <div
                      style="
                        font-family: sans-serif;
                        font-size: 20px;
                        font-weight: lighter;
                        margin-bottom: 0;
                      "
                    ></div>
                  </v-col>
                  <div
                    style="
                        font-family: sans-serif;
                        font-size: 15px;
                        font-weight: lighter;
                        margin-bottom: 0;
                      "
                  >
                    Name:
                    {{ cust[complaint.bp_number]["first_name"] }}&nbsp;{{
                      cust[complaint.bp_number]["last_name"]
                    }}
                  </div>
                  <div
                    style="
                        font-family: sans-serif;
                        font-size: 15px;
                        font-weight: lighter;
                        margin-bottom: 0;
                      "
                  >
                    PhoneNumber:
                    {{ cust[complaint.bp_number]["phone_no"] }}
                  </div>
                  <div
                    style="
                        font-family: sans-serif;
                        font-size: 15px;
                        font-weight: lighter;
                        margin-bottom: 0;
                      "
                  >
                    Email:
                    {{ cust[complaint.bp_number]["email"] }}
                  </div>
                  <div
                    style="
                        font-family: sans-serif;
                        font-size: 15px;
                        font-weight: lighter;
                        margin-bottom: 0;
                      "
                  >
                    Address:
                    {{ cust[complaint.bp_number]["address"] }}
                  </div>

                  <div
                    style="
                        font-family: sans-serif;
                        font-size: 20px;
                        font-weight: lighter;
                        margin-bottom: 0;
                      "
                  >
                    {{ complaint.select }}
                  </div>
                  <v-col cols="12">
                    {{ smallPart(complaint.description) }}
                    <router-link :to="'subComplaint/' + complaint._id"
                      >Accept</router-link
                    >
                  </v-col>
                  <v-col cols="12">Date: {{ complaint.date }}</v-col>
                </v-col>
              </v-list-item>
            </v-list>
          </v-tabs-items>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as cookies from "@/cookies";
import axios from "axios";
import { checkAuth, spar } from "@/global";
export default {
  name: "DashboardDashboard",

  data() {
    return {
      complaints: [],
      customers: [],
      items: [],
      cust: {},

      tabs: 0,
      tasks: []
    };
  },
  async created() {
    if (!(await checkAuth())) {
      this.$router.push("/EmpLogin");
    }

    if (variables.logged_user.type != "employee") {
      this.$router.push("/EmpLogin");
    }

    if (variables.logged_user.department != "caseworker") {
      let link = separateView();
      this.$router.push(link);
    }

    await this.getComplains();
  },
  computed: {
    CustomerService() {
      return this.complaints.filter(comp => comp.subComplaint == "relocation");
    }
  },
  mounted() {
    this.fetchCustomers();

    this.fetchComplaints();
  },
  methods: {
    smallPart(text) {
      return text.slice(0, 80);
    },
    async fetchCustomers() {
      axios({
        method: "get",
        url: "http://localhost:3000/customers"
      })
        .then(response => {
          this.customers = response.data;
          response.data.forEach(element => {
            // console.log(element["bp_number"]);
            this.cust[element["bp_number"]] = element;
          });
          console.log(this.customers);
        })
        .catch(error => {
          console.error(error);
        });
    },
    async fetchComplaints() {
      axios({
        method: "get",
        url: "http://localhost:3000/complaints2"
      })
        .then(response => {
          this.complaints = response.data;
          console.log(response.data);
          // response.data.forEach(element => {
          //   if (element["status"] == "pending") {
          //     this.complaints.push(element);
          //   }
          // });
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>
