
<template>
  <v-container id="assistance" fluid tag="section">
    <v-row>
      <v-col cols="12" md="11">
        <base-material-card class="px-5 py-3">
          <template v-slot:heading>
            <v-tabs
              v-model="tabs"
              background-color="transparent"
              slider-color="white"
            >
              <v-tab class="mr-3"> Completed </v-tab>
              <v-tab class="mr-3" to="/ongoing"> On Going </v-tab>
            </v-tabs>
          </template>

          <v-tabs-items v-model="tabs" class="transparent">
            <v-list v-for="(complaint, index) in status" :key="index">
              <v-list-item>
                <v-col cols="1">
                  <v-list-item-action>
                    <v-checkbox v-model="tasks.value" color="secondary" />
                  </v-list-item-action>
                </v-col>
                <v-col class cols="12">
                  <v-col cols="12">
                    <div
                      style="
                        font-family: sans-serif;
                        font-size: 15px;
                        font-weight: lighter;
                        margin-bottom: 0;
                      "
                    >
                     User_name: {{ complaint.user_name }}
                    </div>
                    <div>
                      <small
                      style="
                        font-family: sans-serif;
                        color: #333333;
                        margine-top: 0;
                      "
                      >Address: {{ complaint.select }}</small
                    ></div>
                    <small
                      style="
                        font-family: sans-serif;
                        color: #333333;
                        margine-top: 0;
                      "
                      >Address: {{ complaint.address }}</small
                    >
                  </v-col>
                  <v-col cols="12">
                    Description: {{ complaint.description }}
                    <v-row justify="center">
                        <v-dialog v-model="dialog" persistent max-width="600">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              class="ma-15"
                              @click="dialog = false"
                              color="primary"
                              dark
                              v-bind="attrs"
                              v-on="on"
                            >
                              Confirm
                            </v-btn>
                          </template>

                          <v-container fluid grid-list-xl>
                            <v-layout justify-space-around>
                              <v-flex xs6>
                                <v-form ref="form" lazy-validation>
                                  <v-text-field v-model="user_name" label=" User Name"> </v-text-field>

                                  <v-card
                                    class="elevation-16 mx-auto"
                                    width="300"
                                  >
                                    <v-card-title class="text-h5">
                                      Rate our service
                                    </v-card-title>
                                    <v-card-text>
                                      If you enjoy in our service, please take a
                                      few seconds to rate your employes. It
                                      really helps!

                                      <div class="text-center mt-12">
                                        <v-rating
                                          v-model="rating"
                                          color="yellow darken-3"
                                          empty-icon="$ratingFull"
                                          half-increments
                                          hover
                                          large
                                        ></v-rating>
                                      </div>
                                    </v-card-text>
                                    <v-divider></v-divider>
                                    <v-card-actions
                                      class="justify-space-between"
                                    >
                                      <v-btn text @click="dialog = false">
                                        No Thanks
                                      </v-btn>
                                      <v-btn
                                        color="primary"
                                        text
                                        @click="dialog1"
                                      >
                                        Rate Now
                                      </v-btn>
                                    </v-card-actions>
                                  </v-card>
                                </v-form>
                              </v-flex>
                            </v-layout>
                          </v-container>
                        </v-dialog>
                      </v-row>
                  </v-col>
                  

                </v-col>
              </v-list-item>
            </v-list>
            <template>
                      
                    </template>
          </v-tabs-items>
        </base-material-card>
        
                    
                  </v-col
                
      
      ></v-row
    ></v-container
  >
</template>


                 

<script>
import axios from "axios";
export default {
  name: "completed",

  data() {
    return {
      dialog: false,
      user_name: "",
      rating: 0,
      complaints: [],

      items: [],

      tabs: 0,
      tasks: [],
    };
  },
  computed: {
    status() {
      return this.complaints.filter((comp) => comp.status == "completed");
    },
  },
  mounted() {
    this.fetchComplaints();
  },
  methods: {
      dialog1() {
      let newRating = {
        user_name: this.user_name,
        rating: this.rating,
       
      };
      axios
        .post("http://localhost:3000/ratings", newRating)

        .then((res) => {
        
          
          this.$router.push({path:"/customer"})
        })
        .catch(err => {
          console.log(err);
        });
      return true;
    },

    confirm() {},
    smallPart(text) {
      return text.slice(0, 80);
    },

    async fetchComplaints() {
      axios({
        method: "get",
        url: "http://localhost:3000/complaints",
      })
        .then((response) => {
          this.complaints = response.data;
          console.log(this.complaints);
        })
        .catch((error) => {
          console.error(error);
        });
      
    },
  },
};
</script>