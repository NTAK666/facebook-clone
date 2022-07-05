import React from 'react';
import {Box, Link, Button, Typography, Container, Grid, ImageListItem} from "@mui/material";
import styles from './profile-friend.module.scss';
import FriendItem from "./FriendItem";

const itemData = [
    {
        img: 'https://scr.vn/wp-content/uploads/2020/07/Avatar-Facebook-tr%E1%BA%AFng.jpg',
        name: 'Anh Kiệt',
    },
    {
        img: 'https://scontent.fdad3-1.fna.fbcdn.net/v/t1.18169-1/18556006_104946380091976_9183765241575257849_n.jpg?stp=dst-jpg_p200x200&_nc_cat=103&ccb=1-7&_nc_sid=7206a8&_nc_ohc=AMPCXzz1uikAX_rR2BQ&_nc_ht=scontent.fdad3-1.fna&oh=00_AT9wgZis15KcQu5Ajz7FqT2kG-i8w6YlKg9iPmIUpF4G8A&oe=62E0BE2D',
        name: 'Hữu Tài',
    },
    {
        img: 'https://scontent.fdad3-4.fna.fbcdn.net/v/t1.6435-9/110200321_138522867877254_7540728164716663231_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=l5c3aw1whEEAX9n0uQF&_nc_ht=scontent.fdad3-4.fna&oh=00_AT_21DlvIQzsNL8IimjYxLiFPxB3MdZgjKbca7t0kkzusQ&oe=62E39E60',
        name: 'Văn Hoàng',
    },
    {
        img: 'https://scontent.fdad3-3.fna.fbcdn.net/v/t1.6435-9/123466206_444783609841178_6582193565457816780_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=1HptycOl-T4AX8GTKTu&_nc_ht=scontent.fdad3-3.fna&oh=00_AT8m94M0eQ62Y8r9LoFmbkB5LCULaFyR2KM5eagpwrnGDQ&oe=62E20EE5',
        name: 'Phương Nam',
    },
    {
        img: 'https://scr.vn/wp-content/uploads/2020/07/Avatar-Facebook-tr%E1%BA%AFng.jpg',
        name: 'Thu Phượng',
    },
    {
        img: 'https://scr.vn/wp-content/uploads/2020/07/Avatar-Facebook-tr%E1%BA%AFng.jpg',
        name: 'Thu Hằng',
    },
    {
        img: 'https://sugababy.xyz/wp-content/uploads/2021/10/tran-huyen-chau-lo-clip-nong-1.jpg',
        name: 'Huyền Châu',
    },
    {
        img: 'https://scr.vn/wp-content/uploads/2020/07/Avatar-Facebook-tr%E1%BA%AFng.jpg',
        name: 'Bảo Nhi',
    },
    {
        img: 'https://scr.vn/wp-content/uploads/2020/07/Avatar-Facebook-tr%E1%BA%AFng.jpg',
        name: 'Minh Thư',
    }
]

const ProfileFriend = () => {
    return (
        <Box className={styles.profileFriend}>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography sx={{
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    color: '#050505',
                    padding: '10px 0px 4px 10px'
                }}>Bạn bè</Typography>
                <Button sx={{textTransform: 'none'}}>
                    <Link href='/friend'
                          sx={{textDecoration: 'none', alignSelf: 'center', fontSize: '1rem', fontWeight: '400'}}>Xem
                        tất cả bạn bè</Link>
                </Button>
            </Box>
            <Typography sx={{
                fontSize: '1rem',
                fontWeight: '400',
                color: '#65676B',
                padding: '0px 0px 4px 10px'
            }}>
                2.506 người bạn
            </Typography>
            <Box className={styles.listFriend}>
                <Grid container spacing={1}>
                    {itemData.map((item, index) => (
                        <FriendItem img={item.img} name={item.name} key={index}/>
                    ))}
                </Grid>
            </Box>
        </Box>
    )
}

export default ProfileFriend;