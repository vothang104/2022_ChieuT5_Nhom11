import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Grid, Typography } from '@mui/material'
import Book from '../components/books/Book'
import Secondary from '../layouts/Secondary'
import { getAllBook } from '../redux/apiRequest'

function HomePage() {
    const dispatch = useDispatch();
    const { list: listBook } = useSelector(state => state.book.listBook);
    useEffect(() => {
        getAllBook(dispatch);
    }, [dispatch])
    useEffect(() => {
        document.title = 'Thư viện - Trang chủ';
    }, [])
    return (
        <Secondary>
            <Box className='no-scroll' sx={{ maxHeight: 'calc(100vh - 76px)', paddingBottom: 2, paddingRight: 2, overflow: 'auto' }}>
                <Typography sx={{ marginBottom: 1, padding: '8px 0' }} variant='h4' >SÁCH MỚI NHẤT</Typography>
                <Grid container spacing={2}>
                    {
                        listBook &&
                        listBook.map(book => (
                            <Grid key={book.id} item xs={6} md={4}>
                                <Box sx={{ height: '100%' }}>
                                    <Book book={book} />
                                </Box>
                            </Grid>
                        ))
                    }
                </Grid>
            </Box>
        </Secondary >
    )
}

export default HomePage