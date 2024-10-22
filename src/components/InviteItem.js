import 'bootstrap/dist/css/bootstrap.min.css'
import default_image from '../Assets/Images/default_image.jpg'
import { useEffect, useState } from 'react'
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);



const InviteItem = ({invite,user,AcceptInvite,DeclineInvite}) =>{
    const [display,setDisplay] = useState(default_image);
    

useEffect(() => {
    if(user.image){
  setDisplay(user.image)}
}, []);

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
                    <p className='card-text'>{dayjs(invite.time).fromNow(true)}</p>
                   </div>
               </div>
            </div>
            <div className='d-flex justify-content-around'>
                <button className='btn btn-primary' type='button' onClick={()=>AcceptInvite(invite)}>Accept</button>
                <button className='btn btn-secondary' type='button' onClick={()=>DeclineInvite(invite.id)}>Decline</button>

            </div>
            
        </div></div>
    )
}

export default InviteItem;