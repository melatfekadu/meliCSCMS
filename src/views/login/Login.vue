<template>
  <v-container class="my-8">
    <v-card class="mx-auto mp-auto" style="max-width: 500px;">
      <v-toolbar color="blue(grey)-4" cards dark flat>
        <v-card-title class="text-h6 font-weight-regular">
          Login
        </v-card-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <div id="error_message" style="display: none;" class="alert alert-danger">
        error occurred
      </div>
      <v-form ref="form" class="pa-4 pt-6">
        <v-text-field
          v-model="user_name"
          filled
          color="deep-purple"
          label="username"
          :rules="[v => !!v || 'Username is required']"
        ></v-text-field>
        <v-text-field
          v-model="password"
          filled
          color="deep-purple"
          label="Password"
          style="min-height: 96px"
          type="password"
          :rules="[v => !!v || 'Password is required']"
        ></v-text-field>
      </v-form>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="success" @click="login()">
          Login
        </v-btn>

        <v-spacer></v-spacer>
      </v-card-actions>
      <v-dialog absolute max-width="400" persistent>
        <v-card>
          <v-card-actions> </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-container>
</template>
<script>
import axios from "axios";
import * as cookies from "@/cookies";
import { variables, separateView, checkAuth } from "@/global";

export default {
  name: "Login",
  async created() {
    if (await checkAuth()) {
      console.log("logged");

      if (variables.logged_user.type != "employee") {
        this.$router.push("/customer");
      } else {
        let link = separateView();
        this.$router.push(link);
      }
    }
  },
  data() {
    return {
      user_name: "",
      password: "",
      rules: {
        email: v => !!(v || "").match(/@/) || "Please enter a valid email",
        length: len => v =>
          (v || "").length >= len ||
          `Invalid character length, required ${len}`,
        password: v =>
          !!(v || "").match(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/
          ) ||
          "Password must contain an upper case letter, a numeric character, and a special character",
        required: v => !!v || "rest ur password if forgot"
      }
    };
  },
  methods: {
    async login() {
      await axios
        .post("http://localhost:3000/Login", {
          user_name: this.user_name,
          password: this.password
        })
        .then(response => {
          if (response.data.header.error) {
            axios
              .post("http://localhost:3000/customer_login", {
                user_name: this.user_name,
                password: this.password
              })
              .then(response => {
                if (response.data.header.error) {
                  let display = window.document.getElementById("error_message");
                  display.style.setProperty("display", "block");
                  display.innerHTML = response.data.header.message;
                  return;
                }
                cookies.set("logged_user", response.data.data.token);
                variables.logged_user = response.data.data;
                console.log(response.data.data);
                //this.$session.start();
                //this.$session.set('jwt', response.data.user_name);
                this.$router.push("/customer");
              });
          }

          cookies.set("logged_user", response.data.data.token);
          variables.logged_user = response.data.data;
          //console.log(response.data.data);
          let link = separateView();
          this.$router.push(link);
        });
    },
    async logout() {
      let token = cookies.get("logged_user");
      //console.log(token);
      await axios
        .post("http://localhost:3000/logout", { token: token })
        .then(response => {
          if (!response.data.header.error) {
            this.$router.push("/Login");
            return;
          }
        });
    }
  }
};
</script>
