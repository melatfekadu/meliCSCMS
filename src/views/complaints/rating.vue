<template>
  <v-layout row wrap>
    <v-flex>
      <v-list style="background: transparent; padding: 10px 40px;">
        <v-list-item>
          <div>
              <h2  style="font-family: sans-serif; font-size: 20px; font-weight: lighter; margin-bottom: 0;" class="headline">{{ complaints.user_name }}</h2>
              <small style="font-family: sans-serif;">
                Date: {{ complaints.date }} Address: {{ complaints.address }}
              </small>
          </div>
        </v-list-item>
        <v-list-item>
          <v-card-text>{{ complaints.description }}</v-card-text>
        </v-list-item>
        <v-col cols="4">
        
          <v-btn  class="mx-2" fab dark color="indigo" @click="update">
            Update
          </v-btn>
       
      </v-col>
      </v-list>
    
    </v-flex>
  </v-layout>
</template>
<script>
import axios from "axios";
export default {
  name: "complaints",
  
  data() {
    return {
      complaints: [],
      select:"",
      
    };
  },
  mounted() {
    this.fetchComplaints();
  },
  methods: {
    async fetchComplaints() {
      return axios({
        method: "get",
        url: "http://localhost:3000/complaints/" + this.$route.params.id
      })
        .then(response => {
          this.complaints = response.data;
          console.res(this.complaints);
        })
        .catch(() => {});
    },
    async update(){

        let types = {
            "OperationalMentenance": "OperationMaintenance",
            'CustomerService': "CustomerService",
            'Manager': "Manager",
            
        };
        
        this.complaints.type = types[this.select];

        axios.put("http://localhost:3000/complaints/" + this.complaints._id, this.complaints).then((response) => {
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