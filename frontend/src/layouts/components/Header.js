import React, { useEffect, useState } from 'react'
import './Header.scss'
import { Box, Container, Stack, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/logo.png'
import User from './User';
import { NavLink, Link } from 'react-router-dom'
import { getAllBook, getAllCategory } from '../../redux/apiRequest';
import { changeFilterName } from '../../redux/bookSlice';

function Header() {
    const navigate = useNavigate();
    const { currentUser } = useSelector(state => state.auth.login);
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');

    useEffect(() => {
        const searchBook = async () => {
            await dispatch(changeFilterName(search));
            getAllBook(dispatch);
        }
        searchBook();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search])

    useEffect(() => {
        getAllCategory(dispatch);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
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
                    <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', gap: '40px', color: 'myColor.white' }}>
                        <Box
                            sx={{ display: 'flex', alignItems: 'flex-end', gap: '10px', color: 'myColor.white' }}
                        >
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
                        <Stack height='100%' direction='row' spacing={3}>
                            <NavLink className='navigation-link' to='/'>Trang chủ</NavLink>
                            <NavLink onClick={(e) => e.preventDefault()} className='navigation-link' to='/category'>Thể loại</NavLink>
                            <NavLink onClick={(e) => e.preventDefault()} className='navigation-link' to='/category'>Tin tức</NavLink>
                            <NavLink onClick={(e) => e.preventDefault()} className='navigation-link' to='/category'>Liên hệ</NavLink>
                        </Stack>
                    </Box>
                    <Box>
                        <div className="wrapper-search">
                            <input value={search} onChange={(e) => setSearch(e.target.value)} className='search' type="text" placeholder='Bạn muốn tìm gì?' />
                            <span className='search-icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </span>
                        </div>
                    </Box>
                    {
                        currentUser &&
                            Object.entries(currentUser).length > 0 ?
                            <User currentUser={currentUser} /> :
                            <Stack direction='row' spacing={1} alignItems='center'>
                                <Link className='action-link' to='/login'>Đăng nhập</Link>
                                <span
                                    style={{
                                        textDecoration: 'none',
                                        color: 'white',
                                        fontWeight: 200
                                    }}
                                >|</span>
                                <Link className='action-link' to='/register'>Đăng ký</Link>
                            </Stack>
                    }
                </Stack>
            </Container>
        </Box>
    )
}

export default Header