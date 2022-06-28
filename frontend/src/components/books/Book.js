import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

export default function Book({ description }) {
    return (
        <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardActionArea>
                <CardMedia
                    sx={{
                        height: '250px'
                    }}
                    component="img"
                    height="140"
                    image="https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9va3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Tên sách
                    </Typography>
                    <Typography sx={{
                        flexGrow: '1',
                        flexShrink: '0'
                    }} className='four-lines' variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions sx={{ marginTop: 'auto' }}>
                <Button
                    sx={{

                    }}
                    startIcon={
                        <RemoveRedEyeIcon sx={{ marginBottom: '3px', }} fontSize='small' color='primary' />
                    }
                    size="small" color="primary">
                    Xem thêm
                </Button>
            </CardActions>
        </Card>
    );
}