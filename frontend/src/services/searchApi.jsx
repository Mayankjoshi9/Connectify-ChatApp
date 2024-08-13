import axios from "axios";
import { setLoading } from "../slices/auth";
import toast from "react-hot-toast";
import {  setSessionUser } from "../slices/chat";


const SEARCH_API="http://localhost:4000/api/v1/search/searchUser";
export function searchUser(token,search){
    return async(dispatch)=>{
          dispatch(setLoading(true));
          try {
            const response= await axios({
                method:'post',
                url:SEARCH_API,
                data:{
                    email:search
                },
                headers:{
                    Authorization: `Bearer ${token}`,
                  }
            });

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            dispatch(setSessionUser(response.data.data));
            localStorage.setItem("sessionUser",JSON.stringify(response.data.data));

          } catch (error) {
               console.log("Error in SearchUser API");
               toast.error("not found");
               
          }
          dispatch(setLoading(false));
    }
}