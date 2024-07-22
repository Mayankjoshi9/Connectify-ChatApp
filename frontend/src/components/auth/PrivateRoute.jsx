import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({children}) => {
 
  const token=useSelector((state)=>state.auth.token);
  if(token==null){
    return <Navigate to="/login" />;
  }
  else{
     return children;
  }
}

export default PrivateRoute