import { createContext, useEffect, useState,useContext } from "react";
import { get } from "../apiCalls";
import apiRoutes from "../apiRoutes";

const UserContext = createContext({});

const UserContextProvider =({children})=>{
    const [Authuser,setAuthuser] = useState(null);
    const [trigger,setTrigger] = useState(false);
    const [token,setToken] = useState(null);
    const [connID,setConnID ]= useState();
    const [myRooms,setMyRooms] = useState([]);
    const userId= Authuser?.id;
    
    const FetchUser = async () =>{
        
       
        var result = await get(apiRoutes.getCurrentUser);
        if(result?.success)
            {
                setAuthuser(result.response);
                setTrigger(false);
            }
            else
            {
                console.log(result?.errors);
                
            }
    }
    const FetchJoinedRooms = async () =>{
        var result = await get(apiRoutes.fetchJoinedRooms+userId);
        if(result?.success)
            {
                setMyRooms(result?.response);
                
            }
            else
            {
                console.log(result?.errors);
            }
    }

    useEffect(()=>{
        FetchUser();
    },[])
    useEffect(()=>{
        FetchJoinedRooms();
    },[userId])

    return(
    <UserContext.Provider value={{userId,Authuser,connID,myRooms,setConnID,FetchUser,token,setToken,trigger,setTrigger}}>
        {children}
    </UserContext.Provider>
    );
};

export default UserContextProvider;
export const useUserContext = () => useContext(UserContext);

