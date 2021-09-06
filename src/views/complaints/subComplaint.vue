<template>
  <v-layout row wrap>
    <v-flex>
      <v-list style="background: transparent; padding: 10px 40px;">
      
        </v-list-item>
        <v-list-item>
          <v-card-text>{{ complaints.select }}</v-card-text>
        </v-list-item>
        <v-col cols="4">
          <v-list-item>
            <v-select
              v-model="select1"
              :items="list"
              label="Case Worker"
            >
              <template v-slot:item="{ item, attrs, on }">
                <v-list-item v-bind="attrs" v-on="on">
                  <v-list-item-title
                    :id="attrs['aria-labelledby']"
                    v-text="item"
                  ></v-list-item-title>
                </v-list-item>
              </template>
            </v-select>
            <v-btn class="mx-2" fab dark color="indigo" @click="assign(select1,complaints._id)">
              Assign
            </v-btn>
          </v-list-item>
        </v-col>
      </v-list>
    </v-flex>
  </v-layout>
</template>
<script>
import axios from "axios";
export default {
  name: "subComplaint",

  data() {
    return {
      complaints: [],
      employees:[],
      list:[],
      cust:{},
      select1: ""
    };
  },
  mounted() {
    this.fetchComplaints();
    this.fetchEmployees();
  },
  methods:
   {
     async fetchEmployees() {
      axios({
        method: "get",
        url: "http://localhost:3000/employees"
      })
        .then(response => {
          // this.employees = response.data;
          response.data.forEach(element => {
            if(element["department"]=="caseworker"){
              if(element["isAssigned"]=="false"){
                this.list.push(element["first_name"]+" "+element["last_name"]);
                this.employees.push(element);
                this.cust[element["first_name"]+" "+element["last_name"]]=element;
              }
            }
          });
          console.log(this.list);
        })
        .catch(error => {
          console.error(error);
        });
    },
    async fetchComplaints() {
      return axios({
        method: "get",
        url: "http://localhost:3000/complaints/" + this.$route.params.id
      })
        .then(response => {
          this.complaints = response.data;
          console.res(this.complaints);
        })
        .catch(() => {});
    },
    async assign(xas,id) {
      console.log(xas);
      if (xas==""){
        swal("Error!", "Required field missing", "error");
      }
      else{
        let elm=this.cust[xas];
        let newAssigns={
          emp_id:elm["_id"],
          complaint_id:id
        }
        console.log(newAssigns);
         axios
        .post(
          "http://localhost:3000/assigns" ,newAssigns
        )
        .then(response => {
          console.log("success");
          swal("Great!", "Case worker assigned Successfuly", "success"),
                  this.$router.push({ path: "/Customer_Service" });
        });
      }
    

      // this.complaints.subComplaint = types[this.select];

      // axios
      //   .post(
      //     "http://localhost:3000/assigns" + this.complaints._id,
      //     this.complaints
      //   )
      //   .then(response => {
      //     console.log("success");
      //   });
      // .then(response => {
      //   this.complaints = response.data;
      //   console.res(this.complaints);
      // });
    }
  }
};
</script>
