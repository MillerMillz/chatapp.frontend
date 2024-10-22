import { Badge, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { post,get } from "../apiCalls";
import { useState,useEffect } from "react";
import apiRoutes from "../apiRoutes";
import { useUserContext } from "../Contexts/UserContext";
import { useHubContext } from "../Contexts/HubContext";

import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap-icons/font/bootstrap-icons.css"

const ChatsMenuItem = ({ openedChats }) => (
    <div className="row">
        <div className="col-3 d-flex justify-content-center"><i class="bi bi-chat-right-dots"></i></div>
      <div className="col-6">Chats</div>
      <div className="col-3">{openedChats>0?<Badge count={openedChats} overflowCount={99} color="blue" />:""}</div>
    </div>
  );
  const RoomsMenuItem = ({ openedChats }) => (
    <div className="row">
        <div className="col-3 d-flex justify-content-center"><i class="bi bi-microsoft-teams"></i></div>
      <div className="col-6">Rooms</div>
      <div className="col-3">{openedChats>0?<Badge count={openedChats} overflowCount={99} color="blue" />:""}</div>
    </div>
  );
  const InvitesMenuItem = ({ newInvites }) => (
    <div className="row">
        <div className="col-3 d-flex justify-content-center"><i class="bi bi-envelope-arrow-up"></i></div>
      <div className="col-6">Invites</div>
      <div className="col-3">{newInvites>0?<Badge count={newInvites} overflowCount={99} color="blue" />:""}</div>
    </div>
  );
  
  const FriendsMenuItem = () => (
    <div className="row">
        <div className="col-3 d-flex justify-content-center"><i class="bi bi-people"></i></div>
      <div className="col-6">Friends</div>
      <div className="col-3"></div>
    </div>
  );
  const StatusMenuItem = () => (
    <div className="row">
        <div className="col-3 d-flex justify-content-center"><i class="bi bi-play-circle"></i></div>
      <div className="col-6">Status</div>
      <div className="col-3 text-primary"><Badge  text="" color="blue" /></div>
    </div>
  );
  const ProfileMenuItem = () => (
    <div className="row">
        <div className="col-3 d-flex justify-content-center"><i class="bi bi-person-circle"></i></div>
      <div className="col-6">My Profile</div>
      <div className="col-3"></div>
    </div>
  );
  const LogOutMenuItem = () => (
    <div className="row text-danger bg-danger bg-opacity-10">
        <div className="col-3 d-flex justify-content-center"><i class="bi bi-box-arrow-left"></i></div>
      <div className="col-6">Logout</div>
      <div className="col-3"></div>
    </div>
  );

const SideMenu = () => {
    
    const {setToken,Authuser} = useUserContext();
    const {messageRefresh,roomRefresh,inviteRefresh,closeConnection} =useHubContext();
    const [chats,setChats] = useState([]);
    const [roomChats, setRoomChats] = useState([]);
    const [invites, setInvites] = useState([]);
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
    const FetchRoomChats = async () =>{

        var result = await get(apiRoutes.roomChat);
        console.log(result);
        if(result.success)
        {
            setRoomChats(result.response)
        }
        else
        {
            console.log(result.errors);
            setChats([]);
        }
    }
    async function FetchInvites() {
        const result = await get(apiRoutes.invite);
       
        if(result.success)
        {
            setInvites(result.response);
        }
        else
        {
          console.log(result.errors);
        }
      }
      useEffect(()=>{
        if(roomRefresh)
        {
            FetchRoomChats();
        }
    },[roomRefresh])
    useEffect(()=>{
      if(inviteRefresh)
      {
          FetchInvites();
      }
  },[inviteRefresh])
    useEffect(()=>{
        if(messageRefresh)
        {
            FetchChats();
            FetchInvites();
            FetchRoomChats();
        }
    },[messageRefresh])
    useEffect(()=>{
      FetchChats();
      FetchInvites();
      FetchRoomChats();
    },[])
    const onMenuItemClicked = (menuItem) => {
        if(menuItem.key==="logout")
        {
            var res = post(apiRoutes.signOut);
            closeConnection();
            setToken(null);
            localStorage.removeItem('jwt');
            navigation('/',{replace:true})
            navigation(0);
            

        }else{
            navigation(menuItem.key)
        }
       
        
    };

    const navigation = useNavigate();

const menuItems = [
    {
        key:"chats",
        label:<ChatsMenuItem openedChats={chats.filter((C)=> C.unreadMessages > 0  && C.lastMessage.senderID!==Authuser.id).length}/>
    },
    {
        key:"rooms",
        label:<RoomsMenuItem openedChats={roomChats.filter((C)=> C.unreadMessages > 0 && C.lastMessage.senderID!==Authuser.id).length}/>
    },
    {
        key:"invites",
        label:<InvitesMenuItem newInvites={invites.length}/>
    },
    {
        key:"friends",
        label:<FriendsMenuItem/>
    },
    {
        key:"statuses",
        label:<StatusMenuItem/>
    },
    {
        key:"my-profile",
        label:<ProfileMenuItem/>
    },
    {
        key:"logout",
        label:<LogOutMenuItem/>
    }
];



return(
    
    <Menu items={menuItems} onClick={onMenuItemClicked} style={{fontSize:20}}/>
    
)
}
export default SideMenu;