import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/authAPI";
import ProfileModel from '../models/ProfileModel';
import { MdOutlineMenu } from "react-icons/md";
import PropTypes from "prop-types";



export default function NavDashboard({socket}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const curruser=useSelector((state)=>state.auth.user);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <MdOutlineMenu className="w-8 h-8" />
            </Button>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <MenuItem >
                    <ProfileModel user={curruser} className="w-full h-full"/>
                </MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={() => {
                    socket.disconnect();
                    dispatch(logout(navigate));
                }}>
                    Logout
                </MenuItem>
            </Menu>
        </div>
    );
}

NavDashboard.propTypes = {
  socket: PropTypes.object.isRequired,
};