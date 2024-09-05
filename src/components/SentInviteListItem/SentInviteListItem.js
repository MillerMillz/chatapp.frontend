import {Image} from "antd"
import default_image from "../../Assets/Images/default_image.jpg"
import styles from"./style.module.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Delete } from "../../apiCalls";
import apiRoutes from "../../apiRoutes";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const SentInviteListItem = ({invite,user,DeclineInvite}) =>
{
const [display,setDisplay] = useState(default_image);
const handleClick = async () =>{

    DeclineInvite(invite.id);
    
}
    useEffect(()=>{
if(user?.image)
{
    setDisplay(user?.image);
}
    },[])

    return (<div className="row p-1 border border-4 rounded-3 border-info m-2" onClick={()=>{console.log('sup')}}>
        <div className="col-2 d-flex align-items-center justify-content-center">
        <Image src={display} preview={false} style={{borderRadius:"50%"}} width={"100%"} height={'auto'} /></div>
        <div className='col-8'>
            <div className={styles.row}>
                <p style={{fontSize:25,width:'80%',fontWeight:"bold"}}>{user?.firstName} {user?.lastName}</p>
                
            </div>
            <div className={styles.subTitle} >{dayjs(invite.time).fromNow(true)}</div>
        </div>
        <div className="col-2 d-flex align-items-center justify-content-center"> 
            <Button variant='danger' onClick={()=>{handleClick()}} >Cancel Invite</Button>
            </div>
    </div>)
}


export default SentInviteListItem;