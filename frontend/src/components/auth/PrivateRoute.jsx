
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({children}) => {
 
  const token=useSelector((state)=>state.auth.token);
  if(token==null){
    return <Navigate to="/login" />;
  }
  else{
     return children;
  }
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired, // Add 'children' to prop types
};

export default PrivateRoute