import {Route,Routes} from "react-router-dom"
import {Layout,Image} from 'antd';
import SideMenu from './components/SideMenu'
import ChatList from "./modules/ChatList";
import RoomChatList from "./modules/RoomChatList";
import Xylem_Logo from "./Assets/Images/Xylem_Logo.jpg"
import Chat from "./modules/Chat";
import GroupChat from "./modules/GroupChat";
import NewGroupChat from "./modules/NewGroupChat";
import InviteList from "./modules/InviteList";
import UserList from "./modules/UserList";
import FriendList from "./modules/FriendList";

const {Sider,Content,Footer} = Layout;

const App = () => {
  return (
    <Layout>
        <Sider style={{height:"100vh", backgroundColor:"white",overflow:"auto",position:"sticky",top:0,left:0}} width={"20%"}>
          <Image src={Xylem_Logo} preview={false} />
          <SideMenu/>
        </Sider>
        <Layout>
          <Content >
           <Routes> 
            <Route path="chats" element={<ChatList/>}/> 
            <Route path="chats/chat/:id" element={<Chat />}/> 
            <Route path="rooms" element={<RoomChatList/>}/> 
            <Route path="rooms/room/:id" element={<GroupChat/>}/> 
            <Route path="rooms/new/:id" element={<NewGroupChat/>}/> 
            <Route path="invites" element={<InviteList/>}/>
             <Route path="userList" element={<UserList/>}/>  
            <Route path="friends" element={<FriendList/>}/>
             {/* <Route path="chats/new-chat" element={<FriendList/>}/>
            <Route path="statuses" element={<Statuses/>}/>  */}
         </Routes>  
          </Content>
          <Footer style={{textAlign:'center'}}>
            Xylem Messenger @2024 By Mihlali Mkile
          </Footer>
        </Layout>
    </Layout>
  // <Routes> 
  //   <Route path="" element={<Orders/>}/> 
  //   <Route path="order/:id" element={<DetailedOrder/>}/> 
  // </Routes>  
  );}

export default App;