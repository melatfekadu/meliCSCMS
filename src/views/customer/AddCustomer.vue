<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <base-material-card>
          <template v-slot:heading>
            <div class="text-h3 font-weight-light">Add New Customer</div>
          </template>

          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field v-model="user_name" class="purple-input" label="User Name" />
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field v-model="email" label="Email Address" class="purple-input" />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field v-model="first_name" label="First Name" class="purple-input" />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field v-model="last_name" label="Last Name" class="purple-input" />
                </v-col>

                <v-col cols="12">
                  <v-text-field v-model="address" label="Adress" class="purple-input" />
                </v-col>

                <v-col cols="12" md="4">
                  <v-select v-model="gender" :items="items" label="Gender" class="purple-input" />
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="phone_no"
                    class="purple-input"
                    label="Phone Number"
                    type="number"
                  />
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field v-model="password" label="Password" class="purple-input" />
                </v-col>
                <v-col cols="12" class="text-right">
                  <v-btn color="success" class="mr-0" @click="register" :disabled="!valid">Register</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      drawer: false,
      links: [],
      valid: true,
      first_name: "",
      last_name: "",
      email: "",
      phone_no: "",
      address: "",
      gender: null,
      items: [
        'Female',
        'Male'
      ],

      user_name: "",
      password: ""
    };
  },
  methods: {
    register() {
      let newCustomer = {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        phone_no: this.phone_no,
        address: this.address,
        gender: this.gender,
        user_name: this.user_name,
        password: this.password
      };
      axios
        .post("http://localhost:3000/customers", newCustomer)

        .then(() => {
         swal("Great!", "customer added successfully", "success"),
            this.get("/customers", (req, res) => {
              res.render("/");
            }).t;
          this.$router.push({path:'/admin'})
          this.$refs.form.reset();
        })
        .catch(err => {
          console.log(err);
        });
      return true;
    }
  }
};
</script>
