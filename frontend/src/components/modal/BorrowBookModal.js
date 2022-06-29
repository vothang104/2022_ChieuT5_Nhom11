import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Alert, Button, FormHelperText, Grid, IconButton, Stack, Tooltip } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import './BorrowBookModal.scss';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';

const style = {
    position: 'fixed',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, 0)',
    width: 600,
    bgcolor: 'background.paper',
    borderRadius: 1,
    boxShadow: 24,
    p: 4,
};
// lay ngay hien tai
const today = new Date();
const todayString = `${String(today.getFullYear())}-${String(today.getMonth() + 1).padStart(2, 0)}-${String(today.getDate()).padStart(2, 0)}`
// lay 3 ngay sau
const threeDaysAfter = new Date();
threeDaysAfter.setDate(threeDaysAfter.getDate() + 3);
const threeDayAfterString = `${String(threeDaysAfter.getFullYear())}-${String(threeDaysAfter.getMonth() + 1).padStart(2, 0)}-${String(threeDaysAfter.getDate()).padStart(2, 0)}`;
const scheme = yup.object({
    numbers: yup.number().required('Số lượng sách phải lớn hơn 0'),
    borrowedDate: yup.date().min(todayString, 'Ngày mượn tối thiểu phải là hôm nay'),
    borrowRestore: yup.date().when('borrowedDate', (borrowedDate, schema) => {
        if (borrowedDate) {
            const newDate = new Date(borrowedDate);
            newDate.setDate(newDate.getDate() + 7);
            const newDateString = `${String(newDate.getFullYear())}-${String(newDate.getMonth() + 1).padStart(2, 0)}-${String(newDate.getDate()).padStart(2, 0)}`;
            const sevenDays = newDateString;
            return schema.max(sevenDays, 'Thời gian mượn sách tối đa là 7 ngày');
        }
        return schema;
    }).when('borrowedDate', (borrowedDate, schema) => {
        if (borrowedDate) {
            const newDate = new Date(borrowedDate);
            newDate.setDate(newDate.getDate() + 1);
            const newDateString = `${String(newDate.getFullYear())}-${String(newDate.getMonth() + 1).padStart(2, 0)}-${String(newDate.getDate()).padStart(2, 0)}`;
            const aDayAfter = newDateString;
            return schema.min(aDayAfter, 'Ngày trả tối thiểu sau ngày mượn một ngày');
        }
        return schema;
    })
})

export default function BorrowBookModal({ open, handleClose, book }) {
    const navigate = useNavigate();
    const { currentUser } = useSelector(state => state.auth.login);
    const [showAlertError, setShowAlertError] = React.useState(false);
    const [showAlertSuccess, setShowAlertSuccess] = React.useState(false);
    const [showAlertBorrowing, setShowAlertBorrowing] = React.useState(false);
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            numbers: 1,
            borrowedDate: todayString,
            borrowRestore: threeDayAfterString
        },
        mode: 'onChange',
        resolver: yupResolver(scheme)
    });
    // on submit
    const onSubmit = (values) => {
        if (!currentUser?.user) {
            setShowAlertError(true);
            return;
        }
        return new Promise((resovle, reject) => {
            const dataPost = {
                ...values,
                userId: currentUser?.user?.id,
                bookId: book.id,
                borrowStatus: 0
            }
            setTimeout(async () => {
                try {
                    const resp = await axios.post(`${BASE_URL}/borrow`, dataPost, {
                        headers: {
                            token: `Bearer ${currentUser?.accessToken}`
                        }
                    });
                    if (resp && resp.status === 200) {
                        setShowAlertSuccess(true);
                        reset();
                        resovle();
                    }
                } catch (error) {
                    setShowAlertBorrowing(true);
                    reject();
                }
            }, 2000);
        })
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography sx={{ fontWeight: '550' }} textAlign='center' color='primary.main' id="modal-modal-title" variant="h5" component="h2">
                        Xác nhận mượn sách
                    </Typography>
                    {
                        showAlertError &&
                        <Alert
                            action={
                                <Tooltip title='Đi đến đăng nhập'>
                                    <IconButton onClick={() => navigate('/login')}><LoginIcon color='danger' fontSize='small' /></IconButton>
                                </Tooltip>
                            }
                            sx={{ mt: 1 }} severity="error"
                        >
                            Bạn cần đăng nhập để mượn sách
                        </Alert>
                    }
                    {
                        showAlertSuccess &&
                        <Alert
                            sx={{ mt: 1 }} severity="success"
                        >
                            Mượn sách thành công. Vui lòng <strong>kiểm tra email</strong>
                        </Alert>
                    }
                    {
                        showAlertBorrowing &&
                        <Alert
                            sx={{ mt: 1 }} severity="warning"
                        >
                            Vui lòng hoàn trả sách trước khi mượn sách khác
                        </Alert>
                    }
                    <Box onSubmit={handleSubmit(onSubmit)} component='form' sx={{ display: 'flex', flexDirection: 'column', gap: '15px', mt: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item md={3}>
                                <Typography variant='h6'>Tên sách:</Typography>
                            </Grid>
                            <Grid item md={9}>
                                <Typography sx={{ marginTop: '5px' }} variant='body1'>{book?.title}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item md={3}>
                                <Typography variant='h6'>Tác giả:</Typography>
                            </Grid>
                            <Grid item md={9}>
                                <Typography sx={{ marginTop: '5px' }} variant='body1'>{book?.author}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item md={3}>
                                <Typography variant='h6'>Giá :</Typography>
                            </Grid>
                            <Grid item md={9}>
                                <Typography sx={{ marginTop: '5px' }} variant='body1'>{book?.price}<sup>đ</sup></Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item md={3}>
                                <Typography component='label' htmlFor='date-restore' variant='h6'>Số lượng:</Typography>
                            </Grid>
                            <Grid item md={9}>
                                <input
                                    max={2}
                                    min={1}
                                    {...register('numbers')}
                                    style={{ width: 50 }} id='date-restore' className='date-picker' type="number" />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item md={3}>
                                <Typography component='label' htmlFor='date-borrow' variant='h6'>Ngày mượn:</Typography>
                            </Grid>
                            <Grid item md={9}>
                                <input
                                    {...register('borrowedDate')}
                                    id='date-borrow' className='date-picker' type="date"
                                />
                                {errors?.borrowedDate &&
                                    <FormHelperText sx={{ color: 'danger.main', fontStyle: 'italic' }}>{errors.borrowedDate.message}</FormHelperText>
                                }
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item md={3}>
                                <Typography component='label' htmlFor='date-restore' variant='h6'>Ngày trả:</Typography>
                            </Grid>
                            <Grid item md={9}>
                                <input
                                    {...register('borrowRestore')}
                                    id='date-restore' className='date-picker' type="date"
                                />
                                {errors?.borrowRestore &&
                                    <FormHelperText sx={{ color: 'danger.main', fontStyle: 'italic' }}>{errors.borrowRestore.message}</FormHelperText>
                                }
                            </Grid>
                        </Grid>
                        <Stack sx={{ width: '100%', mt: 2 }} direction='row' justifyContent='flex-end'>
                            <Button onClick={handleClose} sx={{ marginRight: 1, color: '#ccc' }} variant='text'>Hủy</Button>
                            <LoadingButton type='submit' loading={isSubmitting} variant="contained">
                                Xác nhận
                            </LoadingButton>
                        </Stack>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
