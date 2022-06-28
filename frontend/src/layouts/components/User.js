import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Avatar, Stack, Tooltip, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import CodeIcon from '@mui/icons-material/Code';
import { logoutUser } from '../../redux/apiRequest';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function User({ currentUser }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    // handle logout
    const handleLogout = () => {
        logoutUser(currentUser?.accessToken, navigate, dispatch);
    }

    return (
        <div>
            <Tooltip title={currentUser?.user?.fullName}>
                <Avatar
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    sx={{
                        width: '24px',
                        height: '24px',
                        backgroundColor: 'white',
                        cursor: 'pointer',
                        '&:hover': {
                            backgroundColor: '#fdfdfd'
                        }
                    }}
                >
                    <PersonIcon fontSize='small' color='primary' />
                </Avatar>
            </Tooltip>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem>
                    <Stack direction='row' spacing={1}>
                        <DriveFileRenameOutlineIcon fontSize='small' color='primary' />
                        <Typography color='primary.main' variant='body1' sx={{ fontWeight: 550 }}>Họ tên:</Typography>
                        <Typography variant='body1'>{currentUser?.user?.fullName}</Typography>
                    </Stack>
                </MenuItem>
                <MenuItem>
                    <Stack direction='row' spacing={1}>
                        <EmailIcon fontSize='small' color='primary' />
                        <Typography color='primary.main' variant='body1' sx={{ fontWeight: 550 }}>Email:</Typography>
                        <Typography variant='body1'>{currentUser?.user?.email}</Typography>
                    </Stack>
                </MenuItem>
                <MenuItem>
                    <Stack direction='row' spacing={1}>
                        <PhoneIphoneIcon fontSize='small' color='primary' />
                        <Typography color='primary.main' variant='body1' sx={{ fontWeight: 550 }}>Số điện thoại:</Typography>
                        <Typography variant='body1'>{currentUser?.user?.phoneNumber}</Typography>
                    </Stack>
                </MenuItem>
                <MenuItem>
                    <Stack direction='row' spacing={1}>
                        <CodeIcon fontSize='small' color='primary' />
                        <Typography color='primary.main' variant='body1' sx={{ fontWeight: 550 }}>Mã số thẻ:</Typography>
                        <Typography variant='body1'>{currentUser?.user?.cardCode}</Typography>
                    </Stack>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <Stack direction='row' spacing={1}>
                        <LogoutIcon color='danger' fontSize='small' />
                        <Typography color='danger.main'>Đăng xuất</Typography>
                    </Stack>
                </MenuItem>
            </Menu>
        </div>
    );
}