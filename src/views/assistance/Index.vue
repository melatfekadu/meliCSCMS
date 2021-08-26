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
      DashboardCoreAppBar: () => import('../assistance/components/core/AppBar'),
      DashboardCoreDrawer: () => import('../assistance/components/core/Drawer'),
      DashboardCoreSettings: () => import('../assistance/components/core/Settings'),
      DashboardCoreView: () => import('../assistance/components/core/View'),
      DashboardCoreFooter: () => import('../assistance/components/core/Footer'),
    },

    data: () => ({
      expandOnHover: false,
    }),
  }
</script>
