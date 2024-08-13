import axios from "axios"

const SESSION_API="http://localhost:4000/api/v1/chat/CreateSession"
const FETCH_API="http://localhost:4000/api/v1/chat/fetchChat"


export function CreateSession(token,curruser,user,setSession){
    return async(dispatch)=>{

        try {
            const response=await axios({
                method:"post",
                url:SESSION_API,
                data:{
                   curruser,user
                },
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });

            if(!response.data.success){
                throw new Error(response.data.message);
            }
            console.log(response.data.data)
            dispatch(setSession(response.data.data));
            localStorage.setItem("session",JSON.stringify(response.data.data));



        } catch (error) {
            console.log("Error in Session API")
        }
    }
}


export function fetchChat(token,setChatUsers){
    return async(dispatch)=>{
        try {
            const response=await axios({
                method:"get",
                url:FETCH_API,
                headers:{
                    Authorization:`Bearer ${token}`
                }
                
            });

            if(!response.data.success){
                throw new Error(response.data.message);
            }
            dispatch(setChatUsers(response.data.data));
            

        } catch (error) {
            console.log("error in fetch chat api");
        }
    }
}