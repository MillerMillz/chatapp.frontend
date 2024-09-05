import 'bootstrap/dist/css/bootstrap.min.css'
import { Delete, get,post,put } from "../apiCalls";
import apiRoutes from "../apiRoutes";
import { useEffect, useState } from "react";
import SentInviteListItem from '../components/SentInviteListItem/SentInviteListItem';
import InviteItem from '../components/InviteItem';
import "bootstrap-icons/font/bootstrap-icons.css"
import MenuPopUp from '../components/MenuPopup';
import { useNavigate } from 'react-router-dom';
import { MDBInputGroup, MDBIcon, MDBBtn,MDBInput } from 'mdb-react-ui-kit';
import { useHubContext } from '../Contexts/HubContext';

const InviteList = () =>{
    const [trigger, setTrigger] = useState(false);
    const navigate = useNavigate();
    const [sentInvitesFilter, setSentInvitesFilter] = useState('');
    const [sentInvites, setSentInvites] = useState([]);
    const [invites, setInvites] = useState();
    const {inviteRefresh} = useHubContext();

 

  async function FetchInvites() {
    const result = await get(apiRoutes.invite);
   
    if(result.success)
    {
        setInvites(result.response);
         console.log('invites-inside')
          console.log(invites);
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
          FetchInvites();
          FetchSentInvites();
      }
      else
      {
        console.log(result.errors);
      }
}
const AcceptInvite = async (invite) =>{
     const result = await post(apiRoutes.friendship+invite.id,{user1ID:invite.senderId,user2ID:invite.reciepientID,status:'Active'})
     if(result.success)
      {
        FetchInvites();
        FetchSentInvites();
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
  useEffect(() => {
 
    FetchInvites();
    FetchSentInvites();
  }, [inviteRefresh]);
useEffect(() => {
 
  FetchInvites();
  FetchSentInvites();
}, []);
   
    return(<div>
        <div className="row sticky-top bg-secondary m-4 py-2 "> 
        <div className="col-12 d-flex align-items-center justify-content-center">
        <h1 className='mx-auto'>Invites</h1>
        <a className="text-primary me-1" onClick={()=>{navigate('/userList',{replace:true})}} style={{fontWeight:'bold',fontSize:17}}> invite friends <i class="bi bi-person-fill-add"></i></a>

        <a className="text-primary" onClick={()=>{setTrigger(true)}} style={{fontWeight:'bold',fontSize:17}}> sent invites <i class="bi bi-person-fill-add"></i></a>
    </div>
    </div>
       <div className="container">
  <div className="row row-cols-2 row-cols-lg-3 row-cols-xl-5 g-2 g-lg-3">
   {invites? 
     (invites.length>0? invites.map((item)=><InviteItem key={item.invite.id} AcceptInvite={AcceptInvite} DeclineInvite={DeclineInvite} invite={item.invite} user={item.user}/>): <p style={{backgroundColor:"pink",textAlign:"center"}}>You have no invites</p>)
     :<div className="text-center">
     <div className="spinner-border" role="status">
         <span className="visually-hidden">Loading...</span>
     </div>
 </div>
    }
  </div>
</div>
<MenuPopUp trigger={trigger} setTrigger={setTrigger} >

   {/*    <MDBInputGroup>
      <MDBInput onChange={(e)=>{userListFilter(e.target.value)}} label='Search for an existing chat room' />
        <MDBBtn onClick={() => console.log("awesome")} rippleColor='dark'>
          <MDBIcon icon='search' />
        </MDBBtn>
      </MDBInputGroup>
      <hr style={{color:"#66d9ff"}}/> 
      <div style={{width:"100%",maxHeight:"55vh",overflowY:'scroll'}}>
        {
            userList.filter((item)=>{
                return userListFilter.toLowerCase() ==='' ? item: item.name.toLowerCase().includes(userListFilter)
            }).map((item)=><RoomListItem key={item.id} buttonContent={{variant:"primary",text:"Chat"}} chatRoom={item}/>)
        }
        </div> */}
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
            }).map((item)=><SentInviteListItem key={item.id} DeclineInvite={DeclineInvite}  invite={item.invite} user={item.user}/>):
            <p style={{backgroundColor:"pink",textAlign:"center"}}>You have not sent any invite</p>
        }
        </div></div>
    
</MenuPopUp>
    </div>)
}

export default InviteList;