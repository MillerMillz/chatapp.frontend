import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap-icons/font/bootstrap-icons.css"
import default_image from '../Assets/Images/default_image.jpg'
import { useEffect, useState } from 'react'
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {get,post} from '../apiCalls'
import apiRoutes from '../apiRoutes'
import MenuPopUp from './MenuPopup';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../Contexts/UserContext';
dayjs.extend(relativeTime);



const FriendListItem = ({friendship,user,Unfriend}) =>{
    const [display,setDisplay] = useState(default_image);
    const [trigger, setTrigger] = useState(false);
const [message, setMessage] = useState('');
const {Authuser} = useUserContext();
const navigate = useNavigate();

async function HandleClick() {

    const result = await get(apiRoutes.chat+'friend/'+user.id);
    console.log(result);
    if(result.success)
    {
        if(result.response==null)
        {
            setTrigger(true);
        }
        else{
            navigate(`/chats/chat/${result.response.id}`,{replace:true})
        }
    }
    else
    {
        console.log('fail from frnd lst itm')
    }
    
}
const sendMessage = async (mess) =>{
    const message = {
        senderId:Authuser.id,
        messageContent:mess,
        messageType:"text",
        viewed:false
    }
    const messageResult = await post(apiRoutes.message,{message:message,chat:{
        ownerId:Authuser.id,
        friendId:user.id,
        friendshipId:friendship.id
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

useEffect(() => {
    if(user.image){
  setDisplay(user.image)
}}, []);

    return(<div className='col'>
        <div className='card pb-2'>
            <img src={display} className='card-img-top' style={{width:"100%",height:250}} alt='display'/>
            <div className='card-body'>
                <h5 className='card-title'>{user.firstName} {user.lastName}</h5>
                <div className='row'>
                    <div className='col-3 d-flex justify-content-end'>
                    <p className='card-text'>Bio:</p>
                    </div>
                    <div className='col-9 d-flex justify-content-start'>
                    <p className='card-text limitedTextForBio'>{user.bio}</p>
                   </div>
               </div>
               <div className='row mt-2'>
                    <div className='col-3 d-flex justify-content-end'>
                    <p className='card-text'>Time:</p>
                    </div>
                    <div className='col-9  d-flex justify-content-start'>
                    <p className='card-text'>{dayjs(friendship.time).fromNow(true)}</p>
                   </div>
               </div>
            </div>
            <div className='d-flex justify-content-around'>
                <button className='btn btn-primary' type='button' onClick={()=>{HandleClick()}}>Message</button>
                <button className='btn btn-secondary' type='button' onClick={()=>{Unfriend(friendship.id)}}>Unfriend</button>

            </div>
            
        </div>
        <MenuPopUp trigger={trigger} setTrigger={setTrigger}>
                  <div className='container mt-5'>
                    <div className='row my-5'>
                        <div className='col-3 d-flex justify-content-end'>
                            <h2>To:</h2>
                        </div>
                        <div className='col-9 d-flex justify-content-start'>
                            <h2>{user.firstName} {user.lastName}</h2>
                        </div>
                    </div>
                    <div className='row my-1'>
                        <div className='col-12 d-flex justify-content-center'>
                        <img src={display} height={200} style={{borderRadius:'50%'}} alt='display'/>.
                           
                        </div>
                    </div>
                    <div className="my-3">
                        <label  className="form-label">Type your message</label>
                        <textarea className="form-control" onChange={(e)=>{setMessage(e.target.value)}}  rows="5"></textarea>
                        </div>
                        <div className='d-flex justify-content-around'>
                <button className='btn btn-primary btn-lg' disabled={message===''} type='button' onClick={()=>{sendMessage(message)}}>Send Message <i class="bi bi-send"></i></button>
              

            </div>
                  </div>
            </MenuPopUp>
        </div>
    )
}

export default FriendListItem;