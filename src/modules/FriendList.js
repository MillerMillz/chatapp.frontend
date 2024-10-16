import 'bootstrap/dist/css/bootstrap.min.css'
import { Delete, get,post,put } from "../apiCalls";
import apiRoutes from "../apiRoutes";
import { useEffect, useState } from "react";
import { useHubContext } from "../Contexts/HubContext";
import "bootstrap-icons/font/bootstrap-icons.css"
import { MDBInputGroup, MDBIcon, MDBBtn,MDBInput } from 'mdb-react-ui-kit';
import { useUserContext } from '../Contexts/UserContext';
import FriendListItem from '../components/FriendListItem';

const FriendList = () =>{
   
    const [userListFilter, setUserListFilter] = useState('');
    const [userList, setUserList] = useState();
    const {friendshipRefresh} = useHubContext();

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
    }).map((item)=><FriendListItem key={item.id} Unfriend={Unfriend} user={item.user} friendship={item.friendship}/>) :  <p style={{backgroundColor:"pink",textAlign:"center"}}>You have not sent any invite</p>:
       <div className="text-center">
     <div className="spinner-border" role="status">
         <span className="visually-hidden">Loading...</span>
     </div>
 </div>}
  </div>
</div>

    </div>)
}

export default FriendList;