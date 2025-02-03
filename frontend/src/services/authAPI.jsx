
import {toast} from "react-hot-toast";
import { setLoading } from "../slices/auth";
import { setToken } from "../slices/auth";
import {setUser} from "../slices/auth";
import axios from "axios"
import {  setSession, setSessionUser } from "../slices/chat";
import { Serverurl } from '../config';

const LOGIN_API=Serverurl+"api/v1/auth/login";
const SIGNUP_API=Serverurl+"api/v1/auth/signup";
const OTP_API=Serverurl+"api/v1/auth/sendOtp";
const RESETPASSTOKEN_API=Serverurl+"api/v1/auth/resetPasswordToken";
const RESETPASS_API=Serverurl+"api/v1/auth/resetPassword";


export function login(email,password,navigate){
    
    return async(dispatch)=>{
        
        dispatch(setLoading(true));
        
        try {
            const response=await axios({
                method: 'post',
                url: LOGIN_API,
                data: {
                  email: email,
                  password: password
                }
              });

            
            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Login Successfully");
            dispatch(setToken(response.data.token));
            dispatch(setUser(response.data.user));
            localStorage.setItem("token",JSON.stringify(response.data.token));
            localStorage.setItem("user",JSON.stringify(response.data.user));
            navigate("/");



        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
        dispatch(setLoading(false));
        

    }
}

export function signup(name,email,password,otp,navigate){
    return async(dispatch)=>{
        
        dispatch(setLoading(true));
        try {
            const response=await axios({
                  method:'post',
                  url:SIGNUP_API,
                  data:{
                    name:name,
                    email:email,
                    password:password,
                    confirmPassword:password,
                    otp:otp,
                  }
            })
            console.log("response",response);
            if(!response.data.success){
                 throw new Error(response.data.message);
            }
            toast.success("Signup Successfully");

            navigate("/login");
            

        } catch (error) {
            console.log("signup api error.")
            toast.error(error.response.data.message);
        }
        
        dispatch(setLoading(false));

    }
}

export function sendOtp(email,navigate){
    return async(dispatch)=>{
       
        dispatch(setLoading(true));
        try {
            const response=await axios({
                method:'post',
                url:OTP_API,
                data:{
                   email:email
                }
            });

            if(!response.data.success){
                throw new Error(response.data.message);
            }
            toast.success("OTP SENT SUCCESSFULLY. ");
            navigate("/verify-email");


        } catch (error) {
            console.log("Error in Sending Otp");
            toast.error(error.response.data.message);
        }
        dispatch(setLoading(false));
        
    }
}


export function logout(navigate){
    return (dispatch)=>{
        dispatch(setToken(null));
        dispatch(setSession(null));
        dispatch(setUser(null));
        dispatch(setSessionUser(null));
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("session");
        localStorage.removeItem("sessionUser");

        toast.success("Logout Successfully");
        navigate("/login");
    }
}

export function resetPasswordToken(email,setEmailSent){
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try {
            const response=await axios({
                method:"post",
                url:RESETPASSTOKEN_API,
                data:{
                    email:email,
                }
            });
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            toast.success("Reset Email Sent");
            setEmailSent(true);
        } catch (error) {
            console.log("Error in resetPasswordToken api");
            toast.error(error.response.data.message);
        }
        dispatch(setLoading(false));
    }
    
}

export function resetPassword(password,token,navigate){
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try {
            const response=await axios({
                method:"post",
                url:RESETPASS_API,
                data:{password,confirmPassword:password,token}
            });

            if(!response.data.success){
                throw new Error(response.data.message);
            }
            toast.success("Password Reseted Successfully");
            navigate("/login");
        } catch (error) {
            console.log("error in reset password api");
            toast.error("error while reseting password");
        }

        dispatch(setLoading(false));

    }
}
