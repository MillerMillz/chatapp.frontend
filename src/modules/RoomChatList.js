import { Card } from "antd";
import { Form,Button,Image } from "react-bootstrap"
import RoomChatListItem from "../components/RoomChatListItem/RoomChatListItem";
import { useState,useEffect } from "react";
import { useHubContext } from "../Contexts/HubContext";
import { get } from "../apiCalls";
import "bootstrap/dist/css/bootstrap.min.css"
import apiRoutes from "../apiRoutes";
import MenuPopUp from "../components/MenuPopup";
import defaultDP from "../Assets/Images/default_image.jpg"
import Tabs from "react-bootstrap/Tabs";
import  Tab  from "react-bootstrap/Tab";
import { MDBInputGroup, MDBIcon, MDBBtn,MDBInput } from 'mdb-react-ui-kit';
import axios from "axios";
import { useUserContext } from "../Contexts/UserContext";
import RoomListItem from "../components/RoomListItem/RoomListItem";
import { useNavigate } from "react-router-dom";



const RoomChatList = () => {
    const [joinedRooms,setJoinedRooms] = useState([]);
    const navigate = useNavigate();
    const [rooms,setRooms] = useState([]);
    const [chats,setChats] = useState();
    const [roomFilter,setRoomFilter] = useState('');
    const [joinedRoomFilter,seJoinedtRoomFilter] = useState('');
    const [trigger,setTrigger] = useState(false);
    const [profilePicture,setProfilePicture] = useState(defaultDP);
    const [file,setFile] = useState(null);
    const [name,setName] = useState();
    const [nameError,setNameError] = useState();
    const [bio,setBio] = useState("");
    const {Authuser} = useUserContext();
    const {messageRefresh,roomRefresh} =useHubContext();
    const FetchChats = async () =>{

        var result = await get(apiRoutes.roomChat);
        console.log(result);
        if(result.success)
        {
            setChats(result.response)
        }
        else
        {
            console.log(result.errors);
            setChats([]);
        }
    }

       const submitForm = async () =>
    {
      
        if(!name)
        {
            setNameError("Group name required...");
            return;
        }
        const myform = new FormData();
       
        myform.append("name",name);
        
        myform.append("bio",bio);
        myform.append("adminId",Authuser.id);
        myform.append("image",file);
        console.log(myform.values);

        try{
         const res = await axios.postForm(apiRoutes.chatRoom,myform,{headers:{
            Authorization:`Bearer ${localStorage.getItem('jwt')}`
         }});
        if(res.data.success){
            navigate(`new/${res.data.response.id}`)
        }
        }
        catch(error)
        {
            console.log("error-> ",error);
        }

    }
    const UploadImage = (e) =>{
       const reader = new FileReader();
        reader.onload = x =>{
            setProfilePicture(x.target.result);
        }
        reader.readAsDataURL(e.target.files[0])
        setFile(e.target.files[0]); 
     
    }
    const fetchAllRooms= async()=>{
        var result = await get(apiRoutes.chatRoom);
        if(result.success)
        {
           
            setRooms(result.response);
            console.log(result.response)
        }
        else
        {console.log(result.errors)}
    }
    const fetchJoinedRooms = async () => {
        var result = await get(apiRoutes.chatRoom+"Joined");
        if(result.success)
        {
            setJoinedRooms(result.response)
        }
        else
        {
            console.log(result.errors)
        }
    }
    useEffect(()=>{
        if(messageRefresh)
        {
      FetchChats();
            }
        },[messageRefresh])
    useEffect(()=>{
        if(roomRefresh)
        {
            
            fetchAllRooms();
            fetchJoinedRooms();
        }
    },[roomRefresh])
    useEffect(()=>{
        FetchChats();
        fetchAllRooms();
        fetchJoinedRooms();
    },[])


   

    return(
   <div>
        <Card>
        <div className="row sticky-top bg-secondary m-4 py-2 "> 
        <div className="col-12 d-flex align-items-center justify-content-center">
        <h1 className='mx-auto'>Rooms</h1>
        <a className="text-primary" onClick={()=>setTrigger(true)} style={{fontWeight:'bold',fontSize:17}}> Room Options  <i class="bi bi-grid-3x3-gap-fill"></i></a>
    </div>
    </div>
   
    {!chats? <div className="text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>:
    <div style={{width:"100%"}}>
        {chats.length>0 ?
        
            chats.map((item)=><RoomChatListItem key={item.id} roomChat={item}/>) : <p style={{backgroundColor:"pink",textAlign:"center"}}>You have not joined any rooms</p>
        }
        </div>}</Card>
         <MenuPopUp trigger={trigger} setTrigger={setTrigger}>
            <Tabs defaultActiveKey="joinRoom"
            id="myTabs"
            className="mb-3">
                <Tab eventKey="newRoom" title="New Room">
                <div style={{width:"100%"}}>
            
                 <Form.Group>
                    <p color="red">{nameError}</p>
                    <Form.Control placeholder="Room Name" required onChange={(e)=>{setName(e.target.value)}} />
                    <hr style={{color:"#66d9ff"}}/>
                    <p color="red"></p>
                    <Form.Control placeholder="More about the room..." as="textarea" rows={3} onChange={(e)=>{setBio(e.target.value)}} />
                    <hr style={{color:"#66d9ff"}}/>
                    <Form.Control type="file" onChange={UploadImage} placeholder="Group profile photo.."  />
                    <hr style={{color:"#66d9ff"}}/> 
                    <div style={{width:"100%",textAlign:"center" }}>
                   <Image src={profilePicture}  style={{ height:"200px",borderRadius:"50%"}}/></div>
                </Form.Group>
            </div>
           
          
              <div style={{width:"100%",textAlign:"center"}}>
                    
              <Button variant="primary" onClick={()=>{submitForm()}} style={{width:"50%"}} >Create Room</Button>
             
        </div>
      </Tab>
      <Tab eventKey="joinRoom" title="Join a Room">
      <MDBInputGroup>
      <MDBInput onChange={(e)=>{setRoomFilter(e.target.value)}} label='Search for an existing chat room' />
        <MDBBtn onClick={() => console.log("awesome")} rippleColor='dark'>
          <MDBIcon icon='search' />
        </MDBBtn>
      </MDBInputGroup>
      <hr style={{color:"#66d9ff"}}/> 
      <div style={{width:"100%",maxHeight:"55vh",overflowY:'scroll'}}>
        {
            rooms.filter(item=> !joinedRooms.some(e => e.id===item.id)).filter((item)=>{
                return roomFilter.toLowerCase() ==='' ? item: item.name.toLowerCase().includes(roomFilter)
            }).map((item)=><RoomListItem key={item.id} buttonContent={{variant:"success",text:"Join"}} chatRoom={item}/>)
        }
        </div>
     
      </Tab>
      <Tab eventKey="myRooms" title="My Rooms" >
      <MDBInputGroup>
      <MDBInput onChange={(e)=>{seJoinedtRoomFilter(e.target.value)}} label='Search for an existing chat room' />
        <MDBBtn onClick={() => console.log("awesome")} rippleColor='dark'>
          <MDBIcon icon='search' />
        </MDBBtn>
      </MDBInputGroup>
      <hr style={{color:"#66d9ff"}}/> 
      <div style={{width:"100%",maxHeight:"55vh",overflowY:'scroll'}}>
        {
            joinedRooms.filter((item)=>{
                return joinedRoomFilter.toLowerCase() ==='' ? item: item.name.toLowerCase().includes(joinedRoomFilter)
            }).map((item)=><RoomListItem key={item.id} buttonContent={{variant:"primary",text:"Chat"}} chatRoom={item}/>)
        }
        </div>
      </Tab>
            </Tabs>

        </MenuPopUp>
        </div>)
    
}
export default RoomChatList;