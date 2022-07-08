import React from 'react';
import {Box, Button, ButtonBase, Container, Grid, IconButton, Typography} from "@mui/material";
import styles from './friend-list.module.scss';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

interface props {
    friend: {
        img: string;
        name: string;
    }
}

const AboutFriendList = () => {
    const FriendItem: React.FC<props> = ({friend}) => {
        return (
            <Grid item xs={5.85} className={styles.friendItem}>
                <img src={friend.img} alt="" className={styles.image}/>
                <Box className={styles.friendInfo}>
                    <Box>
                        <Typography className={styles.name}>{friend.name}</Typography>
                        <Typography className={styles.mutualFriend}>51 bạn chung</Typography>
                    </Box>
                    <IconButton className={styles.button}>
                        <MoreHorizIcon/>
                    </IconButton>
                </Box>
            </Grid>
        )
    }

    return (
        <Box className={styles.friendList}>
            <Box sx={{display: 'flex', justify: 'space-between', width: '100%', marginBottom: '10px'}}>
                <Typography sx={{fontSize: '1.25rem', fontWeight: 'bold', padding: '0px 0px 10px 10px'}}>
                    Bạn bè
                </Typography>
                <Box sx={{marginLeft: 'auto'}}>
                    <Button sx={{textTransform: 'none'}}>
                        <Typography sx={{color: '#1877F2', fontSize: '.875rem', fontWeight: '600'}}>Lời mời kết bạn</Typography>
                    </Button>
                    <Button sx={{textTransform: 'none'}}>
                        <Typography sx={{color: '#1877F2', fontSize: '.875rem', fontWeight: '600'}}>Tìm bạn bè</Typography>
                    </Button>
                    <ButtonBase className={styles.moreButton}>
                        <MoreHorizIcon/>
                    </ButtonBase>
                </Box>
            </Box>
            <Container sx={{padding: '0'}}>
                <Grid container>
                    <FriendItem friend={{
                        name: 'Hữu Tài',
                        img: 'https://scontent.fdad3-1.fna.fbcdn.net/v/t1.18169-1/18556006_104946380091976_9183765241575257849_n.jpg?stp=cp0_dst-jpg_p80x80&_nc_cat=103&ccb=1-7&_nc_sid=2fc63d&_nc_ohc=AMPCXzz1uikAX987qKb&_nc_ht=scontent.fdad3-1.fna&oh=00_AT9BqRx5Mpj0zK4Tb5R3__ls81N9CyBKRYCVmgHXyOnHZA&oe=62E4B2AD'
                    }}/>
                    <FriendItem friend={{
                        name: 'Hữu Tài',
                        img: 'https://scontent.fdad3-1.fna.fbcdn.net/v/t1.18169-1/18556006_104946380091976_9183765241575257849_n.jpg?stp=cp0_dst-jpg_p80x80&_nc_cat=103&ccb=1-7&_nc_sid=2fc63d&_nc_ohc=AMPCXzz1uikAX987qKb&_nc_ht=scontent.fdad3-1.fna&oh=00_AT9BqRx5Mpj0zK4Tb5R3__ls81N9CyBKRYCVmgHXyOnHZA&oe=62E4B2AD'
                    }}/>
                    <FriendItem friend={{
                        name: 'Hữu Tài',
                        img: 'https://scontent.fdad3-1.fna.fbcdn.net/v/t1.18169-1/18556006_104946380091976_9183765241575257849_n.jpg?stp=cp0_dst-jpg_p80x80&_nc_cat=103&ccb=1-7&_nc_sid=2fc63d&_nc_ohc=AMPCXzz1uikAX987qKb&_nc_ht=scontent.fdad3-1.fna&oh=00_AT9BqRx5Mpj0zK4Tb5R3__ls81N9CyBKRYCVmgHXyOnHZA&oe=62E4B2AD'
                    }}/>
                    <FriendItem friend={{
                        name: 'Hữu Tài',
                        img: 'https://scontent.fdad3-1.fna.fbcdn.net/v/t1.18169-1/18556006_104946380091976_9183765241575257849_n.jpg?stp=cp0_dst-jpg_p80x80&_nc_cat=103&ccb=1-7&_nc_sid=2fc63d&_nc_ohc=AMPCXzz1uikAX987qKb&_nc_ht=scontent.fdad3-1.fna&oh=00_AT9BqRx5Mpj0zK4Tb5R3__ls81N9CyBKRYCVmgHXyOnHZA&oe=62E4B2AD'
                    }}/>
                    <FriendItem friend={{
                        name: 'Hữu Tài',
                        img: 'https://scontent.fdad3-1.fna.fbcdn.net/v/t1.18169-1/18556006_104946380091976_9183765241575257849_n.jpg?stp=cp0_dst-jpg_p80x80&_nc_cat=103&ccb=1-7&_nc_sid=2fc63d&_nc_ohc=AMPCXzz1uikAX987qKb&_nc_ht=scontent.fdad3-1.fna&oh=00_AT9BqRx5Mpj0zK4Tb5R3__ls81N9CyBKRYCVmgHXyOnHZA&oe=62E4B2AD'
                    }}/>
                    <FriendItem friend={{
                        name: 'Hữu Tài',
                        img: 'https://scontent.fdad3-1.fna.fbcdn.net/v/t1.18169-1/18556006_104946380091976_9183765241575257849_n.jpg?stp=cp0_dst-jpg_p80x80&_nc_cat=103&ccb=1-7&_nc_sid=2fc63d&_nc_ohc=AMPCXzz1uikAX987qKb&_nc_ht=scontent.fdad3-1.fna&oh=00_AT9BqRx5Mpj0zK4Tb5R3__ls81N9CyBKRYCVmgHXyOnHZA&oe=62E4B2AD'
                    }}/>
                    <FriendItem friend={{
                        name: 'Hữu Tài',
                        img: 'https://scontent.fdad3-1.fna.fbcdn.net/v/t1.18169-1/18556006_104946380091976_9183765241575257849_n.jpg?stp=cp0_dst-jpg_p80x80&_nc_cat=103&ccb=1-7&_nc_sid=2fc63d&_nc_ohc=AMPCXzz1uikAX987qKb&_nc_ht=scontent.fdad3-1.fna&oh=00_AT9BqRx5Mpj0zK4Tb5R3__ls81N9CyBKRYCVmgHXyOnHZA&oe=62E4B2AD'
                    }}/>
                    <FriendItem friend={{
                        name: 'Hữu Tài',
                        img: 'https://scontent.fdad3-1.fna.fbcdn.net/v/t1.18169-1/18556006_104946380091976_9183765241575257849_n.jpg?stp=cp0_dst-jpg_p80x80&_nc_cat=103&ccb=1-7&_nc_sid=2fc63d&_nc_ohc=AMPCXzz1uikAX987qKb&_nc_ht=scontent.fdad3-1.fna&oh=00_AT9BqRx5Mpj0zK4Tb5R3__ls81N9CyBKRYCVmgHXyOnHZA&oe=62E4B2AD'
                    }}/>
                    <FriendItem friend={{
                        name: 'Hữu Tài',
                        img: 'https://scontent.fdad3-1.fna.fbcdn.net/v/t1.18169-1/18556006_104946380091976_9183765241575257849_n.jpg?stp=cp0_dst-jpg_p80x80&_nc_cat=103&ccb=1-7&_nc_sid=2fc63d&_nc_ohc=AMPCXzz1uikAX987qKb&_nc_ht=scontent.fdad3-1.fna&oh=00_AT9BqRx5Mpj0zK4Tb5R3__ls81N9CyBKRYCVmgHXyOnHZA&oe=62E4B2AD'
                    }}/>
                    <FriendItem friend={{
                        name: 'Hữu Tài',
                        img: 'https://scontent.fdad3-1.fna.fbcdn.net/v/t1.18169-1/18556006_104946380091976_9183765241575257849_n.jpg?stp=cp0_dst-jpg_p80x80&_nc_cat=103&ccb=1-7&_nc_sid=2fc63d&_nc_ohc=AMPCXzz1uikAX987qKb&_nc_ht=scontent.fdad3-1.fna&oh=00_AT9BqRx5Mpj0zK4Tb5R3__ls81N9CyBKRYCVmgHXyOnHZA&oe=62E4B2AD'
                    }}/>
                </Grid>
            </Container>
            <Button className={styles.editButton}>
                <Typography sx={{
                    color: '#050505',
                    fontSize: '.875rem',
                    fontWeight: '600'
                }}>Xem tất cả</Typography>
            </Button>
        </Box>
    )
}

export default AboutFriendList;