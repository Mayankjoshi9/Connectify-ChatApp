import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp } from '../services/authAPI';
import { Link, useNavigate } from 'react-router-dom';
import { setSignupData } from '../slices/auth';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { name, email, password } = formData;

  const changeHandler = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(setSignupData(formData));
    dispatch(sendOtp(email, navigate));
    setFormData({ name: '', email: '', password: '' });
    setSignupData(formData);
  };

  const loading = useSelector((state) => state.auth.loading);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
      {loading ? (
        <div className="text-white text-2xl">Loading...</div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Create Your Account
          </h2>
          <form onSubmit={submitHandler} className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-gray-600 mb-2">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={name}
                onChange={changeHandler}
                required
                className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your full name"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="text-gray-600 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={changeHandler}
                required
                className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your email"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="text-gray-600 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={changeHandler}
                required
                className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="mt-4 p-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
            >
              Sign Up
            </button>
          </form>

          <div className="flex justify-between items-center mt-4">
            <Link to="/login" className="text-green-600 hover:underline">
              Already have an account? Login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
