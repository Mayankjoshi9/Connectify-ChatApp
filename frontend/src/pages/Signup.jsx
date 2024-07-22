import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp, signup } from "../services/authAPI"
import { Link, useNavigate } from 'react-router-dom';
import { setSignupData } from '../slices/auth';


const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name:"",
    email: "",
    password: ""
  })
  const { name,email, password } = formData;

  const changeHandler = (e) => {
    setFormData((prevData) => (
      {
        ...prevData,
        [e.target.name]: e.target.value,
      }))
  }

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(setSignupData(formData));
    dispatch(sendOtp(email,navigate));
    setFormData({name:"",email:"",password:""});
    setSignupData(formData);
  }

  const loading = useSelector((state) => state.auth.loading)

  return (
    <div className='w-full h-full flex justify-center items-center'>

      {loading ? (<div className='h-full w-full text-center bg-black text-yellow-500'>Loading</div>) :
        (<div className='w-[600px] h-[600px] bg-black rounded-lg flex justify-center items-center'>

          <form onSubmit={submitHandler} className='text-white flex flex-col gap-6 w-[60%]  '>
            <label>name
               <input
                className='text-black'
                required
                type='text'
                value={name}
                name="name"
                onChange={changeHandler}
               />

            </label>
            <label> Enter email
              <input
                className='text-black'
                required
                type='email'
                value={email}
                name="email"
                onChange={changeHandler}
              />
            </label>

            <label> Enter Password
              <input
                className='text-black'
                required
                type='text'
                name="password"
                value={password}
                onChange={changeHandler}
              />
            </label>


            <button type="submit" className='w-[100px] h-[100px] bg-red-300'>
              Signup
            </button>


          </form>

          <Link to="/login" className='w-[100px] h-[100px] bg-yellow-300'>
               Login
          </Link>
        </div >
        )
      }


    </div >
  )
}

export default Signup