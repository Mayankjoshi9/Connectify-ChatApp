
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const OpenRoute = ({children}) => {
  const token=useSelector((state)=>state.auth.token);
  if(token!=null){
    return <Navigate to="/" replace/>;
  }
  else{
     return children;
  }
}

OpenRoute.propTypes = {
  children: PropTypes.node.isRequired, // Add 'children' to prop types
};

export default OpenRoute