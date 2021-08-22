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
    name: 'AssistanceIndex',

    components: {
      DashboardCoreAppBar: () => import('../customer/components/core/AppBar'),
      DashboardCoreDrawer: () => import('../customer/components/core/Drawer'),
      DashboardCoreSettings: () => import('../customer/components/core/Settings'),
      DashboardCoreView: () => import('../customer/components/core/View'),
      DashboardCoreFooter: () => import('../customer/components/core/Footer'),
    },

    data: () => ({
      expandOnHover: false,
    }),
  }
</script>
