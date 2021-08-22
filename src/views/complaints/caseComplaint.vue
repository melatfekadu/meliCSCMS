<template>
  <v-layout row wrap>
    <v-flex>
      <v-list style="background: transparent; padding: 10px 40px;">
        <v-list-item>
          <div>
              <h2 style="font-family: sans-serif; font-size: 20px; font-weight: lighter; margin-bottom: 0;" class="headline">{{ complaints.user_name }}</h2>
              <small style="font-family: sans-serif;">
                Date: {{ complaints.date }} Address: {{ complaints.address }}
              </small>
          </div>
        </v-list-item>
        <v-list-item>
          <v-card-text>{{ complaints.description }}</v-card-text>
        </v-list-item>
        <v-col cols="4">
        <v-list-item>
          
          
          <v-col
                  cols="6"
                  class="text-right"
                >
                  <v-btn
                    color="warning"
                    class="mr-12"
                    @click="accept()" :disabled="valid"
                  >
                    Accept
                  </v-btn>
                </v-col>
               <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn
                    color="success"
                    class="mr-12"
                    @click="completed" :disabled="valid"
                  >
                    Completed
                  </v-btn>
                </v-col>
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
    async accept(){
      let data = this.complaints;
      data['status']='accept'
      
        axios.put("http://localhost:3000/complaints/" + this.complaints._id, this.complaints).then((response) => {
            console.log("success");
        });
        // .then(response => {
        //   this.complaints = response.data;
        //   console.res(this.complaints);
        // });
    },
    async completed(){
      let data = this.complaints;
      data['status']='completed'
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