import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useNavigate } from 'react-router-dom';

export default function Book({ book }) {
    const navigate = useNavigate();

    return (
        <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardActionArea onClick={() => navigate(`/detail/${book.id}`)}>
                <CardMedia
                    sx={{
                        height: '250px'
                    }}
                    component="img"
                    height="140"
                    image={book?.thumbnail}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">{book?.title}</Typography>
                    <Typography sx={{
                        flexGrow: '1',
                        flexShrink: '0'
                    }} className='four-lines' variant="body2" color="text.secondary">
                        {book?.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions sx={{ marginTop: 'auto' }}>
                <Button
                    onClick={() => navigate(`/detail/${book.id}`)}
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