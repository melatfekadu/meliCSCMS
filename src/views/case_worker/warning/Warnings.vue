<template>
  <v-container id="assistance" fluid tag="section">

    <v-row>
      <v-col cols="12" md="11">
        <base-material-card class="px-5 py-3">
          <template v-slot:heading>
            <v-tabs v-model="tabs" background-color="transparent" slider-color="white">
              
              <v-tab class="mr-3">
                Warning
              </v-tab>
             
            </v-tabs>
          </template>

          <v-tabs-items v-model="tabs" class="transparent">
            <v-list v-for="(warnings, index) in warnings" :key="index">
              <v-list-item>
                <v-col cols="1">
                  <v-list-item-action>
                    <v-checkbox v-model="tasks.value" color="secondary" />
                  </v-list-item-action>
                </v-col>
                <v-col class cols="12">
                  
                  <v-col cols="12">
                    {{smallPart(warning.description)}}
                    <router-link :to="'Complaints/'+complaint._id">read more</router-link>
                  </v-col>
                  <v-col cols="12">Date: {{warning.date}}</v-col>
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
  name: "Warnings",

  data() {
    return {
      warnings: [],

      items: [],

      tabs: 0,
      tasks: []
    };
  },
  computed:{
    warnings(){
    return this.warnings.filter(comp=>comp.caseWorker=="emergency")
   }
  },
  mounted() {
    this.fetchWarnings();
  },
  methods: {
    smallPart(text) {
      return text.slice(0, 80);
    },
    async fetchWarnings() {
      axios({
        method: "get",
        url: "http://localhost:3000/warnings"
      })
        .then(response => {
          this.warnings = response.data;
          console.log(this.warnings);
        })
        .catch(error => {
          console.error(error);
        });
    //   axios({
    //     method: "put",
    //     url: "http://localhost:3000/complaints"
    //   });
    }
  }
};
</script>