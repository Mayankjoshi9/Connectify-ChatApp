import  { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { login } from "../services/authAPI"
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const { email, password } = formData;

  const changeHandler = (e) => {
    setFormData((prevData) => (
      {
        ...prevData,
        [e.target.name]: e.target.value,
      }))
  }

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(login(email, password, navigate));

  }

  const loading = useSelector((state) => state.auth.loading)

  return (
    <div className='w-full h-full flex justify-center items-center'>

      {loading ? (<div className='h-full w-full text-center bg-black text-yellow-500'>Loading</div>) :
        (<div className='w-[600px] h-[600px] bg-black rounded-lg flex justify-center items-center'>

          <form onSubmit={submitHandler} className='text-white flex flex-col gap-6 w-[60%]  '>
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
              Login
            </button>

            <Link to={"/resetpassword"} className='w-[100px] h-[50px] bg-pink-500'>
              resetPassword
            </Link>


          </form>

          <Link to="/signup" className='w-[100px] h-[100px] bg-yellow-300'>
               Signup
          </Link>
        </div >
        )
      }
    </div >
  )
}

export default Login