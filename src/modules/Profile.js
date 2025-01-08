import "bootstrap/dist/css/bootstrap.min.css"
import {Form} from "react-bootstrap"
import { Card,Image } from "antd";
import "bootstrap-icons/font/bootstrap-icons.css"
import { useState,useEffect } from "react";
import default_image from "../Assets/Images/default_image.jpg"
import MenuPopUp from "../components/MenuPopup"; 
import axios from "axios"
import check from "../Assets/Images/check.png";
import {get,put,DeleteAccount} from "../apiCalls";
import apiRoutes from "../apiRoutes";
import { useUserContext } from "../Contexts/UserContext";
import PopUp from "../components/Popup";
import { useHubContext } from "../Contexts/HubContext";
import { useNavigate } from "react-router-dom";

const Profile = () =>{

    const {Authuser,setToken} = useUserContext();
    const {closeConnection} = useHubContext()
    const navigate = useNavigate();
    const [successMessage,setSuccessMessage] = useState();
    const [errorMessage,setErrorMessage] = useState();
    const [password,setPassword] = useState("");
const [firstName, setFirstName] = useState(Authuser.firstName);
const [lastName, setLastName] = useState(Authuser.lastName);
const [number, setNumber] = useState(Authuser.phoneNumber);
const [file, setFile] = useState(null);
const [bio, setBio] = useState(Authuser.bio);
const [displaPicture, setDisplaPicture] = useState(default_image);
const [picture, setPicture] = useState(default_image);
const [trigger1, setTrigger1] = useState(false);
const [trigger2, setTrigger2] = useState(false);
const [deleteConfirmation, setDeleteConfirmation] = useState(false);
const [passwordError,setPassordError] = useState(false);
const [success, setSuccess] = useState(false);

const submitForm = async () =>{
    if(firstName===Authuser.firstName && lastName===Authuser.lastName && number===Authuser.phoneNumber
        &&bio===Authuser.bio && displaPicture===Authuser.image)
        {
           
            setTrigger2(false);
            return;
        }
       
        const myform = new FormData();
        myform.append("id",Authuser.id);
        myform.append('firstName',firstName);
        myform.append('lastName',lastName);
        myform.append('phoneNumber',number);
        myform.append('bio',bio);
        myform.append('file',file); 
       

        try{
         const res = await axios.putForm(apiRoutes.auth,myform);
         if(res.data.success)
         {
            setTrigger2(false);
            setSuccessMessage("User info succesfully updated");
            setSuccess(true);

         }
         console.log(res);
        }
        catch(error)
        {
            console.log("error-> ",error);
        }
      

    }

    const DeleteAcc = async () =>{
        const result = await DeleteAccount(apiRoutes.auth,{userId:Authuser.id,password:password});
        if(result.success)
        {
            setSuccessMessage("Account Removed");
            setDeleteConfirmation(false);
            setSuccess(true);
            closeConnection();
            setToken(null);
            localStorage.removeItem('jwt');
            navigate('/',{replace:true})
            navigate(0);

            
        }
        else{
            console.log(result.errors);
            setErrorMessage("Error Occured");
            setPassword("");
            setPassordError(true);
        }
    }

const UploadImage = (e) =>{
    const reader = new FileReader();
     reader.onload = x =>{
         setDisplaPicture(x.target.result);
     }
     reader.readAsDataURL(e.target.files[0])
     setFile(e.target.files[0]); 
  
 }
    
 useEffect(()=>{
    if(Authuser.image)
    {
        setPicture(Authuser.image);
        setDisplaPicture(Authuser.image);
    }
 },[])
    return(
        <Card>
        <div className="row sticky-top bg-secondary m-4 py-2 "> 
           <div className="col-12 d-flex align-items-center justify-content-center">
           <h1 className='mx-auto'>Profile</h1>
       </div>
       </div>
       <div style={{width:"100%"}}>
          <div className="container">
            <div className="row">
                <div className="col-12 col-md-4 col-lg-3 ">
                <div className="col-12 d-flex justify-content-center">
                    <img src={picture} height={200} width={200} style={{borderRadius:"50%"}}></img>
                    </div>
                    <div className="col-12 pt-3 d-flex justify-content-center">
                    <p> {Authuser.bio}</p></div>
                </div>
                <div className="col-12 col-md-8 col-lg-9 pt-5" style={{color:"darkgrey"}}>
                <div className="row">
                  <div className="col-4 col-md-6 col-lg-3 d-flex justify-content-center"><h3>Name &nbsp;&nbsp; : </h3></div>
                  <div className="col-8 col-md-6 col-lg-9"> <h3>{Authuser.firstName} {Authuser.lastName}</h3></div>
                  <hr/>
                </div>
                <div className="row">
                  <div className="col-4 col-md-6 col-lg-3 d-flex justify-content-center"><h3>Email  &nbsp;&nbsp; &nbsp;: </h3></div>
                  <div className="col-8 col-md-6 col-lg-9"> <h3>{Authuser.email}</h3></div>
                  <hr/>
                </div>
                <div className="row">
                  <div className="col-4 col-md-6 col-lg-3 d-flex justify-content-center"><h3>Number : </h3></div>
                  <div className="col-8 col-md-6 col-lg-9"><h3>{Authuser.phoneNumber?Authuser.phoneNumber:"N/A"}</h3></div>
                </div>
                </div>
            </div>
            <div className="row">
                <hr/>
                <div className="col-12 col-md-6 col-lg-8"></div>
                <div className="col-6 col-md-3 col-lg-2"><button className="btn btn-primary" onClick={()=>{setTrigger2(true)}}><i class="bi bi-pencil-square"></i> edit profile</button></div>
                <div className="col-6 col-md-3 col-lg-2"> <button className="btn btn-danger" onClick={()=>{setTrigger1(true)}}><i class="bi bi-trash3"></i> delete profile</button></div>
                
               
            </div>
         </div>

        </div>
        <MenuPopUp trigger={trigger2} setTrigger={setTrigger2}>
        <div style={{width:"100%"}}>
            
            <Form.Group> 
               
               <div style={{width:"100%",textAlign:"center" }}>
               <div style={{width:"100%",textAlign:"center" }}><label className="form-label">Profile Picture</label></div>
              <Image src={displaPicture}  style={{ height:"200px",borderRadius:"50%",marginBottom:10}}/></div>
               <Form.Control type="file" onChange={UploadImage} placeholder="Group profile photo.."  />
               <hr style={{color:"#66d9ff"}}/> 
               <label className="form-label">First Name :</label>
               <Form.Control value={firstName} required onChange={(e)=>{setFirstName(e.target.value)}} />
               <hr style={{color:"#66d9ff"}}/>
               <label className="form-label">Last Name :</label>
               <Form.Control value={lastName} required onChange={(e)=>{setLastName(e.target.value)}} />
               <hr style={{color:"#66d9ff"}}/>
               <label className="form-label">Cell Number :</label>
               <Form.Control value={number?number:""} onChange={(e)=>{setNumber(e.target.value)}} />
               <hr style={{color:"#66d9ff"}}/>
               <label className="form-label">Bio :</label>
               <Form.Control value={bio} as="textarea" rows={3} onChange={(e)=>{setBio(e.target.value)}} />
               <hr style={{color:"#66d9ff"}}/>
              
           </Form.Group>
       </div>
       <div style={{width:"100%",textAlign:"center"}}>
                    
                    <button className="btn btn-primary" onClick={()=>{submitForm()}} style={{width:"50%"}} >Save</button>
                   
                    </div> 
        </MenuPopUp>
        <PopUp trigger={trigger1} setTrigger={setTrigger1}>
                <div style={{width:'65%',float:"left"}}>
                    <h3>Delete Account</h3>
                     <p style={{position:"relative",padding:"10%",fontWeight:'bold',fontSize:25}}> Are you sure you want to delete your account?</p>
                </div>
                <div style={{width:"35%",float:"right"}}>
                <i style={{fontSize:150,color:"red"}} class="bi bi-exclamation-triangle-fill"></i>
                </div>
                <div className="row">
                    <div className="col-6"><button className="btn btn-danger" onClick={()=>{setTrigger1(false);setDeleteConfirmation(true)}}> Confirm </button></div>
                    <div className="col-6"><button className="btn btn-secondary" onClick={()=>{setTrigger1(false)}}> Cancel </button></div>
                </div>
            </PopUp>
            <PopUp trigger={deleteConfirmation} setTrigger={setDeleteConfirmation}>
                <div style={{width:'65%',float:"left"}}>
                    <h3>Delete Account</h3>
                     <p style={{position:"relative",paddingTop:"10%",paddingRight:"10%",fontWeight:'bold',fontSize:14}}> Enter Password to confirm Account Deletion!</p>
                     <label for="inputPassword5" className="form-label">Password</label>
                    <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} className="form-control" aria-describedby="passwordHelpBlock"/>
                </div>
                <div style={{width:"35%",float:"right"}} className="d-flex justify-content-center">
                <i style={{fontSize:150,color:"red"}} class="bi bi-exclamation-triangle-fill"></i>
                </div>
                <div className="row pt-3 d-flex justify-content-center">
                    <div className="col-6"><button className="btn btn-danger" onClick={()=>{DeleteAcc()}}> Confirm </button></div>
                   
                </div>
            </PopUp>
            <PopUp trigger={success} setTrigger={setSuccess}>
            <div className="row">
            <div className="col-8">
                    <h3>Success</h3>
                     <p style={{position:"relative",paddingTop:"10%",paddingRight:"10%",fontWeight:'bold',fontSize:19}}>{successMessage}</p>
                     
                </div>
                <div className="col-4">
                    <Image src={check} preview={false}></Image>
                </div></div>
                <div className="row">
                    <div className="col-12 d-flex justify-content-center"><button className="btn btn-primary" onClick={()=>{setSuccess(false)}}> Ok </button></div>
                   
                </div>
            </PopUp>
            <PopUp trigger={passwordError} setTrigger={setPassordError}>
                <div className="row">
                <div className="col-8">
                    <h3>Error</h3>
                     <p style={{position:"relative",paddingTop:"16%",paddingRight:"10%",fontWeight:'bold',fontSize:19}}>{errorMessage} !</p>
                    
                </div>
                <div className="col-4">
                <i style={{fontSize:150,color:"turquoise"}} class="bi bi-info-circle"></i>
                </div>
                </div>
                <div className="row ">
                    <div className="col-12 d-flex justify-content-center"><button className="btn btn-primary" onClick={()=>{setPassordError(false)}}> Ok </button></div>
                   
                </div>
            </PopUp>
            </Card>
    )

}

export default Profile;