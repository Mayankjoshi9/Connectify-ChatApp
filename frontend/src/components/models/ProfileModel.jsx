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
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius:"16px"
};

const ProfileModel=({type}) =>{
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const curruser = useSelector((state) => state.auth.user);
  const sessionUser = useSelector((state) => state.chat.sessionUser);



  return (
    <div className="w-full h-full">
      {type=="my"? (<div className="w-full h-full" onClick={handleOpen}>
        Profile
      </div>):(
        <div
          className="flex w-[400px] h-full gap-5 pt-1 pl-20 mr-10 cursor-pointer"
          onClick={handleOpen}
        >
          <img
            className="w-[35px] h-[35px] rounded-full"
            src={sessionUser?.additionalDetails?.image}
          />
          <div className="text-white text-xl font-semibold">{sessionUser?.name}</div>
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
              {type=="my" ?(<ProfileComp user={curruser}/>):(<ProfileComp user={sessionUser}/>)}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}


ProfileModel.prototype={
    type:PropTypes.string.isRequired,
}

export default ProfileModel;