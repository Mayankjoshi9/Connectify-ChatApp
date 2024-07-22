import axios from "axios";
import { setLoading } from "../slices/auth";

const SEARCH_API="http://localhost:4000/api/v1/search/searchUser";
export function searchUser(search,setUser){
    return async(dispatch)=>{
          dispatch(setLoading(true));
          try {
            const response= await axios({
                method:'post',
                url:SEARCH_API,
                data:{
                    email:search
                }
            });

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            console.log(response);
            setUser(response.data.data);


          } catch (error) {
               console.log("Error in SearchUser API");
               
          }
          dispatch(setLoading(false));
    }
}