import { Grid } from '@mui/material'
import { Box, Container } from '@mui/system'
import React from 'react'
import Header from './components/Header'
import SideBar from './components/SideBar'

function Secondary({ children }) {
    return (
        <>
            <Header />
            <Box
                sx={{
                    position: 'relative',
                    marginTop: '60px',
                    paddingTop: 2
                }}
            >
                <Container maxWidth='lg'>
                    <Grid container spacing={2} alignItems='stretch'>
                        <Grid item xs={0} md={3}>
                            <SideBar />
                        </Grid>
                        <Grid item xs={12} md={9}>
                            {children}
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    )
}

export default Secondary