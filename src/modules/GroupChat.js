import { Button } from "react-bootstrap";
import { Image } from "antd";
import MessageContainer from "../components/MessageContainer";
import SendMessageForm from "../components/SendMessageForm";
import ConnectedUsers from "../components/ConnectedUsers";
import { useNavigate, useParams } from "react-router-dom";
import default_display from '../Assets/Images/icons-5235125_1280.webp'
import { useEffect, useState } from "react";
import { get,put2,post} from "../apiCalls";
import apiRoutes from "../apiRoutes";
import { useHubContext } from "../Contexts/HubContext";
import { useUserContext } from "../Contexts/UserContext";
import "bootstrap-icons/font/bootstrap-icons.css"


const GroupChat = () =>{
     const {id} = useParams();
    const navigate = useNavigate();
    const{Authuser}=useUserContext();
    const {messageRefresh,connectedUsers} = useHubContext();
    const [display,setDisplay] = useState(default_display)
    const [members, setMembers] = useState([]);
    const [roomChat,setRoomChat] = useState();
    const [messages,setMessages] = useState([]);
     const update = async (i) =>{
    
    
        var result = await put2(apiRoutes.message+i+"/"+true);
        console.log(result); 
    }
    const fetchChat=async () =>{
        var result = await get(apiRoutes.roomChat+id);
        if(result.success)
        {
            setRoomChat(result.response.chatRoom);
            if(result.response?.chatRoom?.image){
                setDisplay(result.response.chatRoom.image)}
                if(result.response.lastMessage.viewed===false&&result.response.lastMessage.senderID!==Authuser.id)
                {
                    console.log("at fetch")
                    await update(id);
                }
        }
        else{
            console.log(result.errors);
        }
    }
    const fetchMembers = async () => {
       var result = await get(apiRoutes.membership+"Members/"+id+"/"+false);

       if(result.success)
       {
            setMembers(result.response);
       }
       else{
        console.log(result.errors);
    }
    }
    const fetchMessages = async () =>{
        var result = await get(apiRoutes.message+"RoomMessages/"+id);
        if(result.success)
        {
            setMessages(result.response);
            console.log('mees->')
            console.log(result.response)
        }
        else{
            console.log(result.errors);
        }
    }
    
const sendMessage = async (mess) =>{
    const message = {
        senderId:Authuser.id,
        messageContent:mess,
        messageType:"text",
        viewed:false
    }
    console.log("isNotNew")
    const messageResult = await post(apiRoutes.message+id+"/"+false,message);
    if(messageResult.success)
    {
        setMessages([...messages,messageResult.response])
        
    }
    else
    {
        console.log(messageResult.errors)
    }
    
}
const Refresh = async () =>{
    if(messageRefresh){
        var result = await get(apiRoutes.message+"RoomMessages/"+id);
        if(result.success){
            setMessages(result.response);
        if(messages.length>0){
           
            if(result.response[result.response.length-1]?.user?.id!==Authuser.id){
                console.log("at refresh message")
                console.log(messages[messages.length-1]);
            update(id);}
        }}
    }
}
useEffect(() => {
    Refresh();
     
    }, [messageRefresh]);
useEffect(()=>{
    fetchChat();
    fetchMessages();
    fetchMembers();
   
},[])



return<div>
    <div className="room-details">
        <Image src={display} width={"5%"} height={"auto"} style={{borderRadius:35,marginTop:10, marginLeft:"40%",float:"left"}}/> 
        <div style={{float:"right", width:'90%',marginTop:10}}>
         <div className="room-info">
            <h2>{roomChat?.name}</h2>
            <h5 style={{color:'gray'}}>{roomChat?.bio}</h5>
        </div> 
        <div className="leave-room">
        <i class="bi bi-box-arrow-right"></i>
        <Button variant="danger" onClick={()=>{
         navigate("/")}}>Leave Room</Button>
    </div></div>
    </div>
    
    
    <div className="chat-room">
        <MessageContainer messages={messages} />
        <SendMessageForm sendMessage={sendMessage} />

    </div>
  { <ConnectedUsers users={connectedUsers} members={members}/> }
</div>}


export default GroupChat;