import { useState } from 'react'
import { resetPasswordToken } from '../services/authAPI';
import { useDispatch, useSelector } from 'react-redux';

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const dispatch=useDispatch();
  const loading=useSelector((state)=>state.auth.loading);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(resetPasswordToken(email, setEmailSent));
  }
  return (
    <div className='w-full h-full flex justify-center items-center bg-red-300'>
      {loading ? (
        <div className='loader'>Loading</div>
      ) :(
          <div className='w-full h-full bg-slate-300'>
           <p className='text-center text-xl font-extrabold text-purple-900'>{!emailSent?"send mail":"resend mail"}</p>
          <form onSubmit={submitHandler} className='text-black w-[80%] h-[60%] flex flex-col justify-center items-center bg-purple-300  gap-6   '>
            {!emailSent && (<label>email
              <input
                className='text-black'
                required
                name='email'
                type='email'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </label>
            )}

            <button className='w-[100px] h-[50px] bg-slate-400' type='submit'>{!emailSent?"Send Email":"Resend Email"}</button>
          </form>
          </div>
        )}

    </div>
  )
}

export default ResetPassword