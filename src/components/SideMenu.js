import { Badge, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { post } from "../apiCalls";
import apiRoutes from "../apiRoutes";
import { useUserContext } from "../Contexts/UserContext";

const ChatsMenuItem = ({ openedChats }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
      <span>Chats</span>
      <Badge count={openedChats} overflowCount={99} color="blue" />
    </div>
  );

const SideMenu = () => {
    
    const {setToken} = useUserContext();

    const onMenuItemClicked = (menuItem) => {
        if(menuItem.key==="logout")
        {
            var res = post(apiRoutes.signOut);
            console.log(res);
            setToken(null);
            localStorage.removeItem('jwt');
            navigation(0);
            navigation('/',{replace:true})

        }else{
            navigation(menuItem.key)
        }
       
        
    };

    const navigation = useNavigate();

const menuItems = [
    {
        key:"chats",
        label:<ChatsMenuItem openedChats={5}/>
    },
    {
        key:"rooms",
        label:"Rooms"
    },
    {
        key:"invites",
        label:"Invites"
    },
    {
        key:"friends",
        label:"Friends"
    },
    {
        key:"statuses",
        label:"Statuses"
    },
    {
        key:"my-profile",
        label:"My Profile"
    },
    {
        key:"logout",
        label:"Logout"
    }
];



return(
    
    <Menu items={menuItems} onClick={onMenuItemClicked} style={{fontSize:20}}/>
    
)
}
export default SideMenu;