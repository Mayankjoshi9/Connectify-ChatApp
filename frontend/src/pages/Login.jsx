import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../services/authAPI';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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

  const loading = useSelector((state) => state.auth.loading);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      {loading ? (
        <div className="text-white text-2xl">Loading...</div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Welcome Back
          </h2>
          <form onSubmit={submitHandler} className="flex flex-col gap-4">
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
                className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="mt-4 p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            >
              Login
            </button>
          </form>

          <div className="flex justify-between items-center mt-4">
            <Link
              to="/resetpassword"
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>

            <Link
              to="/signup"
              className="text-blue-600 hover:underline"
            >
              Create an Account
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
