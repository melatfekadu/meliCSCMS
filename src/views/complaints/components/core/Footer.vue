<template>
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
</template>
<script>
export default {
  name: "Footer",

  data: () => ({
    links: [
      { text: "Home", route: "/" },
      { text: "About Us", route: "/AboutUs" },
      { text: "Team", route: "/Team" },
      { text: "Contact Us", route: "/ContactUs" }
    ]
  })
};
</script>
