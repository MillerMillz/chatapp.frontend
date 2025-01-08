import React from "react";
import './style.css'
import "bootstrap/dist/css/bootstrap.min.css"

const PopUp = (props) =>{

    return (props.trigger) ? (
        <div className="popup1">
            <div className="popup-inner1">
            <button className="close-btn1 btn-close" onClick={()=>{props.setTrigger(false)}}></button>
            {props.children}
            </div>
        </div>
    ) : "";
}

export default PopUp;