
import GroupModel from "../models/GroupModel"
import NavDashboard from "../dashboards/NavDashboard"
import PropTypes from "prop-types";
import icon from "../../../public/assets/icon.png"



const NavBar = ({socket}) => {
  
  return (
    <>
      <nav className="bg-gray-900 w-full h-[8%] px-[1%] flex justify-between items-center">
        <div className="flex justify-center item-center h-full mt-4 gap-5">
        <GroupModel socket={socket}/>
        <div className="w-full h-[80%] flex item-center justify-center gap-1">
          <img src={icon} className="h-[80%] w-full"/>
          <p className="text-xl text-white">Connectify</p>
        </div>
        
        </div>
        <NavDashboard socket={socket}/>
      </nav>
    </>
  )
}
NavBar.propTypes = {
  socket: PropTypes.object.isRequired, // Ensures socket is an object and required
};

export default NavBar;




