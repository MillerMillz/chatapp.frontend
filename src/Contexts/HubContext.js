import { createContext,useEffect,useState,useContext } from "react";
import { useUserContext } from "./UserContext";
import { HubConnectionBuilder,LogLevel } from "@microsoft/signalr";
import { get, post } from "../apiCalls";
import apiRoutes from "../apiRoutes";
const HubContext = createContext({});

const HubContextProvider =({children})=>{
    const [connection,setConnection] = useState();
    const [messageRefresh,setMessageRefresh] = useState(null);
    const [roomRefresh,setRoomRefresh] = useState(null);
    const [friendRefresh, setFriendRefresh] = useState(null);
    const [inviteRefresh, setInviteRefresh] = useState(null);
    const [usersRefresh, setUsersRefresh] = useState(null);
    const [connectedUsers,setConnectedUsers] = useState([]);
    const [connID,setConnID] = useState();
    const { Authuser} = useUserContext();
    const connect  = async () => {
        try{
            const connection = new HubConnectionBuilder().withUrl("http://localhost:7124/ChatHub",{
                accessTokenFactory: () => localStorage.getItem("jwt")
            }).configureLogging(LogLevel.Information).build();

        

          connection.on("RecieveMessage",(stamp,type)=>{
            if(type==="Rooms"){
                 setRoomRefresh(stamp);
            }
              else if(type==="Messages")
              {
                console.log('refresh')
                setMessageRefresh(stamp);
              }
              else if(type==="Users")
                {
                  console.log('refresh')
                  setUsersRefresh(stamp);
                }
                else if(type==="Invites")
                    {
                      console.log('refresh')
                      setInviteRefresh(stamp);
                    }
                    else if(type==="Friends")
                        {
                          console.log('refresh')
                          setFriendRefresh(stamp);
                        }
            }); 

            connection.on("RecieveConnID",(message)=>{
            setConnID(message);
         });

         connection.on("RecieveConnectedUsers",(users)=>{
            console.log("tyovo")
             ConvertToFirstnames(users);
         });


            await connection.start();
            
           
        
            setConnection(connection)
        } catch(e)
        {
            console.log(e);
        }
    }

    const ConvertToFirstnames = async (users) =>{
        
            var response = await fetch(apiRoutes.users,{
                method:"post",
                headers:new Headers({
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${localStorage.getItem('jwt')}`
                }),
                credentials:"include",
                body:JSON.stringify(users)
            });
        
            var data = await response.json();
            console.log(data)
           if(data.success)
           {
            setConnectedUsers(data.response)
            connectedUsers.push(Authuser.firstName)
            console.log(connectedUsers)
            console.log(data.response)
           }
           else{
            console.log('err')
            console.log(data.errors)
           }
    }
    const JoinRoom = async (room) =>{

        try{
            await connection.invoke("JoinRoom", {room}); 
        }catch(e)
        {
            console.log(e)
        }
    }
    const RequestConnectedUsers = async () =>{
        try{
            await connection.invoke("ConnectUsers");
    
        }
        catch(e)
        {
            console.log(e);
        }
        }

    const closeConnection = async () =>{
    try{
        await connection.stop();

    }
    catch(e)
    {
        console.log(e);
    }
    }

    const sendMessageAlert = async (id,message) =>{
    try{
        
        await connection.invoke("SendMessageAsync",id,message);
        
    }catch(e)
    {
        console.log(e)
    }

}

useEffect(()=>{
    if(Authuser){
    connect();
RequestConnectedUsers();}
},[Authuser])
    return(
        <HubContext.Provider value={{sendMessageAlert,closeConnection,JoinRoom,connID,connection,messageRefresh,roomRefresh,usersRefresh,friendRefresh,inviteRefresh,connectedUsers}}>
            {children}
        </HubContext.Provider>
        );
    
};

export default HubContextProvider;
export const useHubContext = () => useContext(HubContext);