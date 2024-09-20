
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/authAPI";
import { IoIosNotifications } from "react-icons/io";
import { useDispatch } from "react-redux";
import { MdOutlineGroupAdd } from "react-icons/md";
import { CiLogout } from "react-icons/ci";



const NavBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  return (
    <>
        <nav className="bg-gray-900 w-full h-[8%] flex justify-around items-center">
        <button className="text-white text-2xl">
        <MdOutlineGroupAdd />
        </button>
        <button className="relative text-white text-3xl">
        <div className=" absolute text-sm text-white w-5 h-5 rounded-full bg-red-500 right-0 -top-1 ">1</div>
        <IoIosNotifications />
        </button>
        <button
          className="text-2xl text-white"
          onClick={() => {
            dispatch(logout(navigate));
          }}
        >
          <CiLogout />
        </button>
      </nav>
    </>
  )
}

export default NavBar;


