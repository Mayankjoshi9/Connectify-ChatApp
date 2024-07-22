import axios from "axios"
const SESSION_API="http://localhost:4000/api/v1/chat/CreateSession"

export function CreateSession(curruser,user){
    return async()=>{

        try {
            const response=await axios({
                method:"post",
                url:SESSION_API,
                data:{
                   curruser,user
                },
            });

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            


        } catch (error) {
            console.log("Error in Session API")
        }
    }
}