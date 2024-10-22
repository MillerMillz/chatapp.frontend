import {Image,Badge} from "antd"
import default_image from "../../Assets/Images/default_image.jpg"
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "bootstrap/dist/css/bootstrap.min.css"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from './style.module.css'
import "bootstrap-icons/font/bootstrap-icons.css"
import { useUserContext } from "../../Contexts/UserContext";
import ImagePopup from "../ImagePopup";
import { useHubContext } from "../../Contexts/HubContext";
dayjs.extend(relativeTime);

const ChatListItem = ({chat}) =>
{
const navigate = useNavigate();
const {Authuser} =  useUserContext();
const {connectedUsers} = useHubContext();
const [display,setDisplay] = useState(default_image);
const [trigger,setTrigger] = useState(false);
    const {user,lastMessage,id,unreadMessages} =chat;

    const getTime = () =>{
        const today = new Date();
        const messageDate = new Date(lastMessage.time);

        if(today.getDate()===messageDate.getDate()&&today.getMonth()===messageDate.getMonth()&&today.getFullYear()===messageDate.getFullYear())
        return `${dayjs(lastMessage.time).hour()}:${dayjs(lastMessage.time).minute()}`;

        if(today.getDate()-messageDate.getDate()===1&&today.getMonth()===messageDate.getMonth()&&today.getFullYear()===messageDate.getFullYear())
        return 'Yesterday';

        return `${dayjs(lastMessage.time).date()}/${dayjs(lastMessage.time).month()+1}/${dayjs(lastMessage.time).year()}`
    }

    useEffect(()=>{
if(user.image)
{
    setDisplay(user.image);
    console.log(user.id);
    console.log(Authuser.id);
    console.log("ppppp")
}
    },[])

    return (
    <div>
        
        <div className="container shadow pe-3 pt-3 pb-3 mb-2 bg-body rounded" style={{cursor:'pointer'}} onClick={()=>{navigate(`chat/${id}`)}}>
      
        <div className="content  ">
            <div className="row">  
            <div className="col-1 ">
          <div style={{height:"100%",backgroundColor:connectedUsers.includes(user.id)?"#3fc060":"lightgrey", width:"4%"}}></div>
               
          </div>
            <div className="col-1 " style={{marginLeft:"-7%"}}>
          
               
            <img src={display} onClick={(event)=>{ event.stopPropagation(); setTrigger(true)}}  class="rounded-circle" width={"100%"}  height={80} />
            </div>
           
            <div className="col-8">
                   <p style={{fontSize:30,width:'85%',fontWeight:"bold"}}>{user.firstName} {user.lastName}</p>
                
         <div style={{marginTop:-10,fontSize:15}} className={styles.limitedTextAlt}>{(lastMessage.senderID===Authuser.id) ? (lastMessage.viewed)? <i class="bi bi-check2-circle text-primary"></i> :<i class="bi bi-check2"></i>:""}{" "+lastMessage.messageContent}</div>
            </div>
            <div className="col-2 d-flex align-items-center justify-content-center">
                
             <p style={{fontSize:30,color: "green"}}>{getTime()}</p>
             <Badge count={unreadMessages} overflowCount={99} color= {(lastMessage.viewed || lastMessage.senderID===Authuser.id) ? "white":"green" } style={{marginLeft:'20px',marginTop:'-10px'}}></Badge> 
            </div>
           </div>
        </div></div>
        <ImagePopup trigger={trigger} setTrigger={setTrigger}>
        <img src={display} alt="display pic" height={700}></img>
        </ImagePopup>
        </div>
   )
}


export default ChatListItem;