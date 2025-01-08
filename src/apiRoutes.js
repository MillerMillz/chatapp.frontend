const API_URL = "http://192.168.0.29:7124/api/V1/";

module.exports = {

    register:API_URL+"Auth/Register",
    users:API_URL+"Auth/Users",
    auth:API_URL+"Auth/",
    login:API_URL+"Auth/WebLogin/",
    getCurrentUser:API_URL+"Auth/GetCurrentWebUser",
    signOut:API_URL+"Auth/SignOut/",
    chatRoom:API_URL+"ChatRoom/",
    friendship:API_URL+"friendship/",
    invite:API_URL+"invite/",
    membership:API_URL+"membership/",
    message:API_URL+"message/",
    status:API_URL+"status/",
    statusView:API_URL+"statusView/",
    chat:API_URL+"chat/",
    chatMessage:API_URL+"chatMessage/",
    roomChat:API_URL+"roomChat/"



    
}