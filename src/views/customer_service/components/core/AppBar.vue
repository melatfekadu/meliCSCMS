<template>
  <v-app-bar id="app-bar" absolute app color="transparent" flat height="75">
    <v-btn class="mr-3" elevation="1" fab small @click="setDrawer(!drawer)">
      <v-icon v-if="value"> mdi-view-quilt </v-icon>

      <v-icon v-else> mdi-dots-vertical </v-icon>
    </v-btn>

    <v-toolbar-title
      class="hidden-sm-and-down font-weight-light"
      v-text="$route.name"
    />

    <v-spacer />

   

    <div class="mx-3" />

    <v-btn class="ml-2" min-width="0" text to="/Customer_Service">
      <v-icon>mdi-view-dashboard</v-icon>
    </v-btn>

    <v-menu
      bottom
      left
      offset-y
      origin="top right"
      transition="scale-transition"
    >
      <template v-slot:activator="{ attrs, on }">
        <v-btn class="ml-2" min-width="0" text v-bind="attrs" v-on="on">
          <v-badge color="red" overlap bordered>
            <template v-slot:badge>
              <span>{{ notification_size }}</span>
            </template>

            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </v-btn>
      </template>

      <v-list :tile="false" nav>
        <div>
          <app-bar-item v-for="(n, i) in notifications" :key="`item-${i}`">
            <v-list-item-title v-text="n" />
          </app-bar-item>
        </div>
      </v-list>
    </v-menu>

    
    <v-btn @click="logout()" class="ml-2" min-width="0" text>
      logout
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
// Components
import { VHover, VListItem } from "vuetify/lib";

// Utilities
import { mapState, mapMutations } from "vuex";
import axios from "axios";
import * as cookies from "@/cookies";
import { variables, separateView, checkAuth } from "@/global";

export default {
  name: "DashboardCoreAppBar",

  components: {
    AppBarItem: {
      render(h) {
        return h(VHover, {
          scopedSlots: {
            default: ({ hover }) => {
              return h(
                VListItem,
                {
                  attrs: this.$attrs,
                  class: {
                    "black--text": !hover,
                    "white--text secondary elevation-12": hover,
                  },
                  props: {
                    activeClass: "",
                    dark: hover,
                    link: true,
                    ...this.$attrs,
                  },
                },
                this.$slots.default
              );
            },
          },
        });
      },
    },
  },

  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    
    notifications: [
      "You got new complaint."
    ],
    notification_size: 0,
  }),

  computed: {
    ...mapState(["drawer"]),
  },

  created(){
    this.notification_mtd();
  },

  methods: {
    async notification_mtd(){
      await axios
        .get("http://localhost:3000/complaints2")
        .then((response) => {
          //console.log(response.data);
          this.notification_size = response.data.length;
          let count = 0;

          // if(this.notification_size > 3){
          //   for(let i = this.notification_size; i > this.notification_size - 3; i--){
          //     this.notifications[count] = response.data[i].select;
          //     count += 1;
          //   }
          // }else{
          //   for(let i = 0; i > this.notification_size; i++){
          //     this.notifications[count] = response.data[i].select;
          //     count += 1;
          //   }
          // }

          for(let i = 0; i < this.notification_size; i++){
              this.notifications[count] = response.data[i].select;
              count += 1;
            }

          console.log(this.notifications);
          
          //console.log(response.data);
        });      
    },
    async logout() {
      let token = cookies.get("logged_user");

      await axios
        .post("http://localhost:3000/logout", { token: token })
        .then((response) => {
          if (!response.data.header.error) {
            cookies.remove("logged_user");
            //variables.logged_user = {};
            variables.logged_user = null;
            this.$router.push("/EmpLogin");
          }
        });
    },
    ...mapMutations({
      setDrawer: "SET_DRAWER",
    }),
  },
};
</script>
