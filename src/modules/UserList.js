import 'bootstrap/dist/css/bootstrap.min.css'
import { get,post,Delete } from "../apiCalls";
import apiRoutes from "../apiRoutes";
import { useEffect, useState } from "react";
import { useHubContext } from "../Contexts/HubContext";
import SentInviteListItem from '../components/SentInviteListItem/SentInviteListItem';
import "bootstrap-icons/font/bootstrap-icons.css"
import MenuPopUp from '../components/MenuPopup';
import { MDBInputGroup, MDBIcon, MDBBtn,MDBInput } from 'mdb-react-ui-kit';
import UserListItem from '../components/UserListItem';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../Contexts/UserContext';

const UserList = () =>{
   
    const [trigger, setTrigger] = useState(false);
    const [userListFilter, setUserListFilter] = useState('');
    const [sentInvitesFilter, setSentInvitesFilter] = useState('');
    const [sentInvites, setSentInvites] = useState([]);
    const [userList, setUserList] = useState();
    const navigate = useNavigate();
    const {inviteRefresh,usersRefresh} = useHubContext()
    const {Authuser} = useUserContext();

async function FetchUsers() {
  const result = await get(apiRoutes.users);
  if(result.success)
  {
      setUserList(result.response);
  }
  else
  {
    console.log(result.errors);
  }
}

async function FetchSentInvites() 
{
  const result = await get(apiRoutes.invite+'sentInvites');
  if(result.success)
  {
      setSentInvites(result.response);
  }
  else
  {
    console.log(result.errors);
  }
  
}
const DeclineInvite = async (id) =>{
  const result = await Delete(apiRoutes.invite+id)
  if(result.success)
    {
        FetchUsers();
        FetchSentInvites();
    }
    else
    {
      console.log(result.errors);
    }
}
const sendInvite = async (id) =>{
  const result =await post(apiRoutes.invite,{senderId:Authuser.id,reciepientID:id})
  console.log(result)
  if(result.success)
  {
    FetchUsers();
    FetchSentInvites();
  }
  else
  {
    console.log('not sent')
  }

}

useEffect(() => {

  FetchUsers();
FetchSentInvites();
}, [usersRefresh,inviteRefresh]);
useEffect(() => {

  FetchUsers();
FetchSentInvites();
}, []);
   
    return(<div>
        <div className="row sticky-top bg-secondary m-4 py-2 "> 
        <div className="col-12 d-flex align-items-center justify-content-center">
        <MDBInputGroup style={{width:250}}>
      <MDBInput onChange={(e)=>{setUserListFilter(e.target.value)}} label='Search for new friends' />
        <MDBBtn onClick={() => console.log("awesome")} rippleColor='dark'>
          <MDBIcon icon='search' />
        </MDBBtn>
      </MDBInputGroup>
        <h1 className='mx-auto'>Friend suggestions</h1>
        <a className="text-primary me-1" onClick={()=>{navigate('/invites',{replace:true})}} style={{fontWeight:'bold',fontSize:17}}>my invites <i class="bi bi-person-fill-add"></i></a>

        <a className="text-primary" onClick={()=>{setTrigger(true)}} style={{fontWeight:'bold',fontSize:17}}> sent invites <i class="bi bi-person-fill-add"></i></a>
    </div>
    </div>
       <div className="container">
  <div className="row row-cols-2 row-cols-lg-3 row-cols-xl-5 g-2 g-lg-3">
   {userList?
       userList.length>0? userList.filter((item)=>{
        return userListFilter.toLowerCase() ==='' ? item: item.firstName.toLowerCase().includes(userListFilter)||item.lastName.toLowerCase().includes(userListFilter)
    }).map((item)=><UserListItem key={item.id} sendInvite={sendInvite} user={item}/>) :  <p style={{backgroundColor:"pink",textAlign:"center"}}>You have not sent any invite</p>:
       <div className="text-center">
     <div className="spinner-border" role="status">
         <span className="visually-hidden">Loading...</span>
     </div>
 </div>}
  </div>
</div>
<MenuPopUp trigger={trigger} setTrigger={setTrigger} >

      
      {/* <hr style={{color:"#66d9ff"}}/> 
      <div style={{width:"100%",maxHeight:"55vh",overflowY:'scroll'}}>
        {
            userList.filter((item)=>{
                return userListFilter.toLowerCase() ==='' ? item: item.name.toLowerCase().includes(userListFilter)
            }).map((item)=><RoomListItem key={item.id} buttonContent={{variant:"primary",text:"Chat"}} chatRoom={item}/>)
        }
        </div>  */}
     <div className='mt-3'>
      
      <MDBInputGroup>
      <MDBInput onChange={(e)=>{setSentInvitesFilter(e.target.value)}} label='Search for invited users..' />
        <MDBBtn onClick={() => console.log("awesome")} rippleColor='dark'>
          <MDBIcon icon='search' />
        </MDBBtn>
      </MDBInputGroup>
      <hr style={{color:"#66d9ff"}}/> 
      <div style={{width:"100%",maxHeight:"55vh",overflowY:'scroll'}}>
        
             {sentInvites?
              sentInvites.filter((item)=>{
                  return sentInvitesFilter.toLowerCase() ==='' ? item: item.name.toLowerCase().includes(sentInvitesFilter)
              }).map((item)=><SentInviteListItem key={item.id}  DeclineInvite={DeclineInvite}  invite={item.invite} user={item.user}/>):
              <p style={{backgroundColor:"pink",textAlign:"center"}}>You have not sent any invite</p>
          }
        
        </div>
        </div>
    
</MenuPopUp>
    </div>)
}

export default UserList;