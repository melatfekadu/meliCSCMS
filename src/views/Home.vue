mery, [27.08.21 05:54]
<template>
  <v-content>
    <v-toolbar flat>
      <v-toolbar-title>CSCMS</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <!-- <router-link to="/" tag="v-btn"> -->
        <v-btn text name="home" to="/">
          Home
        </v-btn>
        <!-- </router-link> -->
        <!-- <router-link to="/Noncustomer" tag="v-btn"> -->
        <v-btn text name="non-customer" to="/nonCustomer">
          Emergency_report
        </v-btn>
        <!-- </router-link> -->
        <!-- <router-link to="/Login" tag="v-btn"> -->
        <v-btn text name="login" to="/Login">
          Login
        </v-btn>
        <!-- </router-link> -->
        <!-- </router-link> -->
      </v-toolbar-items>
    </v-toolbar>

    <div class="heroblock">
      <v-carousel hide-delimiters cycle>
        <v-carousel-item
          v-for="(item, i) in items"
          :key="i"
          :src="item.src"
          transition="fade-transition"
        >
        </v-carousel-item>
      </v-carousel>
    </div>

    <div class="block">
      <v-container>
        <h1>Register your Complain Today!</h1>
        <p>
          CSCMS is a web application designed to help customers register
          complaint and anyone who is not a customer and wants to report an
          emergency case will have an access to report with out login. so if you
          are a customer or Employee hit the customer login and employeee login
          respectively. if you are a noncustomer hit the Emergency_report button
          and report your emergency.
        </p>
      </v-container>
    </div>
    <v-container>
      <v-footer flat>
        <v-row justify="center" no-gutters>
          <v-btn
            router
            :to="link.route"
            v-for="link in links"
            :key="link.text"
            text
            rounded
            class="my-2"
          >
            {{ link.text }}
          </v-btn>
          <v-col class="flat py-4 text-center " cols="12">
            {{ new Date().getFullYear() }} — <strong>CSCMS</strong>
          </v-col>
        </v-row>
      </v-footer>
    </v-container>
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
      ],
      links: [
        { text: "Home", route: "/" },
        { text: "About Us", route: "/AboutUs" },
        { text: "Team", route: "/Team" },
        { text: "Contact Us", route: "/ContactUs" }
      ]
    };
  }
};
</script>