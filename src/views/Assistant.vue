<template>
  <nav>
    <v-app>
      <v-navigation-drawer
        absolute
        temporary
        v-model="drawer"
        app
        class="blue-grey darken-4"
      >
        <p class="display-2 mx-4 subheading grey--text">CSCMS</p>

        <v-list>
          <v-list-item
            v-for="link in links"
            :key="link.text"
            router
            :to="link.route"
          >
            <v-list-item-action>
              <v-icon class="mx-4">{{ link.icon }}</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title class="white--text">{{
                link.text
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar text app class="blue-grey darken-4">
        <v-app-bar-nav @click="drawer = !drawer"></v-app-bar-nav>

        <v-icon color="white" @click.stop="drawer = !drawer">menu_open</v-icon>
        <span class="font-weight-light white--text"> </span>
        <span class="white--text mx-4"> Assistant</span>

        <v-spacer></v-spacer>
        <v-btn text color="blue-grey darken-4" route to="/user-profile">
          <span class="white--text">My profile</span>
          <v-icon right color="white">mdi-account</v-icon>
        </v-btn>

        <v-btn text color="blue-grey darken-4" route to="/">
          <span class="white--text">Log out</span>
          <v-icon right color="white">exit_to_app</v-icon>
        </v-btn>
        <!-- <router-link to="/" tag="v-btn">
          <v-btn flat color="blue-grey darken-4">
            <span class="white--text">Log out</span>
            <v-icon right color="white">exit_to_app</v-icon>
          </v-btn>
        </router-link> -->
      </v-app-bar>
      <v-spacer></v-spacer>
      <v-container fluid>
        <v-card class="ma-15">
          <v-card-title>
            Customer Complaints
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="complaints"
            :search="search"
          ></v-data-table>
        </v-card>
      </v-container>
    </v-app>
  </nav>
</template>

<script>

import * as cookies from "@/cookies";
import axios from "axios";
import {checkAuth, showMessage} from "@/global";

export default {
  name: "Asssitant",
  data() {
    return {
      drawer: false,
      links: [{ icon: "", text: "View report", route: "/ViewReport" }, { icon: "", text: "View report", route: "/ViewComplaint" }],
      // links: [{ icon: "", text: "View report", route: "/ViewComplaint" }],
      search: "",
      headers: [
        {
          text: "Customer",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Complaint", value: "complaint" },
        { text: "Description", value: "description" },
        { text: "Address", value: "address" },
        { text: "Date", value: "date" },
        { text: "Status", value: "status" },
      ],
      complaints: [],

    };
  },
  async created(){
    if(!await checkAuth()){
      this.$router.push("/employee_login");
    }

    if(variables.logged_user.type != "employee"){
      this.$router.push("/");
    }

    if(variables.logged_user.department != "assistant"){
      this.$router.push("/");
    }

    await this.getComplains();
  },
  methods: {
    async getComplains(){

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

    },

  }
};
</script>
