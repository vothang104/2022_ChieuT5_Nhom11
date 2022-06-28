import { createTheme } from '@mui/material'

const myTheme = createTheme({
    palette: {
        primary: {
            main: '#339933'
        },
        myColor: {
            white: '#fff',
            black: '#000',
            error: '#e60000'
        },
        danger: {
            main: '#cc0000'
        }
    }
})

export default myTheme;