import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap-icons/font/bootstrap-icons.css"
import default_image from '../Assets/Images/default_image.jpg'
import { useEffect, useState } from 'react'
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import MenuPopUp from './MenuPopup';
dayjs.extend(relativeTime);



const FriendListItem = ({friendship,user,Unfriend}) =>{
    const [display,setDisplay] = useState(default_image);
    const [trigger, setTrigger] = useState(false);
const [message, setMessage] = useState('');
    

useEffect(() => {
    if(user.image){
  setDisplay(user.image)
}}, []);

    return(<div className='col'>
        <div className='card pb-2'>
            <img src={display} className='card-img-top' alt='display'/>
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
                <button className='btn btn-primary' type='button' onClick={()=>{setTrigger(true)}}>Message</button>
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
                <button className='btn btn-primary btn-lg' disabled={message===''} type='button' onClick={()=>{}}>Send Message <i class="bi bi-send"></i></button>
              

            </div>
                  </div>
            </MenuPopUp>
        </div>
    )
}

export default FriendListItem;