<template>
  <v-layout row wrap>
    <v-flex>
      <v-list style="background: transparent; padding: 10px 40px;">
        <v-list-item>
          <div>
              <h2 style="font-family: sans-serif; font-size: 20px; font-weight: lighter; margin-bottom: 0;" class="headline">{{ emergencys.first_name }}</h2>
              <small style="font-family: sans-serif;">
                PhoneNo: {{ emergencys.phone_no }} Address: {{ emergencys.location }}
              </small>
          </div>
        </v-list-item>
        <v-list-item>
          <v-card-text>{{ emergencys.description }}</v-card-text>
        </v-list-item>
        <v-col cols="4">
        <v-list-item>
          <v-select
            v-model="select"
            
            :items="['New Connection', 'Reload', 'Billing', 'Emergency','Complaint On Employee', 'Prevative Maintenance', 'Relocation','Inspection', 'Design']"
            label="Department"
          >
            <template v-slot:item="{ item, attrs, on }">
              <v-list-item v-bind="attrs" v-on="on">
                <v-list-item-title :id="attrs['aria-labelledby']" v-text="item"></v-list-item-title>
              </v-list-item>
            </template>
          </v-select>
          <v-btn  class="mx-2" fab dark color="indigo" @click="update">
            Update
          </v-btn>
        </v-list-item>
      </v-col>
      </v-list>
    </v-flex>
  </v-layout>
</template>
<script>
import axios from "axios";
export default {
  name: "subComplaint",
  
  data() {
    return {
      emergencys: [],
      select:"",
      
    };
  },
  mounted() {
    this.fetchEmergencys();
  },
  methods: {
    async fetchEmergencys() {
      return axios({
        method: "get",
        url: "http://localhost:3000/emergencys/" + this.$route.params.id
      })
        .then(response => {
          this.emergencys = response.data;
          console.res(this.emergencys);
        })
        .catch(() => {});
    },
    async update(){

        let types = {
            "New Connection": "newconnection",
            'Reload': "reload",
            'Billing': "billing",
            'Emergency': "emergency",
            'Complaint On Employee': "employee",
            'Prevative Maintenance':"prevative",
            'Relocation':"relocation",
            'Inspection':"inspection",
            'Design':"design",
            
            
        };
        
        this.emergencys.EmergencyReport = types[this.select];

        axios.put("http://localhost:3000/emergencys/" + this.complaints._id, this.complaints).then((response) => {
            console.log("success");
        });
        // .then(response => {
        //   this.complaints = response.data;
        //   console.res(this.complaints);
        // });
    }
  }
};
</script>