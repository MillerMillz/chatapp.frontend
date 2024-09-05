import { useState } from "react"
import { Form,Button,Image } from "react-bootstrap"
import defaultDP from "../Assets/Images/default_image.jpg"
import { useNavigate } from "react-router-dom"
import { submit } from "../apiCalls"
import apiRoutes from "../apiRoutes"
import axios from "axios"
import { Input } from "antd"

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
    const submitForm = async () =>
    {
      
        const myform = new FormData();
        console.log(email);
        myform.append("email",email);
        myform.append("firstName",name);
        myform.append("lastName",surname);
        myform.append("bio",bio);
        myform.append("password",password);
        myform.append("file",file);
        console.log(myform.values);

        try{
         const res = await axios.postForm(apiRoutes.register,myform);
         console.log(res);
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
            <div style={{width:"50%",float:"left"}}>
                 <Form.Group>
                    <p color="red">{nameError}</p>
                    <Form.Control placeholder="Name" required onChange={(e)=>{setName(e.target.value)}} />
                    <hr style={{color:"#66d9ff"}}/>
                    <p color="red">{surnameError}</p>
                    <Form.Control placeholder="Surname" required onChange={(e)=>{setSurname(e.target.value)}} />
                    <hr style={{color:"#66d9ff"}}/>
                    <p color="red"></p>
                    <Form.Control placeholder="Bio" as="textarea" rows={3} onChange={(e)=>{setBio(e.target.value)}} />
                    <hr style={{color:"#66d9ff",marginBottom:140}}/>
                    <Form.Control type="file" onChange={UploadImage}  />
                    <hr style={{color:"#66d9ff"}}/>
                </Form.Group>
            </div>
            <div style={{width:"50%",float:"left"}}>
            <Form.Group>
                    <p color="red">{cellError}</p>
                    <Form.Control placeholder="Number" required onChange={(e)=>{setCell(e.target.value)}} />
                    <hr style={{color:"#66d9ff"}}/>
                    <p color="red">{emailError}</p>
                    <Form.Control placeholder="Email" required onChange={(e)=>{setEmail(e.target.value)}} />
                    <hr style={{color:"#66d9ff"}}/>
                    <p color="red">{passwordError}</p>
                    <Form.Control placeholder="Password" style={{marginBottom:8}} type="password" rows={3} onChange={(e)=>{setPassword(e.target.value)}} />
                    <Form.Control placeholder="Confirm Password" type="password" onChange={(e)=>{setConfirmPassword(e.target.value)}} />
                    <Image src={profilePicture}  style={{ height:"200px",float:"left"}}/>
                </Form.Group>
            </div>
              <div style={{width:"100%",float:"left"}}>

              <Button variant="success" onClick={()=>{submitForm()}} style={{width:"50%"}} >Register</Button>
                
                <Button variant="primary" style={{width:"50%"}} onClick={()=>{navigate('/')}} >Back to Login</Button>
              </div>
        </div>
    )
}

export default Register;