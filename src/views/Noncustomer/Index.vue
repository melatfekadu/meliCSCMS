<template>
  <v-app>
    <dashboard-core-app-bar />

    <v-content>
      <ManagerView />
      <ManagerAppBar />
      <ManagerSettings />
      <!-- <dashboard-core-footer /> -->
      <router-view />
    </v-content>

    <dashboard-core-settings />
  </v-app>
</template>

<script>
export default {
  name: "NoncustomerIndex",

  components: {
    DashboardCoreAppBar: () => import("./components/core/AppBar"),

    DashboardCoreSettings: () => import("./components/core/Settings"),
    DashboardCoreView: () => import("./components/core/View"),
    DashboardCoreFooter: () => import("./components/core/Footer")
  },

  data: () => ({
    expandOnHover: false
  })
};
</script>
