<template>
  <v-container
    id="user-profile"
    fluid
    tag="section"
  >
  <!-- <CustomerDrawer />
  <CustomerSettings />
  <CustomerAppBar />
  <CustomerView  /> -->
    <v-row justify="center">
      
      <v-col
        cols="12"
        md="12"
      >
      <base-material-card class="px-5 py-3">
          <template v-slot:heading>
            <v-tabs v-model="tabs" background-color="transparent" slider-color="white">
              <v-tab class="mr-3">
                Complaints
              </v-tab>
              <v-tab class="mr-3" to="">
                Confirmation
              </v-tab>
              <v-tab class="mr-3">
                Status
              </v-tab>
            </v-tabs>
          </template>
      </base-material-card>

        <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn text class="mx-14"
          color="white"
          v-bind="attrs"
          v-on="on"
        >
          View Bill
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Bill Report
        </v-card-title>
         <v-list v-for="(bill, index) in bills" :key="index">
        <v-list-item>
          <div
             style="font-family: sans-serif; font-size: 17px; font-weight: lighter; margin-bottom: 0;"
            > Date :{{bill.date}}</div>
        </v-list-item>
         <v-list-item>
         <div
             style="font-family: sans-serif; font-size: 17px; font-weight: lighter; margin-bottom: 0;"
            > Service_Charge :{{bill.service_charge}}</div>
            </v-list-item>
         <v-list-item>
            <div
             style="font-family: sans-serif; font-size: 17px; font-weight: lighter; margin-bottom: 0;"
            >  Payment_Date :{{bill.payment_date}}</div>
         </v-list-item>
         

        
         </v-list>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


        <base-material-card color="warning">
          <template v-slot:heading>
            <div class="text-h3 font-weight-light">
              Fill your Complaint
            </div>
          </template>





          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="user_name"
                    label="User Name"
                    class="purple-input"
                  />
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="address"
                    label="Address"
                    class="purple-input"
                    type="address"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="phone_no"
                    class="purple-input"
                    label="Phone Number"
                    type="number"
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
                    label="Fill Your Complaints"
                    value=""
                  />
                </v-col>
                
                <v-col
                  cols="12"
                  class="text-left"
              >
                  <v-btn
                    color="success"
                    class="mr-0"
                  >
                    upload file
                  </v-btn>
                </v-col>

                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn
                    color="success"
                    class="mr-0"
                    @click="registerComplaint" :disabled="!valid"
                  >
                    Register Complaint
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
  async created(){
    if(!await checkAuth()){
      this.$router.push("/employee_login");
    }

    if(variables.logged_user.type != "employee"){
      this.$router.push("/");
    }

    if(variables.logged_user.department != "assistant"){
      this.$router.push("/");
    }

    await this.getComplains();
  },
  
  data() {
    return {
      bills: [],
      drawer: false,
      links: [],
      valid: true,
      user_name:"",
      phone_no: "",
      
      address: "",
      date:"",
      description: "",
     
    };
  },
  mounted() {
    this.fetchBills();
     },
  methods: {
    async logout(){

      let token = cookies.get("logged_user");
      //console.log(token);
      await axios.post("http://localhost:3000/logout", { token: token }).then(response => {

        if(!response.data.header.error){
          cookies.remove("logged_user");
          variables.logged_user = {};
          this.$router.push("/login");
          
        }

      });

    },
  registerComplaint() {
      //if (this.$refs.form.validate()) {
      let newComplaint = {
        user_name: this.user_name,
        phone_no: this.phone_no,
        address: this.address,
        date: this.date,
        description: this.description,
       
      };
      // console.log("newCustomer", newCustomer);
      axios
        .post("http://localhost:3000/complaints", newComplaint)
        
        .then(() => {
          this.get('/complaints', (req,res)=>{
            res.render('/')
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
     async fetchBills() {
       
       axios({
        method: "get",
        url: "http://localhost:3000/bills"
      })
        .then(response => {
          this.bills = response.data;
          console.log(this.bills);
        })
        .catch(error => {
          console.error(error);
        });
  },
};
</script>
