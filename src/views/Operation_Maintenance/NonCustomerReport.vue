<template>
  <v-container id="emergency" fluid tag="section">

    <v-row>
      <v-col cols="12" md="11">
        <base-material-card class="px-5 py-3">
          <template v-slot:heading>
            <v-tabs v-model="tabs" background-color="transparent" slider-color="white">
              <v-tab class="mr-3">
                Non Customer Reports
              </v-tab>
              

             
            </v-tabs>
          </template>

          <v-tabs-items v-model="tabs" class="transparent">
            <v-list v-for="(emergency, index) in emergencys" :key="index">
              <v-list-item>
                <v-col cols="1">
                  <v-list-item-action>
                    <v-checkbox v-model="tasks.value" color="secondary" />
                  </v-list-item-action>
                </v-col>
                <v-col class cols="12">
                  <v-col cols="12">
                    <div
                      style="font-family: sans-serif; font-size: 15px; font-weight: lighter; margin-bottom: 0;"
                    >{{emergency.first_name}} {{emergency.last_name}}</div>
                  </v-col>
                    <v-col cols="12">
                      
                    <div
                      style="font-family: sans-serif; font-size: 15px; font-weight: lighter; margin-bottom: 0;"
                    >{{emergency.select}}</div>
                    <small
                      style="font-family: sans-serif; color: #333333; margine-top: 0;"
                    >Address: {{emergency.location}}</small>
                  </v-col>
                  <v-col cols="12">
                    {{smallPart(emergency.description)}}
                    <router-link :to="'emergencyReport/'+emergency._id">read more</router-link>
                  </v-col>
                  <v-col cols="12">PhoneNo: {{emergency.phone_no}}</v-col>
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
export default {
  name: "NonCustomerReport",
 
  data() {
    return {
      emergencys: [],

      items: [],

      tabs: 0,
      tasks: []
    };
  },
  mounted() {
    this.fetchEmergencys();
  },
  methods: {
    smallPart(text) {
      return text.slice(0, 80);
    },
    async fetchEmergencys() {
      axios({
        method: "get",
        url: "http://localhost:3000/emergencys"
      })
        .then(response => {
          
          this.emergencys = response.data;
          console.log(this.emergencys);
        })
        .catch(error => {
          console.error(error);
        });
      
    }
  }
};
</script>