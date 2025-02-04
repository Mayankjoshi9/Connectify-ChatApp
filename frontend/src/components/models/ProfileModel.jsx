import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import ProfileComp from '../common/ProfileComp';
import {  useSelector } from "react-redux";
import PropTypes from 'prop-types';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width:'50%' ,
  minWidth:300,
  bgcolor: '#111b21',
  border: '2px solid #000',
  boxShadow: 24,
  p:2,
  borderRadius:"16px"
};

const ProfileModel=({user}) =>{
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const curruser = useSelector((state) => state.auth.user);
 



  return (
    <div className="w-full h-full flex item-center">
      {(user?._id==curruser?._id)? (<div className="flex w-[400px] h-full md:gap-5 gap-5  pt-1 md:pl-20 pl-1 cursor-pointer" onClick={handleOpen}>
        <img
            className="w-[15%] max-w-[35px] min-w-[25px] min-h-[25px] max-h-[35px] h-[15%] rounded-full"
            src={user?.additionalDetails?.image}
          />
          <div className="text-gray-500 text-xl  font-semibold">{user.name} <span>(you)</span></div>
      </div>):(
        <div
          className="flex w-[400px] h-full gap-5 pt-1 md:pl-20 pl-1 mr-10 cursor-pointer"
          onClick={handleOpen}
        >
          <img
            className="w-[35px] h-[35px] rounded-full"
            src={user?.additionalDetails?.image}
          />
          <div className="text-white text-xl font-semibold">{user?.name}</div>
        </div>
      )}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
              <ProfileComp user={user} handleClose={handleClose}/>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}


ProfileModel.propTypes = {
  user: PropTypes.shape({
    _id:PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    additionalDetails: PropTypes.shape({
      image: PropTypes.string, 
    }),
  }).isRequired,
};

export default ProfileModel;