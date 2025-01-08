import { useState } from "react"
import { Form,Button,Image } from "react-bootstrap"
import defaultDP from "../Assets/Images/default_image.jpg"
import { useNavigate } from "react-router-dom"
import { submit } from "../apiCalls"
import apiRoutes from "../apiRoutes"
import axios from "axios"
import { Input } from "antd"
import PopUp from "../components/Popup"

const Register = () =>{
    const navigate = useNavigate();
    const [profilePicture,setProfilePicture] = useState(defaultDP);
    const [file,setFile] = useState();
    const [email,setEmail] = useState();
    const [emailError,setEmailError] = useState();
    const [password,setPassword] = useState();
    const [passwordError,setPasswordError] = useState();
    const [name,setName] = useState();
    const [nameError,setNameError] = useState();
    const [surname,setSurname] = useState(); 
    const [surnameError,setSurnameError] = useState(); 
    const [bio,setBio] = useState();
    const [cell,setCell] = useState();
    const [cellError,setCellError] = useState();
    const [ConfirmPassword,setConfirmPassword] = useState();
const [title, setTitle] = useState();
const [popUpMessage, setPopUpMessage] = useState();
const [iconClass, setIconClass] = useState();
const [trigger, setTrigger] = useState();
const [isRegisterd, setIsRegisterd] = useState(false);
const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const phoneRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

    const handlePopUpClosure =() =>{
        if(isRegisterd)
        {
            setName(null);
            setSurname(null);
            setEmail(null);
            setCell(null);
            setPassword(null);
            setConfirmPassword(null);
            setBio(null);
            setProfilePicture(defaultDP);
            setIsRegisterd(false);
            navigate('/');
        }
        else{
            setTrigger(false)
        }
    }

    const submitForm = async () =>
    { 
        const validateEmail = (email) => emailRegex.test(email);
        const validatePhone = (phone) => phoneRegex.test(phone);
        setNameError(null);
        setSurnameError(null);
        setCellError(null);
        setEmailError(null)
        setPasswordError(null);
        console.log(validateEmail(email));
        if(!validateEmail(email))
        {
            
            setEmailError("Invalid email format")
        }
        if(!validatePhone(cell))
            {
                setCellError("Invalid Number format")
            }
    

        if(!name)
            {
                setNameError("Name field required");
            }
        if(!surname)
            {
                setSurnameError("Surname field required");
            }   
            if(!email)
                {
                    setEmailError("Email field required");
                }     
        if(!password || !ConfirmPassword)
        {
            setPasswordError("Both Password fields are required")
        }
      
        if(password!==ConfirmPassword)
        {
            setPasswordError("Passwords do not match")
        }
        if(nameError!==null || surnameError!==null || emailError!==null || passwordError!==null)
        {
            setPopUpMessage("User not registerd a validation error occured");
            setTitle("Alert")
            setIconClass("bi bi-exclamation-triangle text-danger");
            setTrigger(true);
            return;
        }
       
        const myform = new FormData();
        console.log(email);
        myform.append("email",email);
        myform.append("firstName",name);
        myform.append("lastName",surname);
        myform.append("bio",bio);
        myform.append("phoneNumber",cell);
        myform.append("password",password);
        myform.append("file",file);
        console.log(myform.values);

        try{
         const res = await axios.postForm(apiRoutes.register,myform);
         console.log(res);
         if(res.data.success)
         {
            setPopUpMessage("Successfully Registered");
            setTitle("Success")
            setIconClass("bi bi-check2-circle text-success");
            setTrigger(true);
         }
         else{
            setEmailError(res.data.errors[0]);
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

    return(
        <div style={{width:"100%"}}>
            <div className="row">
            <div className="col-12 d-flex justify-content-center mb-4"><h2>Register</h2></div>
        </div>
          
                 <Form.Group>
                    <div className="row">
                        <div className="col-6"><p className="text-danger">{nameError}</p></div>
                        <div className="col-6"><p className="text-danger">{surnameError}</p></div>
                       
                    </div>
                    <div className="row">
                        <div className="col-6"><Form.Control placeholder="Name"  onChange={(e)=>{setName(e.target.value)}} /></div>
                        <div className="col-6"> <Form.Control placeholder="Surname"  onChange={(e)=>{setSurname(e.target.value)}} /></div>
                       
                    </div> <hr style={{color:"#66d9ff"}}/>
                    <div className="row">
                        <div className="col-6"><p className="text-danger">{emailError}</p></div>
                        <div className="col-6"> <p className="text-danger">{cellError}</p></div>
                    </div>  <div className="row">
                        <div className="col-6"> <Form.Control placeholder="Email" type="email"  onChange={(e)=>{setEmail(e.target.value)}} /></div>
                        <div className="col-6"> <Form.Control placeholder="Cell Number"    onChange={(e)=>{setCell(e.target.value)}} /></div>
                        
                    </div><hr style={{color:"#66d9ff"}}/>  
                    <div className="row">
                        <div className="col-12"><p className="text-danger">{passwordError}</p></div>
                       
                    </div>  <div className="row">
                        <div className="col-6"> 
                    <Form.Control placeholder="Password" style={{marginBottom:8}} type="password" rows={3} onChange={(e)=>{setPassword(e.target.value)}} /></div>
                        <div className="col-6"> <Form.Control placeholder="Confirm Password" type="password" onChange={(e)=>{setConfirmPassword(e.target.value)}} /></div>
                        
                    </div><hr style={{color:"#66d9ff"}}/>
                    <div className="row">
                        <div className="col-12"><Form.Control placeholder="Bio" as="textarea" rows={3} onChange={(e)=>{setBio(e.target.value)}} /></div>
                        <hr style={{color:"#66d9ff"}}/>
                        
                    </div>
                    <div className="row">
                        <div className="col-12 d-flex justify-content-center"> <Image src={profilePicture}  style={{ height:"200px",borderRadius:"50%"}}/></div>
                       
                    </div>
                    <div className="row">
                        <div className="col-12"> <Form.Control type="file" onChange={UploadImage}  /></div>
                        <hr style={{color:"#66d9ff"}}/>
                    </div>
                    <div className="row">
                        <div className="col-6"><Button variant="success" onClick={()=>{submitForm()}} style={{width:"100%"}} >Register</Button></div>
                        <div className="col-6"><Button variant="primary" style={{width:"100%"}} onClick={()=>{navigate('/')}} >Back to Login</Button></div>
                    </div>

                    
                    
                    
                    
                   
                    
                  
                    
                </Form.Group>
           
         
              <PopUp trigger={trigger} setTrigger={setTrigger}>
                <div className="row">
                <div className="col-8">
                    <h1 className="fw-bold">{title}</h1>
                     <p style={{position:"relative",paddingTop:"16%",paddingRight:"10%",fontWeight:'bold',fontSize:19}}>{popUpMessage} !</p>
                    
                </div>
                <div className="col-4">
                <i style={{fontSize:150}} className={iconClass}></i>
                </div>
                </div>
                <div className="row ">
                    <div className="col-12 d-flex justify-content-center"><button className="btn btn-primary" onClick={()=>{handlePopUpClosure(false)}}> Ok </button></div>
                   
                </div>
            </PopUp>
        </div>
    )
}

export default Register;