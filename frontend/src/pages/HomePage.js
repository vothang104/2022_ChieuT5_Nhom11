import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import Book from '../components/books/Book'
import Secondary from '../layouts/Secondary'

function HomePage() {
    return (
        <Secondary>
            <Box sx={{ minHeight: 'calc(100vh - 76px)', paddingBottom: 2 }}>
                <Typography sx={{ marginBottom: 1, padding: '8px 0' }} variant='h4' >SÁCH MỚI NHẤT</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={6} md={4}>
                        <Box sx={{ height: '100%' }}>
                            <Book description='Khi tới Đức dự hội nghị thượng đỉnh G7, Tổng thống Mỹ Joe Biden nỗ lực khởi động lại kế hoạch của mình nhằm đối trọng với Sáng kiến Vành đai và Con đường (BRI), siêu dự án cơ sở hạ tầng và thương mại do Chủ tịch Trung Quốc Tập Cận Bình khởi xướng.' />
                        </Box>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <Box sx={{ height: '100%' }}>
                            <Book
                                description='
                            Khi tới Đức dự hội nghị thượng đỉnh G7, Tổng thống Mỹ Joe
                            '
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <Box sx={{ height: '100%' }}>
                            <Book
                                description='
                            Khi tới Đức dự hội nghị thượng đỉnh G7, Tổng thống Mỹ Joe
                            '
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <Box sx={{ height: '100%' }}>
                            <Book
                                description='
                            Khi tới Đức dự hội nghị thượng đỉnh G7, Tổng thống Mỹ Joe
                            '
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Secondary >
    )
}

export default HomePage