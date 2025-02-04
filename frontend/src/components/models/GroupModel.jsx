import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';

import { FaUserGroup } from "react-icons/fa6";
import GroupComp from '../common/GroupComp';
import PropTypes from "prop-types";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  height:500,
  bgcolor: '#111b21',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius:5,
};

export default function GroupModel({socket}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>
      <FaUserGroup className="h-[25px] w-[25px]"/>
      </Button>
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
            <GroupComp handleClose={handleClose} socket={socket}/>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

GroupModel.propTypes = {
  socket: PropTypes.object.isRequired, // Ensures socket is an object and required
};