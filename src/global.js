import * as cookies from "./cookies.js";
import axios from "axios";

export let variables = {
  logged_user: null
}

export function separateView(){

  /*
  [
    admin => admin,
    customer service => cs,
    operation_mainainance => om,
    manager => manager,
    inspection => inspection,
    emergency => emergency,
    relocation => ,
    rehabilitation => ,
    new connection => new_con,
    billing => billing,
    preventive maintenace => prev_main,
    complaint_on_employee => emp_comp 
  ]
  */
  if(variables.logged_user.department == "admin"){
    return "/admin";
  }
  else if(variables.logged_user.department == "Customer_Service"){
    return "/Customer_Service";
  }else if(variables.logged_user.department == "OperationMaintenance"){
    return "/Operation_Maintenance";
  }else if(variables.logged_user.department == "manager"){
    return "/manager";
  }else if(
    variables.logged_user.department == "inspection" ||
    variables.logged_user.department == "emergency" ||
    variables.logged_user.department == "relocation" ||
    variables.logged_user.department == "rehabilitation" ||
    variables.logged_user.department == "new_con" ||
    variables.logged_user.department == "billing" ||
    variables.logged_user.department == "prev_main" ||
    variables.logged_user.department == "emp_comp"
  ){
    return "/CaseWorker";
  }

}

export async function checkAuth(){

  if(!variables.logged_user){

    let token = cookies.get("logged_user");

    if(token){

      await axios.post("http://localhost:3000/auth_info", {
        token: token
      }).then(response => {

        if(response.data.header.error){
          cookies.remove("logged_user");
          return false;
        }

        variables.logged_user = response.data.data;

      });

    }else{
      return false;
    }

  }

  return true;

}

export function showMessage(type, id, message){

  let object = window.document.getElementById(id);

  if(object){

    if(type){
      object.innerHTML = '<div class="alert alert-danger">'+message+'</div>';
    }else{
      object.innerHTML = '<div class="alert alert-success">'+message+'</div>';
    }

  }

}
