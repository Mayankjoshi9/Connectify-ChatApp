import { createSlice } from "@reduxjs/toolkit";

const initialState={
    session:localStorage.getItem("session")?JSON.parse(localStorage.getItem("session")):null,
    chatUsers:[],
    sessionUser:localStorage.getItem("sessionUser")?JSON.parse(localStorage.getItem("sessionUser")):null,
    
};

const chatSlice=createSlice({
    name:"chat",
    initialState:initialState,
    reducers:{
        setSession(state,value){
            state.session=value.payload;
        },
        setChatUsers(state,value){ 
            state.chatUsers = value.payload;       
        },
        addChatUsers(state,value){
            state.chatUsers = [...state.chatUsers, value.payload];
        },
        setSessionUser(state,value){
            state.sessionUser=value.payload;
        }
    }
});

export const {setSession,setChatUsers,setSessionUser,addChatUsers} = chatSlice.actions;
export default chatSlice.reducer;