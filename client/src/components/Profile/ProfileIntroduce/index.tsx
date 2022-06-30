import React from 'react';
import styles from './profile-introduce.module.scss';
import {Box, Grid, Typography, Button, IconButton} from "@mui/material";
import IntroduceItem from "../IntroduceItem";
import FeaturedStory from "../FeaturedStory";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const ProfileIntroduce = () => {
    return (
        <Box className={styles.introduce}>
            <Typography sx={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#050505',
                padding: '10px 0px 4px 10px'
            }}>Giới thiệu</Typography>
            <Typography className={styles.maxim}>🌻</Typography>
            <Button className={styles.editButton}>
                <Typography sx={{
                    color: '#050505',
                    fontSize: '.875rem',
                    fontWeight: '600'
                }}>Chỉnh sửa tiểu sử</Typography>
            </Button>
            <Box className={styles.introduceItemRender}>
                <IntroduceItem/>
            </Box>
            <Button className={styles.editButton}>
                <Typography sx={{
                    color: '#050505',
                    fontSize: '.875rem',
                    fontWeight: '600'
                }}>Chỉnh sửa chi tiết</Typography>
            </Button>
            <Box className={styles.storyFeatured}>
                <Grid container className={styles.storyContainer}>
                    <FeaturedStory
                        story={{image: 'https://scontent.fdad3-3.fna.fbcdn.net/v/t51.36329-10/251960777_594354971815267_1035203072008824307_n.jpg?stp=dst-jpg_p296x100&_nc_cat=111&ccb=1-7&_nc_sid=ad6a45&_nc_ohc=0ecDDbH29swAX_7lMMb&_nc_ht=scontent.fdad3-3.fna&oh=00_AT-RNVRUHATwhw9jWnbhB5k1Kyl2NezIAQtXrXaGTdwxfw&oe=62C25135'}}/>
                    <FeaturedStory
                        story={{image: 'https://scontent.fdad3-1.fna.fbcdn.net/v/t51.36329-10/278768526_147636591103206_3287108303023869439_n.jpg?stp=dst-jpg_p296x100&_nc_cat=110&ccb=1-7&_nc_sid=ad6a45&_nc_ohc=_AS3vBMSHYUAX988H4f&_nc_ht=scontent.fdad3-1.fna&oh=00_AT92ERZQpSD7zOCTU8iW_K0F86MoZgvIY1PNGfmmtBc-TA&oe=62C0A0FF'}}/>
                    <FeaturedStory
                        story={{image: 'https://scontent.fdad3-5.fna.fbcdn.net/v/t1.6435-9/120201888_2739684979602112_816336616069865569_n.jpg?stp=dst-jpg_p296x100&_nc_cat=102&ccb=1-7&_nc_sid=5b7eaf&_nc_ohc=CoGemExfcQ4AX9y0HzF&_nc_ht=scontent.fdad3-5.fna&oh=00_AT89464NDgImX4vQUmHIBm3iUThcBWEzHDAi5wHtUJ3uCw&oe=62E32B3C'}}/>
                    <Box className={styles.seeAll}>
                        <IconButton sx={{
                            backgroundColor: 'white',
                            boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.2)',
                            '&:hover': {backgroundColor: 'white'}
                        }}>
                            <ArrowForwardIcon/>
                        </IconButton>
                    </Box>
                </Grid>
            </Box>
            <Button className={styles.editButton}>
                <Typography sx={{
                    color: '#050505',
                    fontSize: '.875rem',
                    fontWeight: '600'
                }}>Chỉnh sửa phần đáng chú ý</Typography>
            </Button>
        </Box>
    )
}

export default ProfileIntroduce;