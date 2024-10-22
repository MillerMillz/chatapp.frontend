import {Badge} from "antd"
import default_image from "../../Assets/Images/default_image.jpg"
import "bootstrap/dist/css/bootstrap.min.css"
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUserContext } from "../../Contexts/UserContext";
dayjs.extend(relativeTime);

const RoomChatListItem = ({roomChat}) =>
{
const navigate = useNavigate();
const {Authuser} = useUserContext();
const [display,setDisplay] = useState(default_image);
    const {chatRoom,lastMessage,id,unreadMessages} =roomChat;
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
if(chatRoom.image)
{
    setDisplay(chatRoom.image);
}
    },[])

    return (<div className="container shadow p-3 mb-2 bg-body rounded" style={{cursor:'pointer'}} onClick={()=>{navigate(`room/${id}`)}}>
      
        <div className="content" style={{height:85}}>
            <div className="row">  
            <div className="col-1">
            <img src={display} onClick={(event)=>{ event.stopPropagation(); console.log("image")}}  class="rounded-circle" width={"100%"}  height={80} />
            </div>
            <div className="col-9">
                   <p style={{fontSize:30,width:'85%',fontWeight:"bold"}}>{chatRoom.name}</p>
                
         <div  >{lastMessage.messageContent}</div>
            </div>
            <div className="col-2 d-flex align-items-center justify-content-center">
                
            <p style={{fontSize:30,color: "green"}}>{getTime()}</p>
             <Badge count={unreadMessages} overflowCount={99} color= {(lastMessage.viewed || lastMessage.senderID===Authuser.id) ? "white":"green" } style={{marginLeft:'20px',marginTop:'-10px'}}></Badge> 
            </div>
           </div>
        </div>
    </div>)
}


export default RoomChatListItem;