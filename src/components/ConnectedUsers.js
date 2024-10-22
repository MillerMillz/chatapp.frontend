

const ConnectedUsers = ({users,members}) =>{
    console.log("====users====")
    console.log(members)
    console.log("====users====")
    return<div className="user-list">
        <h4>ConnectedUsers</h4>
        {members.filter((m)=> users.includes(m.id)).map((u,idx)=><h6 key={idx} style={{color:"green"}}>{u.firstName}</h6>)}
        {members.filter((m)=> !users.includes(m.id)).map((u,idx)=><h6 key={idx} style={{color:"red"}}>{u.firstName}</h6>)}
    </div>

}
 export default ConnectedUsers;