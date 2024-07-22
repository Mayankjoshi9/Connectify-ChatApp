import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import {Provider} from "react-redux";
import authSlice from './slices/auth';
import { Toaster } from 'react-hot-toast';

const store=configureStore({
   reducer: {
    auth:authSlice,
    
  },
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <Provider store={store}>
      <BrowserRouter>
         <App />
         <Toaster/>
      </BrowserRouter>
   </Provider>
   
  
);

