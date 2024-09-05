import { Button } from "react-bootstrap";
import { Image } from "antd";
import MessageContainer from "../components/MessageContainer";
import SendMessageForm from "../components/SendMessageForm";
import ConnectedUsers from "../components/ConnectedUsers";
import { useNavigate, useParams } from "react-router-dom";
import default_display from '../Assets/Images/icons-5235125_1280.webp'
import { useEffect, useState } from "react";
import { get,put,post} from "../apiCalls";
import apiRoutes from "../apiRoutes";
import { useHubContext } from "../Contexts/HubContext";
import { useUserContext } from "../Contexts/UserContext";


const NewGroupChat = () =>{
    const navigate = useNavigate();
    const{Authuser}=useUserContext();
    const {messageRefresh,connectedUsers} = useHubContext();
    const [display,setDisplay] = useState(default_display)
    const {id} = useParams();
    const [roomChat,setRoomChat] = useState();
    const [messages,setMessages] = useState([]);
    const [chat,setChat] =  useState();

    const fetchChat=async () =>{
        var result = await get(apiRoutes.chatRoom+id);
        if(result.success)
        {
            setRoomChat(result.response);
            if(result.response?.image){
                setDisplay(result.response.image)}
              
        }
        else{
            console.log(result.errors);
        }
    }
  
     const fetchMessages = async () =>{
        var result = await get(apiRoutes.message+roomChat.id);
        if(result.success)
        {
            setMessages(result.response);
        }
        else{
            console.log(result.errors);
        } 
    }
    /* const update = async (item) =>{
        const message = {
            id:item.lastMessage.id,
            senderID:item.user.id,
            time:item.lastMessage.time,
            replyID:item.lastMessage.replyID,
            messageContent:item.lastMessage.messageContent,
            messageType:item.lastMessage.messageType,
            viewed:true,
            filePath:item.lastMessage.truePath
        }

        var result = await put(apiRoutes.message,message);
        console.log(result); 
} */
const sendMessage = async (mess) =>{
    const message = {
        senderId:Authuser.id,
        messageContent:mess,
        messageType:"text",
        viewed:false
    }
    const messageResult = await post(apiRoutes.message+chat.id,message);
    if(messageResult.success)
    {
        setMessages([...messages,messageResult.response])
        
    }
    else
    {
        console.log(messageResult.errors)
    }
    
}
useEffect(() => {
    
   
    if(messageRefresh){
        fetchMessages();
    }
     
    }, [messageRefresh]);
useEffect(()=>{
    fetchChat();
   
   
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
        <Button variant="danger" onClick={()=>{
         navigate("/")}}>Leave Room</Button>
    </div></div>
    </div>
    
    
    <div className="chat-room">
        <MessageContainer messages={messages} />
        <SendMessageForm sendMessage={sendMessage} />

    </div>
  {/* <ConnectedUsers users={connectedUsers}/> */}
</div>}


export default NewGroupChat;