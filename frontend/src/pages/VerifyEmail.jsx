import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import OtpInput from 'react-otp-input';
import { signup } from '../services/authAPI';

const VerifyEmail = () => {
  const signupData = useSelector((state) => state.auth.signupData);
  const navigate = useNavigate();
  const dispatch=useDispatch();
  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, []);

  

  const [otp, setOtp] = useState('');

  const submitHandler=(e)=>{
      e.preventDefault();
      const {
        name,
        email,
        password
      } = signupData;

      dispatch(signup(name,email,password,otp,navigate));
  }


  return (
    <div className='w-screen h-screen flex justify-center items-center bg-primary'>
      <form className='w-[30%] h-full flex-col justify-center item-center pt-[200px] ' onSubmit={submitHandler}>
      <h1 className="text-gray-200 font-semibold text-[1.875rem] leading-[2.375rem]">
            Verify Email
          </h1>
          <p className="text-[1.125rem] leading-[1.625rem] my-4 text-gray-100">
            A verification code has been sent to you. Enter the code below
          </p>
      <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
            />


        <button
          type="submit"
          className="w-full bg-gray-200 hover:bg-gray-300 py-[12px] px-[12px] mt-[80px] rounded-[8px] mt-6 font-medium text-black"
        >
          Verify Email
        </button>

      </form>
    </div>
  )
}

export default VerifyEmail