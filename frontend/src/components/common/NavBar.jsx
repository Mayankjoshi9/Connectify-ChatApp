
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/authAPI";
import { CgProfile } from "react-icons/cg";
import { useDispatch } from "react-redux";



const NavBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  return (
    <>
        <nav className="bg-slate-800 w-full h-[8%] flex justify-around items-center">
        <button>
          <CgProfile className="text-[50px] text-yellow-200"></CgProfile>
        </button>
        <button
          className="w-[100px] h-[50px] bg-red-500"
          onClick={() => {
            dispatch(logout(navigate));
          }}
        >
          Logout
        </button>
      </nav>
    </>
  )
}

export default NavBar


