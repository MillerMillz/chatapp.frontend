import { Card } from "antd";
import ChatListItem from "../components/ChatListItem/ChatListItem";
import { get } from "../apiCalls";
import apiRoutes from "../apiRoutes";
import { useEffect, useState } from "react";
import { useHubContext } from "../Contexts/HubContext";


const ChatList = () => {
    const [chats,setChats] = useState([]);
    const {messageRefresh} =useHubContext();
 
    const FetchChats = async () =>{

        var result = await get(apiRoutes.chat);
        console.log(result);
        if(result.success)
        {
            setChats(result.response)
        }
        else
        {
            console.log(result.errors);
        }
    }

    useEffect(()=>{
        if(messageRefresh)
        {
            FetchChats();
        }
    },[messageRefresh])
    useEffect(()=>{
        FetchChats();
    },[])

    return(
        <Card>
     <div className="row sticky-top bg-secondary m-4 py-2 "> 
        <div className="col-12 d-flex align-items-center justify-content-center">
        <h1 className='mx-auto'>My Chats</h1>
    </div>
    </div>
    <div style={{width:"100%"}}>
        {
            chats.map((item)=><ChatListItem key={item.id} chat={item}/>)
        }
        </div></Card>
      
        
    )
    
}
export default ChatList;