<template>
  <v-content>
    <div class="staticHero">
      <v-img src="../assets/images/c4.png">
        <router-link to="/" tag="v-btn">
          <v-btn icon color="black">
            <v-icon>mdi-home</v-icon>
          </v-btn>
        </router-link>
        <v-row align="end" class="lightbox white--text pa-2 fill-height">
          <v-col>
            <v-container>
              <div class="headline">Contact Us</div>
            </v-container>
          </v-col>
        </v-row>
      </v-img>
    </div>
    <v-spacer></v-spacer>
    <v-row>
      <v-col cols="12" sm="12">
        <v-spacer></v-spacer>
        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-action>
                <v-icon>mdi-phone</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>(650) 555-1234</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-icon>mdi-message-text</v-icon>
              </v-list-item-action>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item>
              <v-list-item-action>
                <v-icon>mdi-web</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>http://www.eeu.com/</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item>
              <v-list-item-action>
                <v-icon>mdi-email</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>ayeleeneshaw1@gmail.com</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item>
              <v-list-item-action>
                <v-icon>mdi-map-marker</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title
                  >Adama District Electric Utility</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <div class="text-center" mt-4>
            <router-link to=""></router-link>
            <v-btn
              class="mx-2"
              fab
              color="black"
              outlined
              router
              to="https://www.facebook.com/EEUAye"
            >
              <v-icon>fab fa-facebook-f</v-icon>
            </v-btn>
            <v-btn class="mx-2" fab color="black" outlined>
              <v-icon>fab fa-twitter</v-icon></v-btn
            >
            <v-btn class="mx-2" fab color="black" outlined>
              <v-icon>fab fa-linkedin-in</v-icon></v-btn
            >
            <v-btn class="mx-2" fab color="black" outlined>
              <v-icon>fab fa-google-plus-g</v-icon>
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-content>
</template>
<script>
export default {
  name: "ContactUs"
};
</script>
