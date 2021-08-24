<template>
  <v-container id="emergency" fluid tag="section">
    <v-row>
      <v-col cols="12" md="11">
        <base-material-card class="px-5 py-3">
          <template v-slot:heading>
            <v-tabs v-model="tabs" background-color="transparent" slider-color="white">
              <v-tab class="mr-3">
                Complaints
              </v-tab>
              <v-tab class="mr-3" to="warning/Warnings">
                Warning
              </v-tab>
              
              <v-tab class="mr-3">
                Ratings
              </v-tab>
            </v-tabs>
          </template>

          <v-tabs-items v-model="tabs" class="transparent">
            <v-list v-for="(complaint, index) in Reload" :key="index">
              <v-list-item>
                <v-col cols="1">
                  <v-list-item-action>
                    <v-checkbox v-model="tasks.value" color="secondary" />
                  </v-list-item-action>
                </v-col>
                <v-col class cols="12">
                  <v-col cols="12">
                    <div
                      style="font-family: sans-serif; font-size: 20px; font-weight: lighter; margin-bottom: 0;"
                    >{{complaint.user_name}}</div>
                    <small
                      style="font-family: sans-serif; color: #333333; margine-top: 0;"
                    >Address: {{complaint.address}}</small>
                  </v-col>
                  <v-col cols="12">
                    {{smallPart(complaint.description)}}
                    <router-link :to="'caseComplaint/'+complaint._id">read more</router-link>
                  </v-col>
                  <v-col cols="12">Date: {{complaint.date}}</v-col>
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
  name: "Reload",
  data() {
    return {
      complaints: [],

      items: [],

      tabs: 0,
      tasks: []
    };
  },

  async created(){
    if(!await checkAuth()){
      this.$router.push("/EmpLogin");
    }

    if(variables.logged_user.type!= "CustomerService" || "OperationMaintenance"){
      this.$router.push("/");
    }

    if(variables.logged_user.department != "reload"){
      this.$router.push("/");
    }

    await this.getComplains();
  },
  computed:{
    Reload(){
    return this.complaints.filter(comp=>comp.subComplaint=="reload")
   }
  },
  mounted() {
    this.fetchComplaints();
  },
  methods: {
    smallPart(text) {
      return text.slice(0, 80);
    },
    async fetchComplaints() {
      let token = cookies.get("logged_user");
      //console.log(token);
      await axios.get("http://localhost:3000/complaints/"+token).then(response => {

        if(response.data.header.error){
          showMessage(false, "message_display", response.data.header.message);
          //console.log(response);
          return;
        }

        // showMessage(true, "message_display", "successful");
        //this.complaints = response.data.data;
        console.log(response.data.data);
        this.complaints = response.data.data;

      });

    
  
      axios({
        method: "put",
        url: "http://localhost:3000/complaints"
      });
    }
  }
};
</script>