import { Button } from "react-bootstrap";
import { Image } from "antd";
import MessageContainer from "../components/MessageContainer";
import SendMessageForm from "../components/SendMessageForm";
import default_image from '../Assets/Images/default_image.jpg'
import {  useUserContext } from "../Contexts/UserContext";
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap-icons/font/bootstrap-icons.css"
import { useHubContext } from "../Contexts/HubContext";
import { useParams } from "react-router-dom";
import { useEffect, useState,useRef } from "react";
import { get,post, put2,Delete,put } from "../apiCalls";
import apiRoutes, { status } from "../apiRoutes";
import ImagePopup from "../components/ImagePopup";
import MenuPopUp from "../components/MenuPopup";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);


const Chat = () =>{
const {Authuser} =  useUserContext();
const {id} = useParams();
const {messageRefresh} =useHubContext();
const [chat,setChat] = useState();
const [friendship,setFriendship] = useState();
const [display,setDisplay] = useState(default_image);
const [blocker,setBlocker] = useState(null);
const [messages,setMessages] = useState([]);
const [trigger,setTrigger] = useState(false);
const [detailTrigger,setDetailTrigger] = useState(false);


useEffect(() => {
    
   
if(messageRefresh){
    fetchMessages();
    update(id);
}
 
}, [messageRefresh]);
const unfriend = async ()=>{
    const result = await Delete(apiRoutes.friendship+friendship.id)
    if(result.success)
    {
        setFriendship(result.response)
    }
    else
    {
        console.log(result.errors)
    }
}
const blockFriend = async ()=>{

    const details = {
        id:friendship.id,
         user1ID:friendship.user1ID,
         user2ID:friendship.user2ID,
         time:friendship.time,
         status:'Blocked'

    }

    const result = await put(apiRoutes.friendship,details)
    if(result.success)
    {
        setFriendship(result.response)
        const res = await get(apiRoutes.friendship+"Block/"+friendship.id)
        if(res.success)
        {
            setBlocker(res.response);
        }
        else 
        {
            console.log(res.errors);
        }
    }
    else
    {
        console.log(result.errors)
    }
}
const unblockFriend = async ()=>{

    const details = {
        id:friendship.id,
         user1ID:friendship.user1ID,
         user2ID:friendship.user2ID,
         time:friendship.time,
         status:'Active'

    }

    const result = await put(apiRoutes.friendship,details)
    if(result.success)
    {
        setFriendship(result.response)
    }
    else
    {
        console.log(result.errors)
    }
}
const deleteChat = async ()=>{
    const result = await Delete(apiRoutes.message+id)
    if(result.success)
    {
       setDetailTrigger(false);
    }
    else
    {
        console.log(result.errors)
    }
}

const getFriendShip= async (frId)=>{
    const result = await get(apiRoutes.friendship+frId)
    if(result.success)
    {
        setFriendship(result.response)
        if(result.response.status==='Blocked')
        {
            const res = await get(apiRoutes.friendship+"Block/"+friendship.id)
            if(res.success)
            {
                setBlocker(res.response);
            }
            else 
            {
                console.log(res.errors);
            }
        }
    }
    else
    {
        console.log(result.errors)
    }
}
const sendMessage = async (mess) =>{
    const message = {
        senderId:Authuser.id,
        messageContent:mess,
        messageType:"text",
        viewed:false
    }
    const messageResult = await post(apiRoutes.message,{message:message,chat:{
        ownerId:Authuser.id,
        friendId:chat?.user.id
    }});
    if(messageResult.success)
    {
        setMessages([...messages,messageResult.response])
        
    }
    else
    {
        console.log(messageResult.errors)
    }
    
}
const fetchMessages = async () =>{
    const result = await get(apiRoutes.message+id);
    console.log(result);
    if(result.success)
    {
       setMessages(result.response)
    }else
    {
        console.log(result.errors);
    }
}
const fetchChat = async () =>{
    const result = await get(apiRoutes.chat+id);
    console.log(result)
    if(result.success)
    {
        setChat(result.response);
        if(result.response?.user?.image){
        setDisplay(result.response.user.image)}
        if((result.response.lastMessage.viewed===false)&&(result.response.lastMessage.senderID!==Authuser.id))
        {
            await update(result.response.id);
        }
    }else
    {
        console.log(result.errors);
    }
}
const update = async (i) =>{
    

        var result = await put2(apiRoutes.message+i);
        console.log(result); 
}
useEffect(()=>{
    fetchChat();
    fetchMessages();
   
},[])
useEffect(()=>{
   if(chat)
    {
        getFriendShip(chat.friendshipId);
        console.log(chat)
    }   
},[chat])


return<div>
    <div className="row" onClick={()=>{setDetailTrigger(true)}} style={{cursor:'pointer'}}> 
        <div className="col-lg-1 col-2 d-flex align-items-center justify-content-center">
        <img src={display} onClick={(event)=>{event.stopPropagation();setTrigger(true)}} width={60} height={"auto"} style={{borderRadius:30}}/> </div>
        <div className="col-lg-11 col-10">
         <div className="room-info">
            <h2>{chat?.user?.firstName} {chat?.user?.lastName}</h2>
            <h5 style={{color:'gray'}}>{chat?.user?.bio}</h5>
        </div> 
    </div>
    </div>
    
    
    <div className="chat">
        <MessageContainer messages={messages} />
        <SendMessageForm sendMessage={sendMessage} />

    </div>
    <ImagePopup trigger={trigger} setTrigger={setTrigger}>
        <img src={display} alt="display pic" height={700}></img>
    </ImagePopup>
    <MenuPopUp trigger={detailTrigger} setTrigger={setDetailTrigger}>
        <div className="container">
            <div className="row">
                <div className="col-12 d-flex align-items-center justify-content-center">
                    <h2>{chat?.user?.firstName} {chat?.user?.lastName}</h2>
                </div>
            </div>
            <div className="row my-2">
            <div className="col-12 d-flex align-items-center justify-content-center">
                    <img class="rounded-circle" src={display} alt="profile picture" height={250} ></img>
                </div>
            </div>
            <hr></hr>
            <div className="row">
                <div className="col-3 d-flex align-items-top justify-content-end">
                    <h4>Bio : </h4>
                </div>
                <div className="col-9 d-flex align-items-center justify-content-start">
                    <h6>{chat?.user?.bio}</h6>
                </div>
            </div>
            <div className="row">
                <div className="col-3 d-flex align-items-top justify-content-end">
                    <h4>Status : </h4>
                </div>
                <div className="col-9 d-flex align-items-center justify-content-start">
                    {friendship?<h6 style={{color:(friendship.status==='Active'?'green':'red')}}>{friendship?.status} </h6>:<h6 style={{color:'blue'}}>Not Friend(Re-invite) </h6>}
                </div>
            </div>
            <div className="row">
                <div className="col-3 d-flex align-items-top justify-content-end">
                    <h4>Since : </h4>
                </div>
                <div className="col-9 d-flex align-items-center justify-content-start">
                    <h6>{dayjs(friendship?.time).date()}/{dayjs(friendship?.time).month()}/{dayjs(friendship?.time).year()} </h6>
                </div>
            </div>
            <hr></hr>
            {friendship?
            (<div className="row">
                <div className="col-4 d-flex align-items-center justify-content-center">
                    <button type='button' onClick={()=>deleteChat()} className="btn btn-secondary">Delete chat <i class="bi bi-trash"></i></button>
                </div>
                <div className="col-4 d-flex align-items-center justify-content-center">
                    {friendship.status==='Blocked'? <button type='button' disabled={blocker?.blockerId!==Authuser.id} onClick={()=>unblockFriend()} className="btn btn-primary">Unblock <i class="bi bi-person-dash"></i></button>:<button type='button' onClick={()=>blockFriend()} className="btn btn-danger">Block <i class="bi bi-person-dash"></i></button>}
                
                </div>
                <div className="col-4 d-flex align-items-center justify-content-center">
                <button type='button' onClick={()=>unfriend()} className="btn btn-warning">Unfriend <i class="bi bi-person-x"></i></button>
                </div>
                
            </div>):
           ( <div className="row">
            <div className="col-12 d-flex align-items-center justify-content-center">
                <button type='button' disabled={messages.length<1} onClick={()=>deleteChat()} className="btn btn-secondary">Delete chat <i class="bi bi-trash"></i></button>
            </div>
           
           
            
        </div>)}
            <hr></hr>
        </div>
    </MenuPopUp>
</div>

}


export default Chat;