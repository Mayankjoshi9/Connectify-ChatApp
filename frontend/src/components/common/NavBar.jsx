
import GroupModel from "../models/groupModel"
import NavDashboard from "../dashboards/NavDashboard"
import PropTypes from "prop-types";




const NavBar = ({socket}) => {
  
  return (
    <>
      <nav className="bg-gray-900 w-full h-[8%] px-[1%] flex justify-between items-center">
        <GroupModel socket={socket}/>
        <NavDashboard socket={socket}/>
      </nav>
    </>
  )
}
NavBar.propTypes = {
  socket: PropTypes.object.isRequired, // Ensures socket is an object and required
};

export default NavBar;




