import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp } from "../services/authAPI";
import { Link, useNavigate } from "react-router-dom";
import { setSignupData } from "../slices/auth";
import image from "../assets/icon.png"
import ChatBg from "../assets/loginBg.jpg"



const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const { name, email, password } = formData;
  const loading = useSelector((state) => state.auth.loading);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(setSignupData(formData));
    dispatch(sendOtp(email, navigate));
    setFormData({ name: "", email: "", password: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-primary"
     style={{
            backgroundImage: `url(${ChatBg})`,
            backgroundSize: "cover",
            
            height:"100vh",
            width:"100vw"
          }}
    >
      <div className="w-full max-w-md bg-chat shadow-lg rounded-lg p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-white mb-6">
          Connect With Friends
        </h2>
        <h2 className="flex justify-center text-2xl sm:text-3xl font-semibold text-center text-white mb-6">
          Register Now <img src={image} className="w-12 h-12 ml-1"/>
        </h2>

        {loading ? (
          <div className="text-center text-xl text-green-600">Loading...</div>
        ) : (
          <form onSubmit={submitHandler} className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-gray-300 mb-2">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={name}
                onChange={changeHandler}
                required
                className="p-3 rounded-md border border-parti bg-search text-white focus:outline-none focus:ring-2 focus:ring-input"
                placeholder="Enter your full name"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="text-gray-300 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={changeHandler}
                required
                className="p-3 rounded-md border border-parti bg-search text-white focus:outline-none focus:ring-2 focus:ring-input"
                placeholder="Enter your email"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="text-gray-300 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={changeHandler}
                required
                className="p-3 rounded-md border border-parti bg-search text-white focus:outline-none focus:ring-2 focus:ring-input"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="mt-4 p-3 bg-[#2563EB] hover:bg-[#1E4DB7] text-white rounded-md  transition duration-200"
            >
              Sign Up
            </button>

          </form>
        )}

        <div className="text-center mt-4 text-sm">
          <Link to="/login" className="text-blue-400 hover:underline">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
