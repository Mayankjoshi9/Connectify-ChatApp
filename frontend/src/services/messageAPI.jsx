import axios from "axios"
import { setMessage } from "../slices/message"
const FETCHMESSAGE_URL="http://localhost:4000/api/v1/message/"

export function fetchMessages(id,token){
    return async(dispatch)=>{
        try {
            const response=await axios({
                method:"get",
                url:FETCHMESSAGE_URL+`${id}`,
                headers:{
                    Authorization:`Bearer ${token}`
                }

            })
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            
            dispatch(setMessage(response.data.body));
            
        } catch (error) {
            console.log("Error in Fetch Message API");
            console.log(error);
        }
    }
}