import { Routes,Route } from "react-router-dom";
import Login from "../modules/Login";
import Register from "../modules/Register";
import { useEffect } from "react";
import Logo from "../Assets/Images/Logo.png";

const Landing = ({SignIn,errors}) =>{
useEffect(()=>{
    console.log("Landing")
},[])


    return(   
        <div className="row" style={{height:"100vh"}}>
        <div className=" col-12 col-md-6 col-lg-7 d-flex align-items-center justify-content-center" style={{backgroundColor:"#191D24"}}>
          <img src={Logo} width={"60%"}/>
        </div>
     <div className="col-12 col-md-6 col-lg-5  d-flex align-items-center justify-content-center" style={{backgroundColor:"whitesmoke"}}>
        <div className="card p-5" style={{width:"70%"}} >
        <p style={{color:'red'}}>{errors[0]}</p>
        <Routes>
            <Route path="/" element={<Login SignIn={SignIn}/>}/>
            <Route path="Register" element={<Register/>} />
        </Routes>
        </div>
    </div></div>
    )
}

export default Landing;