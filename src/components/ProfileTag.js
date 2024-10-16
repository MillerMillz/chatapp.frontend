import "bootstrap/dist/css/bootstrap.min.css"
import { useUserContext } from "../Contexts/UserContext";

const ProfileTag = () =>{

    const { Authuser } = useUserContext()

    return(
        <div className="fixed-bottom bg-secondary" style={{width:"20%"}}>
            <div className="row">
                <div className="col-3 p-1 d-flex align-items-center justify-content-center">
                    <img src={Authuser.image} width={60} height={60} style={{borderRadius:30}}></img>
                </div>
                <div className="col-9 d-flex align-items-center">
                    <h2>{Authuser.firstName} {Authuser.lastName}</h2>
                </div>
               
            </div>
        </div>
    )
}

export default ProfileTag;