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
    }
  },
});

export const { setMessage, addMessage } = messageSlice.actions;
export default messageSlice.reducer;
