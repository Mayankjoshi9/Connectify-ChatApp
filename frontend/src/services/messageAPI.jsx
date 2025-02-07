import axios from "axios"
import {toast} from "react-hot-toast";
import { setMessage } from "../slices/message"
import { Serverurl } from '../config';

const FETCHMESSAGE_URL=Serverurl+"api/v1/message/fetchMessages/"
const CLEARALLMESSAGE_URL=Serverurl+"api/v1/message/clearAllMessage/"

export function fetchMessages(id,token){
    return async(dispatch)=>{
        try {
            
            const response=await axios({
                method:"get",
                url:FETCHMESSAGE_URL+`${id}`,
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            dispatch(setMessage(response.data.body));
            
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