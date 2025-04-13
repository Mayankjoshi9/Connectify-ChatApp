import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
};

const messageSlice = createSlice({
  name: "message",
  initialState: initialState,
  reducers: {
    setMessage(state, action) {
      state.messages = action.payload;
    },
    addMessage(state, action) {
      const messageExists = state.messages.some(
        (message) => message._id === action.payload._id
      );
      if (!messageExists) {
        state.messages = [...state.messages, action.payload];
      }
    },
    addBulkMessage(state, action) {
      const newMessages=action.payload.filter((message)=> !state.messages.some((m)=>m._id===message._id));
      state.messages = [...newMessages,...state.messages];
  },
  clearMessages(state) {
    state.messages=[];
  },

  },
});

export const { setMessage, addMessage ,addBulkMessage,clearMessages} = messageSlice.actions;
export default messageSlice.reducer;
