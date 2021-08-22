import * as cookies from "./cookies.js";
import axios from "axios";

export let variables = {
  logged_user: null
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
