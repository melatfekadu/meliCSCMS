<template>
  <v-container
    id="user-profile"
    fluid
    tag="section"
  >
 
    <v-row justify="center">
      
      <v-col
        cols="12"
        md="8"
      >
        <base-material-card>
          <template v-slot:heading>
            <div class="text-h3 font-weight-light">
              Send Report 
            </div>
          </template>

          <v-form>
            <v-container class="py-0">
              <v-row>
                
                <v-col cols="6">
                  <v-text-field
                    v-model="department"
                    label="Department"
                    class="purple-input"
                    
                  />
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="date"
                    label="Date"
                    class="purple-input"
                    type="date"
                  />
                </v-col>
                

                <v-col 
                cols="50"
                md="11"
                >
                  <v-textarea
                    v-model="description"
                    class="purple-input"
                    label="massages"
                    value=""
                  />
                </v-col>
                
                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn
                    color="success"
                    class="mr-0"
                    @click="sendReport" :disabled="!valid"
                  >
                    Send Warning
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
 
  data() {
    return {
      drawer: false,
      links: [],
      valid: true,
      department:"",
      date:"",
      description: "",
      
     
    };
  },
  methods: {
  sendReport() {
      //if (this.$refs.form.validate()) {
      let newReport = {
        department:this.department,
        date: this.date,
        description: this.description
        
         };
     
      // console.log("newCustomer", newCustomer);
      axios
        .post("http://localhost:3000/reports", newReport)
        //       return axios({
        //         method: 'post',
        //           data: {

        //       },
        //    url: 'http://localhost:3000/customers',
        //     headers: {
        //        'main-Type': 'application/json',
        //       },
        //     })
        .then(() => {
          this.get('/reports', (req,res)=>{
            
          })
          // this.$router.push({ path: "/" });
          this.$refs.form.reset();
        })
        .catch((err) => {
          console.log(err);
        });
      //} // VALIDATION END
      return true;
    },
  },
};
</script>
