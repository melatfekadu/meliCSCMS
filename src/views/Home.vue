<template>
  <v-content>
    <v-toolbar flat>
      <v-toolbar-title>CSCMS</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <router-link to="/" tag="v-btn">
          <v-btn text name="home">
            Home
          </v-btn>
        </router-link>
        <router-link to="/Noncustomer" tag="v-btn">
          <v-btn text name="non-customer">
            Non-customer
          </v-btn>
        </router-link>
        <router-link to="/Login" tag="v-btn">
          <v-btn text name="login">
            Log in
          </v-btn>
        </router-link>
      </v-toolbar-items>
    </v-toolbar>

    <div class="heroblock">
      <v-carousel hide-delimiters cycle>
        <v-carousel-item
          v-for="(item, i) in items"
          :key="i"
          :src="item.src"
          reverse-transition="fade-transition"
          transition="fade-transition"
        ></v-carousel-item>
      </v-carousel>
    </div>
  </v-content>
</template>
<script>
export default {
  name: "Home",

  data() {
    return {
      items: [
        {
          src: require("../assets/images/1.jpg")
        },
        {
          src: require("../assets/images/2.jpg")
        },
        {
          src: require("../assets/images/3.jpg")
        }
      ]
    };
  }
};
</script>
