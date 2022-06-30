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
import { Alert, AlertTitle, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, Link, OutlinedInput } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux'

const scheme = yup.object({
    cardCode: yup.string().required('Vui lòng cung cấp mã số thẻ'),
    password: yup.string().required('Vui lòng nhập mật khẩu').min(6, 'Mật khẩu phải chứa ít nhất 6 ký tự'),
})


export default function RegisterPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { success } = useSelector(state => state.auth.register);
    const { error } = useSelector(state => state.auth.login);
    const [viewPassword, setViewPassword] = useState(false);
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            cardCode: '',
            password: '',
        },
        mode: 'onChange',
        resolver: yupResolver(scheme)
    });
    // submit
    const onSubmit = (values) => {
        return new Promise(resovle => {
            setTimeout(async () => {
                await loginUser(values, dispatch, navigate);
                resovle();
            }, 2000);
        })
    };
    useEffect(() => {
        document.title = 'Thư viện - Đăng nhập'
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
                        maxWidth: 'sm',
                        opacity: 0.9
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">ĐĂNG NHẬP</Typography>
                    {
                        success &&
                        <Alert sx={{ width: '100%' }} severity="success">
                            <AlertTitle>Đăng ký thành công</AlertTitle>
                            Vui lòng kiểm tra email để lấy <strong>Mã số thẻ</strong>
                        </Alert>
                    }
                    {
                        error &&
                        <Alert sx={{ width: '100%', mt: 1 }} severity="error">
                            <AlertTitle>Đăng nhập không thành công</AlertTitle>
                            Kiểm tra <strong>mã số thẻ</strong> hoặc <strong>mật khẩu</strong>
                        </Alert>
                    }
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    {...register('cardCode')}
                                    fullWidth
                                    label="Mã số thẻ"
                                    autoComplete="off"
                                    autoFocus
                                />
                                {
                                    errors?.cardCode &&
                                    <FormHelperText sx={{ marginTop: '5px', fontStyle: 'italic', color: 'myColor.error' }} component='p'>{errors.cardCode.message}</FormHelperText>
                                }
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Mật khẩu</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={viewPassword ? 'text' : 'password'}
                                        {...register('password')}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    edge="end"
                                                    onClick={() => setViewPassword(prev => !prev)}
                                                >
                                                    {!viewPassword ?
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
                        </Grid>
                        <LoadingButton
                            loading={isSubmitting}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Đăng nhập
                        </LoadingButton>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link onClick={() => navigate('/register')} sx={{ cursor: 'pointer' }}>
                                    Bạn chưa có tài khoản? Đăng ký
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </Main>
    );
}