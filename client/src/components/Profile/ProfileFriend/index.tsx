import React from 'react';
import {Box, Link, Button, Typography, Container, Grid, ImageListItem} from "@mui/material";
import styles from './profile-friend.module.scss';
import FriendItem from "./FriendItem";

const itemData = [
    {
        img: 'https://scontent.fdad3-3.fna.fbcdn.net/v/t39.30808-1/286412953_7777480448958529_2260869162989296128_n.jpg?stp=dst-jpg_p200x200&_nc_cat=100&ccb=1-7&_nc_sid=7206a8&_nc_ohc=qL4dJgXHIg8AX9YWhNR&_nc_oc=AQmgnxXJVX7aURdb7nrKT3tBEGf5jpvtCfDrdmavqvYV4lxdg4r7yoXdh37MhrUzVMCszgGx6ZySzHbHYiHaxKhg&_nc_ht=scontent.fdad3-3.fna&oh=00_AT-ULoLA-1eC11fsvmMIENbpm6VGuOzm6I57kxhk9UY8yw&oe=62C2403F',
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
        img: 'https://scontent.fdad3-3.fna.fbcdn.net/v/t39.30808-1/277750282_1016833975883535_6920911483236738831_n.jpg?stp=c25.0.148.148a_dst-jpg_p148x148&_nc_cat=111&ccb=1-7&_nc_sid=aa3c98&_nc_ohc=1mrBLyBHVPAAX8YRF1-&_nc_ht=scontent.fdad3-3.fna&oh=00_AT91eoJZz7hfvJw78kM000lqICFm450YiXUWRNicvmSBvA&oe=62C1489C',
        name: 'Thu Phượng',
    },
    {
        img: 'https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-1/287962156_388852756545014_3049098154776382403_n.jpg?stp=dst-jpg_p200x200&_nc_cat=105&ccb=1-7&_nc_sid=7206a8&_nc_ohc=Lhm2CoWXlJ4AX8_nM2c&_nc_oc=AQkGCE7XvyXzDzQ3lfsevGOpGKhaSbVsrP-uA539szzzxNaKuENO0wln7PkaACQlgUMpb0mk9eq_qwq724gL3fOD&_nc_ht=scontent.fdad3-4.fna&oh=00_AT9DhsMNlsxWhQFAKL5zt8gZSL2TXe6d84fY1-VcRMq-KA&oe=62C26EA1',
        name: 'Thu Hằng',
    },
    {
        img: 'https://sugababy.xyz/wp-content/uploads/2021/10/tran-huyen-chau-lo-clip-nong-1.jpg',
        name: 'Huyền Châu',
    },
    {
        img: 'https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-1/173565612_3060421320854974_6181620190984153350_n.jpg?stp=dst-jpg_p200x200&_nc_cat=101&ccb=1-7&_nc_sid=7206a8&_nc_ohc=IVl1gzSK0poAX9KKwoE&_nc_ht=scontent.fdad3-4.fna&oh=00_AT__Tlm3RfmXJYu2rUi60W5r3p4U-pBlg5Ae8Zi-Oa-eZw&oe=62C23916',
        name: 'Bảo Nhi',
    },
    {
        img: 'https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-1/285335551_1390402524776369_8514254912415132355_n.jpg?stp=dst-jpg_p200x200&_nc_cat=107&ccb=1-7&_nc_sid=7206a8&_nc_ohc=8enMFXFxib4AX82gXnb&tn=Joey6Z_kHP1hkw34&_nc_ht=scontent.fdad3-4.fna&oh=00_AT_ErEl4GbSLnawIkSPsK8SFqaY_IpxfkVHyOIeAqiKbBA&oe=62C1B9D3',
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
                    {itemData.map((item) => (
                        <FriendItem img={item.img} name={item.name}/>
                    ))}
                </Grid>
            </Box>
        </Box>
    )
}

export default ProfileFriend;