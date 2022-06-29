import React, { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Box } from '@mui/system'
import Secondary from '../layouts/Secondary'
import { useParams } from 'react-router-dom'
import { Grid, Stack, Typography, CardMedia, Button } from '@mui/material';
import BorrowBookModal from '../components/modal/BorrowBookModal';
import { useBorrowedBookContext } from '../contexts/borrowedBookContext'
import { getAllBorrowedBook } from '../reducers/apiRequestContext'

function DetailPage() {
    const { id } = useParams();
    const [stateBorrowedBook, dispatchBorrowedBook] = useBorrowedBookContext();
    const { list: listBook } = useSelector(state => state.book.listBook);
    const { list: listCategory } = useSelector(state => state.category.listCategory)
    const [openModal, setOpenModal] = React.useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    // tim sach tu id
    const book = useMemo(() => {
        if (id && listBook?.length > 0) {
            return listBook.find(item => item.id === Number(id));
        }
    }, [id, listBook]);
    // tim the loai
    const category = useMemo(() => {
        if (book && listCategory?.length > 0) {
            return listCategory.find(item => item.id === book.categoryId);
        }
    }, [book, listCategory])
    // get number available
    const numberAvailable = useMemo(() => {
        if (book && stateBorrowedBook?.list && stateBorrowedBook?.list.length > 0) {
            const currentBooks = stateBorrowedBook.list.filter(item => item.bookId === book.id);
            if (currentBooks?.length > 0) {
                return book.numbers - currentBooks.reduce((initValue, item) => {
                    return initValue + item.numbers
                }, 0)
            }
        }
    }, [stateBorrowedBook, book])
    // get all borrowed book
    useEffect(() => {
        getAllBorrowedBook(dispatchBorrowedBook);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        document.title = 'Thư viện - Chi tiết';
    }, [])
    return (
        <Secondary>
            <Box className='no-scroll' sx={{ maxHeight: 'calc(100vh - 76px)', paddingBottom: 2, paddingRight: 2, overflow: 'auto' }}>
                <Typography sx={{ marginBottom: 1, padding: '8px 0' }} variant='h4' >CHI TIẾT SÁCH</Typography>
                <Stack>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={5}>
                            <CardMedia
                                component='img'
                                src={book?.thumbnail}
                                sx={{ width: '100%', height: '350px', borderRadius: '4px' }} />
                        </Grid>
                        <Grid item xs={12} md={7} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Stack spacing={1}>
                                <Stack spacing={2} direction='row' alignItems='center'>
                                    <Typography variant='h6'>Tên sách:</Typography>
                                    <Typography sx={{ marginTop: '5px' }} variant='body1'>{book?.title}</Typography>
                                </Stack>
                                <Stack spacing={2} direction='row' alignItems='center'>
                                    <Typography variant='h6'>Thể loại:</Typography>
                                    <Typography sx={{ marginTop: '5px' }} variant='body1'>{category?.name}</Typography>
                                </Stack>
                                <Stack spacing={2} direction='row' alignItems='center'>
                                    <Typography variant='h6'>Tác giả:</Typography>
                                    <Typography sx={{ marginTop: '5px' }} variant='body1'>{book?.author}</Typography>
                                </Stack>
                                <Stack spacing={2} direction='row' alignItems='center'>
                                    <Typography variant='h6'>Số lượng có sẵn:</Typography>
                                    <Typography sx={{ marginTop: '5px' }} variant='body1'>{numberAvailable || book?.numbers} quyển</Typography>
                                </Stack>
                                <Stack spacing={2} direction='row' alignItems='center'>
                                    <Typography variant='h6'>Ngày xuất bản:</Typography>
                                    <Typography sx={{ marginTop: '5px' }} variant='body1'>{book?.publishedDate}</Typography>
                                </Stack>
                                <Stack spacing={2} direction='row' alignItems='center'>
                                    <Typography variant='h6'>Nhà xuất bản:</Typography>
                                    <Typography sx={{ marginTop: '5px' }} variant='body1'>{book?.publishedCompany}</Typography>
                                </Stack>
                                <Stack spacing={2} direction='row' alignItems='center'>
                                    <Typography variant='h6'>Giá :</Typography>
                                    <Typography sx={{ marginTop: '5px' }} variant='body1'>{book?.price}<sup>đ</sup></Typography>
                                </Stack>
                            </Stack>
                            <Box sx={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
                                <Button disabled={numberAvailable === 0} onClick={handleOpenModal} variant='contained'>Mượn sách</Button>
                                <BorrowBookModal book={book} open={openModal} handleClose={handleCloseModal} />
                            </Box>
                        </Grid>
                    </Grid>
                    <Box sx={{ marginTop: 2 }}>
                        <Typography textAlign='justify' variant='body1'>{book?.description}</Typography>
                    </Box>
                </Stack>
            </Box>
        </Secondary>
    )
}

export default DetailPage