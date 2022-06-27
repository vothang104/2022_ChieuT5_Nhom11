import { Box, Button, Container, Stack, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/logo.png'
import User from './User';

function Header() {
    const navigate = useNavigate();
    const { currentUser } = useSelector(state => state.auth.login);
    return (
        <Box
            sx={{
                position: 'fixed',
                zIndex: 100,
                top: 0,
                left: 0,
                width: '100%',
                height: '60px',
                backgroundColor: 'primary.main',
            }}
        >
            <Container sx={{ height: '100%' }} maxWidth='lg'>
                <Stack height={'100%'} direction='row' justifyContent='space-between' alignItems='center'>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: '10px', color: 'myColor.white' }}>
                        <img
                            onClick={() => navigate('/')}
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                                objectFit: 'cover',
                                cursor: 'pointer'
                            }}
                            src={logo} alt="logo"
                        />
                        <Typography variant='h5'>Thư viện</Typography>
                    </Box>
                    {
                        Object.entries(currentUser).length > 0 ?
                            <User currentUser={currentUser} /> :
                            <Stack direction='row' spacing={2}>
                                <Button
                                    onClick={() => navigate('/login')}
                                    sx={{
                                        backgroundColor: 'myColor.white',
                                        '&:hover': {
                                            backgroundColor: 'myColor.white',
                                            transition: 'all linear 0.1s',
                                            transform: 'translate(0px, -1px)',
                                        }
                                    }}
                                    variant='outlined'
                                >Đăng nhập</Button>
                                <Button
                                    onClick={() => navigate('/register')}
                                    sx={{
                                        display: { xs: 'none', sm: 'block' },
                                        backgroundColor: 'myColor.white',
                                        '&:hover': {
                                            backgroundColor: 'myColor.white',
                                            transition: 'all linear 0.1s',
                                            transform: 'translate(0px, -1px)',
                                        }
                                    }}
                                    variant='outlined'
                                >Đăng ký</Button>
                            </Stack>
                    }
                </Stack>
            </Container>
        </Box>
    )
}

export default Header