<template>
  <v-container>
    <!-- <dashboard-core-drawer /> -->
    <!-- <ManagerialDrawer /> -->

    <v-form>
      <div>
        <v-toolbar color="grey darken-4">
          <v-toolbar-title class="white--text">CSCMS</v-toolbar-title>

          <v-spacer></v-spacer>
          <router-link to="/">
            <v-btn icon color="white">
              <v-icon>mdi-home</v-icon>
            </v-btn>
          </router-link>
        </v-toolbar>
      </div>

      <v-text-field
        v-model="first_name"
        label=" First Name"
        :rules="FnameRules"
        required
      ></v-text-field>
      <v-text-field
        v-model="last_name"
        label=" Last Name"
        :rules="LnameRules"
        required
      ></v-text-field>

      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>
      <v-text-field
        v-model="phone_no"
        label="Phone number"
        :counter="10"
        :rules="[v => !!v || 'Phone number is required']"
        type="Number"
        required
      ></v-text-field>
      <v-text-field
        v-model="location"
        label="Location"
        :rules="locationRules"
        required
      ></v-text-field>
      <v-select
        v-model="select"
        :items="items"
        :rules="[v => !!v || 'Case is required']"
        label="case"
        required
      ></v-select>
      <v-textarea
        v-model="description"
        clearable
        clear-icon="mdi-close-circle"
        value="Please fill your report here"
      ></v-textarea>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="send">
        Send
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "Noncustomer",
  data: () => ({
    valid: true,
    first_name: "",
    FnameRules: [
      v => !!v || "First Name is required",
      v => (v && v.length <= 10) || "Name must be less than 10 characters"
    ],

    last_name: "",
    LnameRules: [
      v => !!v || "Last Name is required",
      v => (v && v.length <= 10) || "Name must be less than 10 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],

    phone_no: "",

    location: "",
    locationRules: [v => !!v || "Location  is required"],

    select: null,
    items: ["Trasformer Burning", "Fire", "Falldown"],
    description: ""
  }),

  methods: {
    // validate() {
    //   this.$refs.form.validate();
    // },
    validate() {
      if (
        this.first_name == "" ||
        this.last_name == "" ||
        this.email == "" ||
        this.phone_no == "" ||
        this.select == "" ||
        this.location == "" ||
        this.description == ""
      ) {
        return false;
      } else {
        return true;
      }
    },
    send() {
      //if (this.$refs.form.validate()) {
      if (this.validate()) {
        let newEmergency = {
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          phone_no: this.phone_no,
          location: this.location,
          select: this.select,
          description: this.description
        };

        axios
          .post("http://localhost:3000/emergencys", newEmergency)

          .then(() => {
            swal("Great!", "Emergency report added successfully", "success"),
              this.$router.push({ path: "/" });
            this.$refs.form.reset();
          })
          .catch(err => {
            console.log(err);
          });
        //} // VALIDATION END
        return true;
      } else {
        swal("Error!", "Requirred field missing", "error");
      }
    }
  }
};
</script>
