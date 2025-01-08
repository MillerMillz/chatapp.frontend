import 'bootstrap/dist/css/bootstrap.min.css'
import { Delete, get,post,put } from "../apiCalls";
import MenuPopUp from '../components/MenuPopup';
import { useNavigate } from 'react-router-dom';
import apiRoutes from "../apiRoutes";
import { useEffect, useState } from "react";
import { useHubContext } from "../Contexts/HubContext";
import "bootstrap-icons/font/bootstrap-icons.css"
import { MDBInputGroup, MDBIcon, MDBBtn,MDBInput } from 'mdb-react-ui-kit';
import { useUserContext } from '../Contexts/UserContext';
import FriendListItem from '../components/FriendListItem';

const FriendList = () =>{

  const navigate = useNavigate();
  const {Authuser} = useUserContext();
const [userId, setUserId] = useState();
const [friendshipId, setFriendshipId] = useState();
const [message, setMessage] = useState('');
const [trigger, setTrigger] = useState(false);
const [name, setName] = useState('');
const [lastName, setLastName] = useState('');
const [displayPicture,setDisplayPicture] = useState();
    const [userListFilter, setUserListFilter] = useState('');
    const [userList, setUserList] = useState();
    const {friendshipRefresh} = useHubContext();

    const sendMessage = async (mess) =>{
      const message = {
          senderId:Authuser.id,
          messageContent:mess,
          messageType:"text",
          viewed:false
      }
      const messageResult = await post(apiRoutes.message,{message:message,chat:{
          ownerId:Authuser.id,
          friendId:userId,
          friendshipId:friendshipId
      }});
      if(messageResult.success)
      {
         navigate('/chats',{replace:true})
          
      }
      else
      {
          console.log(messageResult.errors)
      }
      
  }
async function FetchUsers() {
  const result = await get(apiRoutes.friendship);
  if(result.success)
  {
      setUserList(result.response);
      console.log(result.response);
  }
  else
  {
    console.log(result.errors);
  }
}

function TriggerMenu(firstN,lastN,DP,userId,fShipId) {


  setDisplayPicture(DP);
  setName(firstN);
  setLastName(lastN);
  setUserId(userId);
  setFriendshipId(fShipId);
  setTrigger(true);
}

const Unfriend = async (id) =>{
  const result =await Delete(apiRoutes.friendship+id)
  if(result.success)
  {
    FetchUsers();
  }
  else
  {
    console.log('not sent')
  }

}

useEffect(() => {

  FetchUsers();
}, [friendshipRefresh]);
useEffect(() => {

  FetchUsers();
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
        <h1 className='mx-auto'>Friends</h1>
       
    </div>
    </div>
       <div className="container">
  <div className="row row-cols-2 row-cols-lg-3 row-cols-xl-5 g-2 g-lg-3">
   {userList?
       userList.length>0? userList.filter((item)=>{
        return userListFilter.toLowerCase() ==='' ? item: item.firstName.toLowerCase().includes(userListFilter)||item.lastName.toLowerCase().includes(userListFilter)
    }).map((item)=><FriendListItem key={item.id} TriggerMenu={TriggerMenu} Unfriend={Unfriend} user={item.user} friendship={item.friendship}/>) :  <p style={{backgroundColor:"pink",textAlign:"center"}}>You have not sent any invite</p>:
       <div className="text-center">
     <div className="spinner-border" role="status">
         <span className="visually-hidden">Loading...</span>
     </div>
 </div>}
  </div>
</div>
<MenuPopUp trigger={trigger} setTrigger={setTrigger}>
<div style={{width:"100%",height:"calc(100vh - 250px)",marginTop:10,maxHeight:"66vh",overflowY:'scroll'}}>
                  <div className='container mt-5'>
                    <div className='row my-5'>
                        <div className='col-3 d-flex justify-content-end'>
                            <h2>To:</h2>
                        </div>
                        <div className='col-9 d-flex justify-content-start'>
                            <h2>{name} {lastName}</h2>
                        </div>
                    </div>
                    <div className='row my-1'>
                        <div className='col-12 d-flex justify-content-center'>
                        <img src={displayPicture} height={200} style={{borderRadius:'50%'}} alt='display'/>.
                           
                        </div>
                    </div>
                    <div className="my-3">
                        <label  className="form-label">Type your message</label>
                        <textarea className="form-control" onChange={(e)=>{setMessage(e.target.value)}}  rows="5"></textarea>
                        </div>
                        <div className='d-flex justify-content-around'>
                <button className='btn btn-primary btn-lg' disabled={message===''} type='button' onClick={()=>{sendMessage(message)}}>Send Message <i class="bi bi-send"></i></button>
              

            </div>
                  </div></div>
            </MenuPopUp>
    </div>)
}

export default FriendList;