import axios from "axios"
import { addChatUsers, setSession } from "../slices/chat";
import { Serverurl } from '../config';

const SESSION_API=Serverurl+"api/v1/chat/createSession"
const FETCH_API=Serverurl+"api/v1/chat/fetchChat"
const GROUP_API=Serverurl+"api/v1/chat/createGroup"

export const fetchChat = (token, setChatUsers) => async (dispatch) => {
    try {
        const response = await axios.get(FETCH_API, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        dispatch(setChatUsers(response.data.data));

    } catch (error) {
        console.log("Error in fetch chat API:", error);
    }
};

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
             
            dispatch(setSession(response.data.data));
            localStorage.setItem("session",JSON.stringify(response.data.data));
            return response.data.data;

        } catch (error) {
            console.log("Error in Session API")
        }
    }
}


export function CreateGroup(token,chatName,users){
    return async(dispatch)=>{
        try{
          const response=await axios({
             method:"post",
             url:GROUP_API,
             data:{
                chatName:chatName,
                users:users,
             },
             headers:{
                    Authorization:`Bearer ${token}`
                }
          })
          
          if(!response.data.success){
              throw new Error(response.data.message)
          }
         
          dispatch(setSession(response.data.data));
          localStorage.setItem("session",JSON.stringify(response.data.data));
          dispatch(addChatUsers(response.data.data));

        } catch(error){
            console.log("error while creating group");
            console.log(error);
        }
    }
}