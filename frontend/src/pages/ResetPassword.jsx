import { useState } from "react";
import { resetPasswordToken } from "../services/authAPI";
import { useDispatch, useSelector } from "react-redux";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(resetPasswordToken(email, setEmailSent));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary px-4">
      {loading ? (
        <div className="text-white text-lg sm:text-2xl">Loading...</div>
      ) : (
        <div className="bg-chat shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-md">
          <h2 className="text-xl sm:text-2xl font-semibold text-center text-white mb-4 sm:mb-6">
            {emailSent ? "Resend Password Reset Email" : "Reset Your Password"}
          </h2>
          <form onSubmit={submitHandler} className="flex flex-col gap-3 sm:gap-4">
            {!emailSent && (
              <div className="flex flex-col">
                <label htmlFor="email" className="text-gray-300 mb-1 sm:mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-3 rounded-md border border-parti bg-search text-white focus:outline-none focus:ring-2 focus:ring-input"
                  placeholder="Enter your email"
                />
              </div>
            )}

            <button
              type="submit"
              className="mt-3 sm:mt-4 p-3 w-full bg-yellow-500 text-black rounded-md hover:bg-yellow-600 transition duration-200"
            >
              {emailSent ? "Resend Email" : "Send Email"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
