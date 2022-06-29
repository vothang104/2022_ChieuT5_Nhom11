import React from 'react'
import { Grid } from '@mui/material'
import { Box, Container } from '@mui/system'
import Header from './components/Header'
import SideBar from './components/SideBar'
import ParentProvider from '../contexts/ParentProvider'

function Secondary({ children }) {
    return (
        <>
            <ParentProvider>
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
            </ParentProvider>
        </>
    )
}

export default Secondary