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
              Send Bill
            </div>
          </template>

          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="date"
                    label="Date"
                    class="purple-input"
                    type="date"
                  />
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="username"
                    label="User Name"
                    class="purple-input"
                    
                  />
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="service_charge"
                    label="Service Charge"
                    class="purple-input"
                    
                  />
                </v-col>
                  <v-text-field
                    v-model="payment_date"
                    label="Payment Date"
                    class="purple-input"
                    type="date"
                  />
                
                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn
                    color="success"
                    class="mr-0"
                    @click="sendBill" :disabled="!valid"
                  >
                    Send Bill
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
      date:"",
      username:"",
      service_charge:"",
      payment_date:"", 
      
     
    };
  },
  methods: {
  sendBill() {
      //if (this.$refs.form.validate()) {
      let newBill = {
        date: this.date,
        username:this.username,
        service_charge: this.service_charge,
        payment_date: this.payment_date
        
         };
     
      // console.log("newCustomer", newCustomer);
      axios
        .post("http://localhost:3000/bills", newBill)
       
        .then(() => {
          this.get('/bills', (req,res)=>{
            
          })
          this.$router.push({ path: "/Customer_Service" });
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
