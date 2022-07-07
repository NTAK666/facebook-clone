import React, {useEffect} from 'react';
import styles from './profile-photo.module.scss';
import {Box, Button, Link, Typography} from "@mui/material";
import {useGetImageOfUserQuery} from "../../../app/services/UserService";


const ProfilePhoto = () => {
    const {data} = useGetImageOfUserQuery();
    const [imageList, setImageList] = React.useState<string[]>([]);
    useEffect(() => {
        if (data) {
            setImageList([...data.data])
        }
    }, [data]);


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
            <Box sx={{maxWidth: '460px', borderRadius: '5px', display: 'flex', flexWrap: 'wrap'}} >
                {imageList.map((item, index) => (
                    <Box key={index} sx={{width: '148px', height: '148px', margin: '2px'}}>
                            <img
                                src={`${item}`}
                                style={{width: '148px', height: '148px'}}
                            />
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export default ProfilePhoto;