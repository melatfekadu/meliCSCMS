<template>
  <v-content>
    <div class="staticHero">
      <v-img src="../assets/images/ab.png">
        <router-link to="/" tag="v-btn">
          <v-btn icon color="black">
            <v-icon>mdi-home</v-icon>
          </v-btn>
        </router-link>
        <v-row align="end" class="lightbox white--text pa-2 fill-height">
          <v-col>
            <v-container>
              <div class="headline">About Us</div>
            </v-container>
          </v-col>
        </v-row>
      </v-img>
    </div>
    <div class="block">
      <v-container>
        <p>
          ETHIOPIAN ELECTRIC UTILITY is located in Addis Ababa, Ethiopia and is
          part of the Household Appliances and Electrical and Electronic Goods
          Merchant Wholesalers Industry. ETHIOPIAN ELECTRIC UTILITY has 35 total
          employees across all of its locations and generates $4.95 million in
          sales (USD). (Employees and Sales figures are modelled). There are 89
          companies in the ETHIOPIAN ELECTRIC UTILITY corporate family.
        </p>
      </v-container>
    </div>
  </v-content>
</template>
<script>
export default {
  name: "AboutUs",
  date() {
    return {};
  }
};
</script>
