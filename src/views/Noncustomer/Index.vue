<template>
  <v-app>
    <!-- <dashboard-core-app-bar /> -->

    <v-content>
      <router-view />
      <DashboardCoreFooter />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "NoncustomerIndex",

  components: {
    // DashboardCoreAppBar: () => import("./components/core/AppBar"),

    DashboardCoreSettings: () => import("./components/core/Settings"),
    DashboardCoreView: () => import("./components/core/View"),
    DashboardCoreFooter: () => import("./components/core/Footer")
  },

  data: () => ({
    expandOnHover: false
  })
};
</script>
