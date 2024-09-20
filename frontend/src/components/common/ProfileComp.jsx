import { FaLock } from 'react-icons/fa'; // For the privacy icon
import { HiOutlineShieldCheck } from 'react-icons/hi'; // For security shield icon

const ProfileComp = (user) => {
  
  return (

    <div className=" w-full h-full   mx-auto p-4 bg-slate-800 text-white ">
      <div className='flex flex-col items-center mb-6'>
        <img
          src={user.user.additionalDetails.image}
          className="w-32 h-32 rounded-full border-4 border-white mb-4 shadow-lg"
          alt={user.user.name}
        />
        <h1 className='text-3xl font-semibold mb-2'>{user.user.name}</h1>
        <p className='text-gray-300 text-center mb-4'>
          {user.user.additionalDetails.about}
        </p>
        <div className='flex flex-col items-center text-gray-400'>
          <h2 className='text-lg mb-1'>Joined On: {new Date(user.user.createdAt).toDateString()}</h2>
          <h2 className='text-lg mb-4'>{user.user.email}</h2>
        </div>
      </div>

      <div className='border-t border-gray-600 pt-4'>
        <h3 className='text-lg font-semibold mb-2'>Privacy & Security</h3>
        <div className='flex items-center mb-4'>
          <FaLock className='text-green-400 text-xl mr-3' />
          <span className='text-gray-300'>End-to-end encryption ensures your conversations are private and secure.</span>
        </div>
        <div className='flex items-center mb-4'>
          <HiOutlineShieldCheck className='text-blue-400 text-xl mr-3' />
          <span className='text-gray-300'>Your data is protected by robust security measures.</span>
        </div>
      
      </div>
    </div>
  )
}

export default ProfileComp;
