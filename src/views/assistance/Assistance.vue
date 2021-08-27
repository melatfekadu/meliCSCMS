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
              <v-tab class="mr-3"> complaints </v-tab>

              <v-tab class="mr-3" to="/NonCustomerReport">
                non customer reports
              </v-tab>
            </v-tabs>
          </template>

          <v-tabs-items v-model="tabs" class="transparent">
            <v-list v-for="(complaint, index) in complaints" :key="index">
              <v-list-item>
                <v-col cols="1">
                  <v-list-item-action>
                    <v-checkbox v-model="tasks.value" color="secondary" />
                  </v-list-item-action>
                </v-col>
                <v-col class cols="12">
                  <v-col cols="12">
                    <div
                      style="
                        font-family: sans-serif;
                        font-size: 20px;
                        font-weight: lighter;
                        margin-bottom: 0;
                      "
                    >
                     User_name:  {{ complaint.user_name }}
                    </div>
                    <small
                      style="
                        font-family: sans-serif;
                        color: #333333;
                        margine-top: 0;
                      "
                      >Address: {{ complaint.address }}</small
                    >
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
                  </v-col>

                  <v-col cols="12">
                    {{ smallPart(complaint.description) }}
                    <router-link :to="'Complaints/' + complaint._id"
              
                      >read more</router-link
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
import axios from "axios";
import * as cookies from "@/cookies";
import { variables, checkAuth, separateView } from "@/global";
export default {
  name: "Assistance",
    async created() {
    if (!(await checkAuth())) {
      this.$router.push("/EmpLogin");
    }

    if (variables.logged_user.type != "employee") {
      this.$router.push("/EmpLogin");
    }

    if (variables.logged_user.department != "Assistance") {
      let link = separateView();
      this.$router.push(link);
    }

    await this.fetchComplaints();
  },
  data() {
    return {
      complaints: [],

      items: [],

      tabs: 0,
      tasks: [],
    };
  },
  mounted() {
    this.fetchComplaints();
  },
  methods: {
    smallPart(text) {
      return text.slice(0, 80);
    },
    async fetchComplaints() {
      axios({
        method: "get",
        url: "http://localhost:3000/complaints1",
      })
        .then((response) => {
          this.complaints = response.data;
          console.log(this.complaints);
        })
        .catch((error) => {
          console.error(error);
        });
      
    },
  },
};
</script>