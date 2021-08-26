<template>
  <v-app>
    <dashboard-core-app-bar />

    <dashboard-core-drawer />

    <v-content>
      <router-view />
      <dashboard-core-footer />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "DashboardIndex",

  components: {
    DashboardCoreAppBar: () => import("./components copy/core/AppBar"),
    DashboardCoreDrawer: () => import("./components copy/core/Drawer"),
    DashboardCoreSettings: () => import("./components copy/core/Settings"),
    DashboardCoreView: () => import("./components copy/core/View"),
    DashboardCoreFooter: () => import("./components copy/core/Footer")
  },

  data: () => ({
    expandOnHover: false
  })
};
</script>
