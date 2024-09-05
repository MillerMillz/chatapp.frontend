import "../App.css";
import App from "../App";
import "bootstrap/dist/css/bootstrap.min.css"
import { useEffect, useState} from "react";
import {  useUserContext } from "../Contexts/UserContext";
import { post } from "../apiCalls";
import apiRoutes from "../apiRoutes";
import Landing from "./Landing";
import { useHubContext } from "../Contexts/HubContext";

const Security = () => {

  const { Authuser,FetchUser,token,setToken,trigger,setTrigger} = useUserContext();
  const {sendMessage} = useHubContext();
  const [errors,setErrors] = useState([]);
  const SignIn = async (email,password) => {
    
    
    const response = await post(apiRoutes.login,{email,password});
    if(response?.success)
      {
       
        localStorage.setItem('jwt',response?.response.token)
        setToken(response?.response.token);
        setTrigger(false);
        FetchUser();
      }
      else
      {
        setErrors(response?.errors)
        setTrigger(true);
        console.log(response);
      }
    
  
  }
   useEffect(()=>{
    console.log("security in effect")
    console.log(Authuser);
   },[])

return (
   !Authuser ?  (<Landing SignIn={SignIn} errors={errors}/>) : ( <App/>)
  )
}

export default Security;