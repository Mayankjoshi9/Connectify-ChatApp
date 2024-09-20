const NoSession = () => {
  return (
    <div className='w-[40%] h-full flex flex-col items-center justify-center bg-[#2a3942] text-gray-300 p-8'>
      <div className='text-center'>
        <svg className='w-24 h-24 text-gray-500 mx-auto mb-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 9L12 15L18 9' />
        </svg>
        <h1 className='text-3xl font-bold mb-4'>No Chat Selected</h1>
        <p className='text-gray-400'>Please select a chat from the list to start a conversation.</p>
      </div>
    </div>
  );
};

export default NoSession;
