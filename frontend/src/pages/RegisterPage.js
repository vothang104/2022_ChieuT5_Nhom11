import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Main from '../layouts/Main';
import Background from '../images/background-library.jpg';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, Link, OutlinedInput } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../redux/apiRequest';
import { useDispatch } from 'react-redux';

const scheme = yup.object({
    fullName: yup.string().required('Vui lòng điền đầy đủ họ tên'),
    email: yup.string().required('Vui lòng điền địa chỉ email').email('Email không đúng định dạng'),
    phoneNumber: yup.string().required('Vui lòng cung cấp số điện thoại').matches(
        /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/,
        'Số điện thoại không chính xác'
    ),
    password: yup.string().required('Vui lòng nhập mật khẩu').min(6, 'Mật khẩu phải chứa ít nhất 6 ký tự'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Mật khẩu xác nhận không trùng khớp')
})


export default function RegisterPage() {
    const dispatch = useDispatch();
    const [views, setViews] = useState({
        password: false,
        confirmPassword: false
    });
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            phoneNumber: '',
            password: '',
            confirmPassword: ''
        },
        mode: 'onChange',
        resolver: yupResolver(scheme)
    });
    const navigate = useNavigate();
    // submit
    const onSubmit = (values) => {
        return new Promise(resovle => {
            setTimeout(async () => {
                await registerUser(values, dispatch, navigate);
                resovle();
            }, 2000);
        })
    };
    useEffect(() => {
        document.title = 'Thư viện - Đăng ký'
    }, [])

    return (
        <Main>
            <Box
                sx={{
                    backgroundImage: `url(${Background})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    marginTop: '60px',
                    height: 'calc(100vh - 60px)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '0 20px'
                }}
            >
                <Box
                    className='have-y-scroll'
                    sx={{
                        padding: 5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        borderRadius: 2,
                        boxShadow: 12,
                        height: '95%',
                        overflow: 'auto',
                        maxWidth: 'sm',
                        opacity: 0.9
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">ĐĂNG KÝ</Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    {...register('fullName')}
                                    autoComplete="off"
                                    fullWidth
                                    label="Họ tên"
                                    autoFocus
                                />
                                {
                                    errors?.fullName &&
                                    <FormHelperText sx={{ marginTop: '5px', fontStyle: 'italic', color: 'myColor.error' }} component='p'>{errors.fullName.message}</FormHelperText>
                                }
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    {...register('email')}
                                    fullWidth
                                    label="Email"
                                    autoComplete="off"
                                />
                                {
                                    errors?.email &&
                                    <FormHelperText sx={{ marginTop: '5px', fontStyle: 'italic', color: 'myColor.error' }} component='p'>{errors.email.message}</FormHelperText>
                                }
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    {...register('phoneNumber')}
                                    fullWidth
                                    label="Số điện thoại"
                                    autoComplete="off"
                                />
                                {
                                    errors?.phoneNumber &&
                                    <FormHelperText sx={{ marginTop: '5px', fontStyle: 'italic', color: 'myColor.error' }} component='p'>{errors.phoneNumber.message}</FormHelperText>
                                }
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Mật khẩu</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={views.password ? 'text' : 'password'}
                                        {...register('password')}
                                        endAdornment={
                                            <InputAdornment id='1' position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    edge="end"
                                                    onClick={() => setViews(prev => ({ ...prev, password: !prev.password }))}
                                                >
                                                    {!views.password ?
                                                        <VisibilityOff fontSize='small' /> :
                                                        <Visibility fontSize='small' />
                                                    }
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                    {
                                        errors?.password &&
                                        <FormHelperText sx={{ margin: '5px 0 0 0', fontStyle: 'italic', color: 'myColor.error' }} component='p'>{errors.password.message}</FormHelperText>
                                    }
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-confirm">Nhập lại mật khẩu</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-confirm"
                                        type={views.confirmPassword ? 'text' : 'password'}
                                        {...register('confirmPassword')}
                                        endAdornment={
                                            <InputAdornment id='2' position="end">
                                                <IconButton
                                                    onClick={() => setViews(prev => ({ ...prev, confirmPassword: !prev.confirmPassword }))}
                                                    aria-label="toggle password visibility"
                                                    edge="end"
                                                >
                                                    {!views.confirmPassword ?
                                                        <VisibilityOff fontSize='small' /> :
                                                        <Visibility fontSize='small' />
                                                    }
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Nhập lại mật khẩu"
                                    />
                                    {
                                        errors?.confirmPassword &&
                                        <FormHelperText sx={{ margin: '5px 0 0 0', fontStyle: 'italic', color: 'myColor.error' }} component='p'>{errors.confirmPassword.message}</FormHelperText>
                                    }
                                </FormControl>
                            </Grid>
                        </Grid>
                        <LoadingButton
                            loading={isSubmitting}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Đăng ký
                        </LoadingButton>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link onClick={() => navigate('/login')} sx={{ cursor: 'pointer' }}>
                                    Bạn đã có tài khoản? Đăng nhập
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </Main>
    );
}