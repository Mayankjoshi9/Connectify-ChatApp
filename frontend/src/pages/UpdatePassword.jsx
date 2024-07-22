import  { useState } from 'react'
import { useDispatch } from 'react-redux';
import { resetPassword } from '../services/authAPI';
import { useLocation, useNavigate } from 'react-router-dom';

const UpdatePassword = () => {
    const [password,setPassword]=useState("");
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const location=useLocation();
    const submitHandler=(e)=>{
        e.preventDefault();
        const token=location.pathname.split("/").at(-1);
        dispatch(resetPassword(password,token,navigate));
    }
  return (
    <div className='w-full h-full flex justify-center items-center'>
        <form onSubmit={submitHandler} className='bg-blue-500 w-[80%] h-[70%] flex flex-col justify-center items-center gap-10'>
            <label className='text-black'>
                Password
                <input
                    onChange={(e)=>{
                        setPassword(e.target.value);
                    }}
                    name='password'
                    value={password}
                    type='text'
                    className='text-black'
                />
            </label>

            <button type='submit' className='w-[80px] h-[40px] bg-red-500 '>submit</button>
        </form>
    </div>
  )
}

export default UpdatePassword