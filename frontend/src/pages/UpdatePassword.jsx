import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../services/authAPI';
import { useLocation, useNavigate } from 'react-router-dom';

const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const submitHandler = (e) => {
    e.preventDefault();
    const token = location.pathname.split("/").at(-1);
    dispatch(resetPassword(password, token, navigate));
  };

  return (
    <div className='w-full h-full flex justify-center items-center bg-primary'>
      <form
        onSubmit={submitHandler}
        className='bg-chat w-[80%] sm:w-[50%] lg:w-[40%] p-8 flex flex-col gap-6 justify-center items-center rounded-lg shadow-xl'
      >
        <h2 className="text-white text-2xl sm:text-3xl font-semibold mb-6">Reset Your Password</h2>

        <label className='w-full flex flex-col text-gray-300'>
          Password
          <input
            onChange={(e) => setPassword(e.target.value)}
            name='password'
            value={password}
            type='password'
            placeholder='Enter your new password'
            className='mt-2 p-4 bg-search text-white rounded-lg border border-parti focus:outline-none focus:ring-2 focus:ring-input focus:ring-opacity-50'
          />
        </label>

        <button
          type='submit'
          className='w-full p-4 bg-yellow-500 text-black rounded-lg mt-6 font-semibold transition duration-200 hover:bg-yellow-600 focus:outline-none'
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;
