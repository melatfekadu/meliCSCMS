<template>
  <v-container>
    <!-- <dashboard-core-drawer /> -->
    <!-- <ManagerialDrawer /> -->

    <v-form >
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
        :counter="10"
        label=" First Name"
        required
      ></v-text-field>
      <v-text-field
        v-model="last_name"
        :counter="10"
        label=" Last Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="email"
        label="E-mail"
        required
      ></v-text-field>
      <v-text-field
        v-model="phone_no"
        label="Phone number"
        required
      ></v-text-field>
      <v-text-field
        v-model="location"
        label="Location"
        required
      ></v-text-field>
       <v-text-field
        v-model="department"
        label="Department"
        required
      ></v-text-field>
      <v-select
        v-model="select"
        :items="items"
        
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

    // valid: true,
    first_name: "",

    last_name: "",


    email:"",
 
    phone_no: "",
    
    location:"",
    select: null,
    items: [
      'Trasformer Burning',
      'Fire',
      'Falldown'
      ],
    description:"",
  }),

  methods: {
    valid() {
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
        department: this.department,
        select: this.select,
        description: this.description,
      };

      axios
        .post("http://localhost:3000/emergencys", newEmergency)

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