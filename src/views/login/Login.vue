<!-- <div class="vue-tempalte">
      <nav class="navbar shadow bg-dark rounded justify-content-between flex-nowrap flex-row fixed-top">
        <div class="container">
          <a class="navbar-brand float-left text-white h4" href="#" target="_blank">
              customer service and compiant
          </a>
          <ul class="nav navbar-nav flex-row float-right">
            <li class="nav-item">
              <router-link class="nav-link pr-3 text-white h6" to="/login">Sign in</router-link>
            </li>
            <li class="nav-item">
              <router-link class="btn btn-outline-primary text-white h6" to="/">Sign up</router-link>
            </li>
          </ul>
        </div>
      </nav> -->
<!-- <div class="vertical-center" style="margin-top: 1rem;">
            <div class="inner-block">
              <form>
                  <h3 >Sign In</h3>

                  <div class="form-group">
                      <label>User Name</label>
                      <input type="text" class="form-control form-control-lg" />
                  </div>
                  <div class="form-group">
                      <label>BP Number</label>
                      <input type="text" class="form-control form-control-lg"/>
                  </div>

                  <div class="form-group">
                      <label>Password</label>
                      <input type="password" class="form-control form-control-lg" />
                  </div>
                  <router-link to="/ComplaintPage">
                  <button type="submit" class="btn btn-dark btn-lg btn-block">
                    Sign in
                  </button></router-link>

                  <p class="forgot-password text-right mt-2 mb-4">
                      <router-link to="/forgot-password">Forgot password ?</router-link>
                  </p>

                  <div class="social-icons">
                      <ul>
                          <li><a href="#"><i class="fa fa-google"></i></a></li>
                          <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                          <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                      </ul>
                  </div>
              </form>
            </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {}
  }
}
</script>
<style scoped> -->

<!-- /*h1, h2 {
  font-weight: normal;
}*/
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}/*
a {
  color: #42b983;
}*/
</style> -->
<template>
  <v-container class="my-8">
    <v-card class="mx-auto mp-auto" style="max-width: 400px;">
      <!-- <v-system-bar
      color="blue(grey)-4"
      dark
    > -->
      <!-- login form -->

      <v-toolbar color="blue(grey)-4" cards dark flat>
        <v-card-title class="text-h6 font-weight-regular">
          Login
        </v-card-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-form ref="form" v-model="form" class="pa-4 pt-6">
        <v-text-field
          v-model="username"
          filled
          color="deep-purple"
          label="username"
        ></v-text-field>
        <v-text-field
          v-model="password"
          :rules="[rules.password, rules.length(6)]"
          filled
          color="deep-purple"
          counter="6"
          label="Password"
          style="min-height: 96px"
          type=""
        ></v-text-field>
        <!-- <v-text-field
        v-model="number"
        filled
        color="deep-purple"
        label="BP"
      ></v-text-field>
      -->
        <v-checkbox
          v-model="Forgotpassword"
          :rules="[rules.required]"
          color="deep-purple"
        >
          <template v-slot:label>
            Forgotpassword ?&nbsp;
          </template>
        </v-checkbox>
      </v-form>
      <v-divider></v-divider>
      <v-card-actions>
        <router-link to="/customer" tag="v-btn"> </router-link>
        <v-btn color="success" @click="$refs.form.reset()">
          Login
        </v-btn>

        <v-spacer></v-spacer>
      </v-card-actions>
      <v-dialog v-model="dialog" absolute max-width="400" persistent>
        <v-card>
          <v-card-actions>
            <!-- <v-btn
            text
            @click="agreement = false, dialog = false"
          >
            No
          </v-btn> -->
            <!-- <v-spacer></v-spacer> -->
            <!-- <v-btn
            class="white--text"
            color="deep-purple accent-4"
            @click="agreement = true, dialog = false"
          >
            Yes
          </v-btn> -->
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    agreement: false,

    dialog: false,
    username: undefined,
    form: false,
    isLoading: false,
    password: undefined,
    BP: undefined,
    rules: {
      username: v => !!(v || "").match(/@/) || "Please enter a valid username",
      length: len => v =>
        (v || "").length >= len || `Invalid character length, required ${len}`,
      password: v =>
        !!(v || "").match(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/
        ) ||
        "Password must contain an upper case letter, a numeric character, and a special character",
      required: v => !!v || "rest ur password if forgot"
    }
  })
};
</script>
