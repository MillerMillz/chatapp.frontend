import React from "react";
import './style.css'
import "bootstrap-icons/font/bootstrap-icons.css"


const ImagePopup = (props) =>{

    return (props.trigger) ? (
        <div className="popup">
             
            <div className="close-btn"  onClick={()=>{props.setTrigger(false)}}>X</div>
            {props.children}
          
        </div>
    ) : "";
}

export default ImagePopup;