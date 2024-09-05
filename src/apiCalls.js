
const put2 = async(apiRoute)=>{
    var response = await fetch(apiRoute,{
        method:"put",
        headers:new Headers({
            "Content-Type":"application/json",
            "Authorization":`Bearer ${localStorage.getItem('jwt')}`
        })
    });

    var data = response.json();
    return data;
}

const get = async(apiRoute) =>{
    var response = await fetch(apiRoute,{
            method:"GET",
            headers:new Headers({
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem('jwt')}`
            })
    });
    var data = response.json();
    return data;
}

const put = async(apiRoute,body)=>{
    var response = await fetch(apiRoute,{
        method:"put",
        headers:new Headers({
            "Content-Type":"application/json",
            "Authorization":`Bearer ${localStorage.getItem('jwt')}`
        }),
        credentials:"include",
        body:JSON.stringify(body)
    });

    var data = response.json();
    return data;
}

const Delete = async(apiRoute)=>{
    var response = await fetch(apiRoute,{
        method:"delete",
        headers:new Headers({
            "Content-Type":"application/json",
            "Authorization":`Bearer ${localStorage.getItem('jwt')}`
        }),
        credentials:"include"
      
    });

    var data = response.json();
    return data;
}


const post = async(apiRoute,body)=>{
    var response = await fetch(apiRoute,{
        method:"post",
        headers:new Headers({
            "Content-Type":"application/json",
            "Authorization":`Bearer ${localStorage.getItem('jwt')}`
        }),
        credentials:"include",
        body:JSON.stringify(body)
    });

    var data = response.json();
    return data;
}


module.exports={get,post,Delete,put,put2}