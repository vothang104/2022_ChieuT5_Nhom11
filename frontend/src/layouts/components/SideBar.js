import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import CircleIcon from '@mui/icons-material/Circle';
import { Box } from '@mui/system';
import { useSelector } from 'react-redux';

function SideBar() {
    const { list: categories } = useSelector(state => state.category.listCategory);
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <Box>
            <List
                sx={{
                    backgroundColor: 'myColor.white', border: '1px solid #339933', borderRadius: '4px',
                    color: 'primary.main'
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader
                        sx={{ backgroundColor: 'primary.main', borderRadius: '4px', color: 'myColor.white', fontWeight: 550 }}
                        component="div" id="nested-list-subheader">
                        Kính chào bạn đọc
                    </ListSubheader>
                }
            >
                <ListItemButton sx={{ marginBottom: 1 }}>
                    <ListItemIcon>
                        <HomeIcon color='primary' />
                    </ListItemIcon>
                    <ListItemText sx={{ fontWeight: '550' }} primary='Trang chủ' />
                </ListItemButton>

                <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                        <FormatAlignCenterIcon color='primary' />
                    </ListItemIcon>
                    <ListItemText sx={{ fontWeight: '550' }} primary="Thể loại" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {
                            categories &&
                            categories.map(cate => (
                                <ListItemButton key={cate.id} sx={{ pl: 4 }}>
                                    <ListItemIcon>
                                        <CircleIcon sx={{ fontSize: '12px' }} color='primary' />
                                    </ListItemIcon>
                                    <ListItemText primary={cate.name} />
                                </ListItemButton>
                            ))
                        }
                    </List>
                </Collapse>

                <ListItemButton sx={{ marginBottom: 1 }}>
                    <ListItemIcon>
                        <NewspaperIcon color='primary' />
                    </ListItemIcon>
                    <ListItemText sx={{ fontWeight: '550' }} primary='Tin tức' />
                </ListItemButton>
                <ListItemButton sx={{ marginBottom: 1 }}>
                    <ListItemIcon>
                        <ContactMailIcon color='primary' />
                    </ListItemIcon>
                    <ListItemText sx={{ fontWeight: '550' }} primary='Liên hệ' />
                </ListItemButton>
            </List>
        </Box>
    )
}

export default SideBar