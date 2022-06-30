import React from 'react';
import styles from './profile-photo.module.scss';
import {Box, Link, Button, Typography, ButtonBase, ImageList, ImageListItem} from "@mui/material";


const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
    },
    {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats',
    },
    {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        title: 'Honey',
    },
    {
        img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
        title: 'Basketball',
    },
    {
        img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
        title: 'Fern',
    },
    {
        img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
        title: 'Mushrooms',
    }
];

const ProfilePhoto = () => {
    return (
        <Box className={styles.profilePhoto}>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography sx={{
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    color: '#050505',
                    padding: '10px 0px 4px 10px'
                }}>Ảnh</Typography>
                <Button sx={{textTransform: 'none'}}>
                    <Link href='/photo'
                          sx={{textDecoration: 'none', alignSelf: 'center', fontSize: '1rem', fontWeight: '400'}}>Xem
                        tất cả ảnh</Link>
                </Button>
            </Box>
            <ImageList sx={{ width: '100%', height: 450 , padding: '5px', borderRadius: '5px'}} cols={3} rowHeight={150}>
                {itemData.map((item) => (
                    <ImageListItem key={item.img} >
                            <img
                                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                alt={item.title}
                                loading="lazy"
                            />
                    </ImageListItem>
                ))}
            </ImageList>
        </Box>
    )
}

export default ProfilePhoto;