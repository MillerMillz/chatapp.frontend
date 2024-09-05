import {Image} from "antd"
import default_image from "../../Assets/Images/default_image.jpg"
import styles from"./style.module.css"
import "bootstrap/dist/css/bootstrap.min.css"
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { post } from "../../apiCalls";
import apiRoutes from "../../apiRoutes";
import { useUserContext } from "../../Contexts/UserContext";
import { useHubContext } from "../../Contexts/HubContext";
dayjs.extend(relativeTime);

const RoomListItem = ({chatRoom,buttonContent}) =>
{
    const {Authuser} = useUserContext();
    const {JoinRoom} = useHubContext();
const [display,setDisplay] = useState(default_image);
const navigate = useNavigate();
const handleClick = async () =>{
    if(buttonContent.text==="Join")
    {
        var result = await post(apiRoutes.membership,{roomId:chatRoom.id,userId:Authuser.id})
        if(result.success)
        {
            JoinRoom(chatRoom.name);
            navigate(`new/${chatRoom.id}`)
        }
    }
    else
    {
        navigate(`new/${chatRoom.id}`)
    }
}
    useEffect(()=>{
if(chatRoom?.image)
{
    setDisplay(chatRoom?.image);
}
    },[])

    return (<div className="row p-1 border border-4 rounded-3 border-info m-2" onClick={()=>{console.log(chatRoom?.name)}}>
        <div className="col-2 d-flex align-items-center justify-content-center">
        <Image src={display} preview={false} style={{borderRadius:"50%"}} width={"100%"} height={'auto'} /></div>
        <div className='col-8'>
            <div className={styles.row}>
                <p style={{fontSize:25,width:'80%',fontWeight:"bold"}}>{chatRoom?.name}</p>
                
            </div>
            <div className={styles.subTitle} >{chatRoom?.bio}</div>
        </div>
        <div className="col-2 d-flex align-items-center justify-content-center"> 
            <Button variant={buttonContent.variant} onClick={()=>{handleClick()}} >{buttonContent.text}</Button>
            </div>
    </div>)
}


export default RoomListItem;