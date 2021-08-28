<template>
  <div class="block">
    <v-container>
      <router-link to="/" tag="v-btn">
        <v-btn icon color="black">
          <v-icon>mdi-home</v-icon>
        </v-btn>
      </router-link>
      <h2 class="text-center">Our Teams</h2>

      <v-row>
        <v-col v-for="item in items" :key="item.id" cols="4">
          <v-card class="mx-auto" max-width="400">
            <v-img class="white--text align-end" :src="item.src"> </v-img>
            <v-card-text class="text--primary text-center">
              <div class="title ">{{ item.name }}</div>
              <p>{{ item.title }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  name: "Team",
  data() {
    return {
      items: [
        {
          id: 1,
          src: require("../assets/images/1.jpg"),
          name: "Meron abate",
          title: "Leader"
        },
        {
          id: 2,
          src: require("../assets/images/9.png"),
          name: "Mekedes Demoze",
          title: "Manager"
        },
        {
          id: 3,
          src: require("../assets/images/1.jpg"),
          name: "Melat fekadu",
          title: "Manintenance"
        }
      ]
    };
  }
};
</script>
