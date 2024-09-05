import { Routes,Route } from "react-router-dom";
import Login from "../modules/Login";
import Register from "../modules/Register";
import { useEffect } from "react";

const Landing = ({SignIn,errors}) =>{
useEffect(()=>{
    console.log("Landing")
},[])


    return(   
     <div className="app">
        <h2>MyChat</h2>
        <hr className="line" />
        <p style={{color:'red'}}>{errors[0]}</p>
        <Routes>
            <Route path="/" element={<Login SignIn={SignIn}/>}/>
            <Route path="Register" element={<Register/>} />
        </Routes>
    </div>
    )
}

export default Landing;