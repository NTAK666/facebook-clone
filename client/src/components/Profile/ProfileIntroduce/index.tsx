import React, {useEffect} from 'react';
import styles from './profile-introduce.module.scss';
import {Box, Grid, Typography, Button, IconButton} from "@mui/material";
import IntroduceItem from "../IntroduceItem";
import FeaturedStory from "../FeaturedStory";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {IUserFull} from "../../../app/models/User";
import {useAppSelector} from "../../../app/hook";

interface props {
}
const ProfileIntroduce:React.FC<props> = () => {
    const [self, setSelf] = React.useState(false);
    const {userCurrent} = useAppSelector(state => state.userSlice)
    const {user} = useAppSelector(state => state.authSlice);
    useEffect(() => {
        if (userCurrent.id === user.id) {
            setSelf(true);
        }
    }, [userCurrent, user]);
    return (
        <Box className={styles.introduce}>
            <Typography sx={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#050505',
                padding: '10px 0px 4px 10px'
            }}>Giới thiệu</Typography>
            <Typography className={styles.maxim}>🌻</Typography>
            {self ? <Button className={styles.editButton}>
                <Typography sx={{
                    color: '#050505',
                    fontSize: '.875rem',
                    fontWeight: '600'
                }}>Chỉnh sửa tiểu sử</Typography>
            </Button> : <hr/>}
            <Box className={styles.introduceItemRender}>
                <IntroduceItem/>
            </Box>
            {self ?  <Button className={styles.editButton}>
                <Typography sx={{
                    color: '#050505',
                    fontSize: '.875rem',
                    fontWeight: '600'
                }}>Chỉnh sửa chi tiết</Typography>
            </Button> : null}
            <Box className={styles.storyFeatured}>
                <Grid container className={styles.storyContainer}>
                    <FeaturedStory
                        story={{image: 'https://scontent.fdad3-5.fna.fbcdn.net/v/t1.6435-9/120201888_2739684979602112_816336616069865569_n.jpg?stp=dst-jpg_p296x100&_nc_cat=102&ccb=1-7&_nc_sid=5b7eaf&_nc_ohc=CoGemExfcQ4AX9y0HzF&_nc_ht=scontent.fdad3-5.fna&oh=00_AT89464NDgImX4vQUmHIBm3iUThcBWEzHDAi5wHtUJ3uCw&oe=62E32B3C'}}/>
                    <FeaturedStory
                        story={{image: 'https://scontent.fdad3-5.fna.fbcdn.net/v/t1.6435-9/120201888_2739684979602112_816336616069865569_n.jpg?stp=dst-jpg_p296x100&_nc_cat=102&ccb=1-7&_nc_sid=5b7eaf&_nc_ohc=CoGemExfcQ4AX9y0HzF&_nc_ht=scontent.fdad3-5.fna&oh=00_AT89464NDgImX4vQUmHIBm3iUThcBWEzHDAi5wHtUJ3uCw&oe=62E32B3C'}}/>
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
            {self ? <Button className={styles.editButton}>
                <Typography sx={{
                    color: '#050505',
                    fontSize: '.875rem',
                    fontWeight: '600'
                }}>Chỉnh sửa phần đáng chú ý</Typography>
            </Button> : null}
        </Box>
    )
}

export default ProfileIntroduce;