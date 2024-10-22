import 'bootstrap/dist/css/bootstrap.min.css'
import default_image from '../Assets/Images/default_image.jpg'
import { useEffect, useState } from 'react'


const UserListItem = ({user,sendInvite}) =>{
    const [display,setDisplay] = useState(default_image);

    useEffect(()=>{
        if(user.image)
        {
            setDisplay(user.image)
        }
    },[])
    

    return(<div className='col'>
        <div className='card pb-2'>
            <img src={display} className='card-img-top' style={{width:"100%",height:250}} alt='display'/>
            <div className='card-body'>
                <h5 className='card-title'>{user.firstName} {user.lastName}</h5>
                <p className='card-text limitedTextForBio'>{user.bio} </p>
            </div>
            <div className='d-flex justify-content-around'>
                <button className='btn btn-primary' type='button' onClick={()=>sendInvite(user.id)}>Invite</button>
                

            </div>
            
        </div></div>
    )
}

export default UserListItem;