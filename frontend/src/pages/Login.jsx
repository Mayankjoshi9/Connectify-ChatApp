import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../services/authAPI";
import { Link, useNavigate } from "react-router-dom";



const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const changeHandler = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  };
  const handleGuest=()=>{
  
    dispatch(login("mebac12329@dfesc.com", "mebac12329@dfesc.com", navigate));
  }
  const loading = useSelector((state) => state.auth.loading);

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary px-4"
      style={{
        backgroundImage: `url("/assets/chatBg.jpg")`,
        backgroundSize: "cover",
        
        height:"100vh",
        width:"100vw"
      }}
    >

      {loading ? (
        <div className="text-white text-lg sm:text-2xl">Loading...</div>
      ) : (
        <div className="bg-chat shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-md">

          <h2 className="flex text-xl sm:text-2xl font-semibold text-center text-white mb-4 sm:mb-6">
            Chat Now ! <img src="assets/icon.png" className="w-12 h-12 ml-1" />
          </h2>
          <form onSubmit={submitHandler} className="flex flex-col gap-3 sm:gap-4">
            <div className="flex flex-col">
              <label htmlFor="email" className="text-gray-300 mb-1 sm:mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={changeHandler}
                required
                className="w-full p-3 rounded-md border border-parti bg-search text-white focus:outline-none focus:ring-2 focus:ring-input"
                placeholder="Enter your email"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="text-gray-300 mb-1 sm:mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={changeHandler}
                required
                className="w-full p-3 rounded-md border border-parti bg-search text-white focus:outline-none focus:ring-2 focus:ring-input"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="mt-3 sm:mt-4 p-3 w-full bg-[#2563EB] hover:bg-[#1E4DB7] text-white rounded-md  transition duration-200"
            >
              Login
            </button>

            
          </form>
          <button
              onClick={handleGuest}
              className="mt-3 sm:mt-4 p-3 w-full bg-gray-200 hover:bg-gray-300 text-black rounded-md  transition duration-200"
            >
              Use Guest Credentials
            </button>

          <div className="flex flex-col sm:flex-row sm:justify-between items-center mt-4">
            <Link to="/resetpassword" className="text-blue-400 hover:underline">
              Forgot Password?
            </Link>
            <Link to="/signup" className="text-blue-400 hover:underline mt-2 sm:mt-0">
              Create an Account
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
