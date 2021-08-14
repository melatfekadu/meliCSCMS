<template>
  <v-container>
    <!-- <dashboard-core-drawer /> -->
    <!-- <ManagerialDrawer /> -->

    <v-form ref="form" v-model="valid" lazy-validation>
      <div>
        <v-toolbar color="grey darken-4">
          <v-toolbar-title class="white--text">CSCMS</v-toolbar-title>

          <v-spacer></v-spacer>
          <router-link to="/" tag="v-btn">
            <v-btn icon color="white">
              <v-icon>mdi-home</v-icon>
            </v-btn>
          </router-link>
        </v-toolbar>
      </div>

      <v-text-field
        v-model="first_name"
        :counter="10"
        :rules="LnameRules"
        label=" First Name"
        required
      ></v-text-field>
      <v-text-field
        v-model="last_name"
        :counter="10"
        :rules="LnameRules"
        label=" Last Name"
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
        :rules="phoneNumberRules"
        label="Phone number"
        required
      ></v-text-field>
      <v-text-field
        v-model="location"
        label="Location"
        required
      ></v-text-field>

      <v-select
        v-model="select"
        :items="items"
        :rules="[v => !!v || ' Case is required']"
        label="Case"
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
export default {
  name: "Noncustomer",
  data: () => ({

    // valid: true,
    Fname: "",
    FnameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 10) || "Name must be less than 10 characters"
    ],
    Lname: "",
    LnameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 10) || "Name must be less than 10 characters"
    ],

    phoneNumber: "",
    phoneNumberRules: [
      [
        v => !!v || "This field is required",
        v => /^\d+$/.test(v) || "This field only accept numbers"
      ]
    ],
    location:"",
    select: null,
    items: ["Fire", "Fall down", "Accident", "Rain"],
    description:"",
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
    },
      send() {
      // if (this.$refs.form.validate()) {
      let newEmergency ={
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        phone_no: this.phone_no,
        location: this.location,
        select: this.select,
        description: this.description,
      };

      axios
        .post("http://localhost:3000/emergency_reports", newEmergency)

        .then(() => {
          this.$router.push({ path: "/" });
          this.$refs.form.reset();
        })
        .catch((err) => {
          console.log(err);
        });
      //} // VALIDATION END
      return true;
    
  

      }
    },
  }

</script>