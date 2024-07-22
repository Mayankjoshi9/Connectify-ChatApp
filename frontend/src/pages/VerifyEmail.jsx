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
    <div className='w-screen h-screen flex justify-center items-center bg-black'>
      <form className='' onSubmit={submitHandler}>
        <OtpInput

          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span>-</span>}
          renderInput={(props) => <input className='w-[100px] rounded-[0.5rem]' style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
            {...props} />}
          containerStyle={{
            justifyContent: "space-between",
            gap: "0 6px",
          }}
        />

        <button
          type="submit"
          className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"
        >
          Verify Email
        </button>

      </form>
    </div>
  )
}

export default VerifyEmail