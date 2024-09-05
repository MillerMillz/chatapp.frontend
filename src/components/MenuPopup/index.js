import React from "react";
import './style.css'
import "bootstrap-icons/font/bootstrap-icons.css"


const MenuPopUp = (props) =>{

    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
            <div className="close-btn" onClick={()=>{props.setTrigger(false)}}>X</div>
            {props.children}
            </div>
        </div>
    ) : "";
}

export default MenuPopUp;