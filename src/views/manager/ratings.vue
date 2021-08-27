<template>
 <v-row>
      <v-col cols="12" md="11">
        <base-material-card class="px-5 py-3">
          <template v-slot:heading>
            <v-tabs v-model="tabs" background-color="transparent" slider-color="white">
              
              <v-tab class="mr-3" to="/ratings"> 
                Ratings
                
              </v-tab>
            </v-tabs>
          </template>

    <v-tabs-items v-model="tabs" class="transparent">
            <v-list v-for="(rating, index) in ratings " :key="index">
              <v-list-item>
                <v-col cols="1">
                  <v-list-item-action>
                    
                  </v-list-item-action>
                </v-col>
                <v-col class cols="12">
                  <v-col cols="12">
                    <div
                      style="font-family: sans-serif; font-size: 15px; font-weight: lighter; margin-bottom: 0;"
                    >User_name : {{rating.user_name}}</div>
                  </v-col>
                    <v-col cols="12">
                      <div
                      style="font-family: sans-serif; font-size: 15px; font-weight: lighter; margin-bottom: 0;"
                    >Rating : {{rating.rating}}</div>
                     </v-col>
                  
                </v-col>
              </v-list-item>
            </v-list>
          </v-tabs-items>
    </base-material-card>
      </v-col>
 </v-row>
 
</template>
<script>
import axios from 'axios'

export default ({
    data() {
        return{
            ratings:[],
        }
        
    },
     mounted() {
    this.fetchRatings();
     },
    methods:{
         async fetchRatings() {
      axios({
        method: "get",
        url: "http://localhost:3000/ratings"
      })
        .then(response => {
          this.ratings = response.data;
          console.log(this.ratings);
        })
        .catch(error => {
          console.error(error);
        });
      
    }
    
  },
    
})
</script>
