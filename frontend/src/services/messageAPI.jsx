import axios from "axios"
import {toast} from "react-hot-toast";
import { setMessage } from "../slices/message"
import { Serverurl } from '../config';
import { addBulkMessage } from "../slices/message";


const FETCHMESSAGE_URL=Serverurl+"api/v1/message/fetchMessages/"
const CLEARALLMESSAGE_URL=Serverurl+"api/v1/message/clearAllMessage/"

export function fetchMessages(id,token,page,setHasMoreMessages){
    return async(dispatch)=>{
        try {
            
            const response=await axios({
                method:"get",
                url:FETCHMESSAGE_URL+`${id}`+`?page=${page}`,
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            
            dispatch(addBulkMessage(response.data.body));
            setHasMoreMessages(response.data.hasMoreMessages);
            
        } catch (error) {
            console.log("Error in Fetch Message API");
            toast.error(error.response.data.message);
        }
    }
}


export function clearAllMessage(token,id){
      return async(dispatch)=>{
        try {
            const response=await axios({
                 method:"post",
                 url:CLEARALLMESSAGE_URL+`${id}`,
                 headers:{
                    Authorization:`Bearer ${token}`
                 }
            });

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            dispatch(setMessage([]));

        } catch (error) {
            toast.error(error.response.data.message);
        }
      }
}