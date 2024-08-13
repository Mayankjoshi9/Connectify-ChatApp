import { createSlice } from "@reduxjs/toolkit";

const initialState={
     messages:[],
};

const chatSlice=createSlice({
    name:"message",
    initialState:initialState,
    reducers:{
        setMessage(state,value){
            state.messages=value.payload;
        },
        addMessage(state,value){
            state.messages=[...state.messages,value.payload];
        },
    }
});

export const {setMessage,addMessage} = chatSlice.actions;
export default chatSlice.reducer;