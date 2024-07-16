import React, { useState } from 'react'
import { CgProfile } from "react-icons/cg";

const Home = () => {
    const [search,setSearch] =useState("");
  return (
    <div className='w-[95%] h-[95%] flex flex-row  text-black '>
        <div className='w-[40%] bg-green-500 h-full text-black flex flex-col justify-start items-center'>
            <nav className=' bg-pink-400 w-full h-[8%]'>
                <CgProfile className='text-[50px] text-yellow-200'></CgProfile>
            </nav>

            <div className='w-full h-[92%] flex  '>
                <div className='w-full h-[8%] bg-black'>
                    <form className=' h-[80%] m-[5px] bg-white  '>
                      
                         <input          
                            onChange={(e)=>{setSearch(e.target.value)}}
                            className='h-full w-full pl-[20px]'
                            placeholder='Search...'
                         />
                      
                        
                    </form>
                </div>
            </div>
            
        </div>
        <div className='bg-yellow-200'></div>
    </div>
  )
}

export default Home