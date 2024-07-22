import { useState } from 'react'
import { CgProfile } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";
import { logout } from '../services/authAPI';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { searchUser } from '../services/searchApi';
import ChatSession from "../components/chat/ChatSession"
import Profile from '../components/chat/Profile';
import { CreateSession } from '../services/chatAPI';



const Home = () => {
    const [search, setSearch] = useState("");
    const [user, setUser] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loading = useSelector((state) => state.auth.loading);
    const curruser=useSelector((state)=>state.auth.user);


    const sessionHandler=(e)=>{
        e.preventDefault();
        setSearch("");
        dispatch(CreateSession(curruser,user))
        
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(searchUser(search, setUser));
    }
    return (
        <div className='w-full h-full flex flex-col  text-black '>

            <nav className=' bg-pink-400 w-full h-[8%] flex justify-between items-center'>
                <button><CgProfile className='text-[50px] text-yellow-200'></CgProfile></button>
                <button className='w-[100px] h-[50px] bg-red-500' onClick={() => { dispatch(logout(navigate)) }}>Logout</button>

            </nav>
            {
                loading ? (
                    <div className='loader'>Loading</div>
                ) : (
                    <div className='w-full h-full flex bg-slate-300' >
                        <div className='w-[35%] h-full  text-black flex flex-col justify-start items-center'>


                            <div className='w-full h-[10%] flex flex-col '>
                                <div className='w-full h-full    bg-black pr-3'>
                                    <form onSubmit={submitHandler} className='flex justify-center items-center w-full relative h-[80%] m-[5px] bg-white  '>
                                        <input
                                            onChange={(e) => { setSearch(e.target.value) }}
                                            className='h-full w-full pl-[20px]'
                                            placeholder='Search...'
                                        />

                                        <button type='submit'>
                                            <FaSearch className='text-xl text-center absolute right-7 top-2' />
                                        </button>
                                    </form>
                                </div>

                            </div>



                            <div className='h-[90%] w-full  bg-green-100'>
                                {search == "" ? (<></>) : (
                                    <button onClick={sessionHandler} className='bg-pink-500 flex justify-around text-black w-full h-[40px] '>
                                        <p className='text-[20px]'>{user.name}</p>
                                        <p className='text-[15px]'>{search}</p>
                                    </button>
                                )}




                            </div>



                        </div>


                        <ChatSession />

                        <Profile />

                    </div>
                )
            }


        </div>
    )
}

export default Home