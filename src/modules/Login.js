import {Form,Button} from "react-bootstrap";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import PopUp from "../components/Popup";
import { Image } from "antd";
import errorIcon from "../Assets/Images/errorIcon.png"
import { useUserContext } from "../Contexts/UserContext";

const Login = ({SignIn}) =>{

    
    const navigate = useNavigate();
    const {trigger,setTrigger} = useUserContext();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [capture,setCapture] = useState();
    return <div>
   { <Form className="Login" 
    onSubmit={e=>{
        e.preventDefault();
        SignIn(email,password);
       
    }} >
                <Form.Group>
                    <Form.Control placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}} />
                    <hr style={{color:"#66d9ff"}}/>
                    <Form.Control placeholder="Password" type="password" onChange={(e)=>{setPassword(e.target.value)}} />
                    <hr style={{color:"#66d9ff"}}/>
                </Form.Group>
                <Button variant="success" style={{width:"50%"}} type="submit" disabled={!email || !password}>Login</Button>
                
                <Button variant="primary" style={{width:"50%"}} onClick={()=>{navigate('Register')}} >Register</Button>
            </Form>}
            <PopUp trigger={trigger} setTrigger={setTrigger}>
                <div style={{width:'65%',float:"left"}}>
                    <h3>Alert</h3>
                     <p style={{position:"relative",padding:"10%",fontWeight:'bold',fontSize:25}}> Invalid Login Attempt</p>
                </div>
                <div style={{width:"35%",float:"right"}}>
                    <Image src={errorIcon} preview={false}></Image>
                </div>

            </PopUp></div>
        
    }

    export default Login;