import { useState } from 'react';
import { resetPasswordToken } from '../services/authAPI';
import { useDispatch, useSelector } from 'react-redux';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(resetPasswordToken(email, setEmailSent));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
      {loading ? (
        <div className="text-white text-2xl">Loading...</div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            {emailSent ? 'Resend Password Reset Email' : 'Reset Your Password'}
          </h2>
          <form onSubmit={submitHandler} className="flex flex-col gap-4">
            {!emailSent && (
              <div className="flex flex-col">
                <label htmlFor="email" className="text-gray-600 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your email"
                />
              </div>
            )}

            <button
              type="submit"
              className="mt-4 p-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
            >
              {emailSent ? 'Resend Email' : 'Send Email'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
