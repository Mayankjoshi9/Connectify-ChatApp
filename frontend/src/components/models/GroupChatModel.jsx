import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import PropTypes from "prop-types";
import { useSelector } from "react-redux"
import { MdOutlineGroups } from "react-icons/md";
import GroupCard from '../card/GroupCard';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width:'50%' ,
  minWidth:300,
    height: 500,
    bgcolor:  '#111b21',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: 5,
};

export default function GroupChatModel({handleSession}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const session = useSelector((state) => state.chat.session);

    return (
        <div>
            <Button onClick={handleOpen}>
                <div
                    className="flex w-[400px] h-full gap-5 items-center pl-20 mr-10 cursor-pointer"
                    onClick={handleOpen}
                >
                    <div className="bg-parti h-10 w-10 rounded-full flex items-center justify-center">

                        <MdOutlineGroups className="w-8 h-8" />
                    </div>
                    <div className="text-white text-xl font-semibold">{session?.groupName}</div>
                </div>
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
                       <GroupCard handleSession={handleSession}/>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

GroupChatModel.propTypes = {
  
  handleSession:PropTypes.func.isRequired
};