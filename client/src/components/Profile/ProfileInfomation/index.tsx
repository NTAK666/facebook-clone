import React from 'react';
import {Box, Avatar, IconButton, AvatarGroup, Button, Menu, MenuItem} from "@mui/material";
import ButtonBase from '@mui/material/ButtonBase';
import styles from './profile-infomation.module.scss';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
const coverPicture = 'https://scontent.fdad3-4.fna.fbcdn.net/v/t1.6435-9/37066209_2124729054431044_3144735411583057920_n.jpg?stp=dst-jpg_s960x960&_nc_cat=107&ccb=1-7&_nc_sid=e3f864&_nc_ohc=jTs2a8TclaAAX-KGYOi&_nc_ht=scontent.fdad3-4.fna&oh=00_AT8rrEE6APFa4BMtL5kaexOKUUv3DPgfO77Hns5-j7-HEQ&oe=62E11AA8'

const ProfileInfomation = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Box>
            <Box className={styles.backgroundInformation}>
                <Box className={styles.blur}>
                    <img className={styles.coverBlur} src={coverPicture} alt=""/>
                </Box>
                <Box>
                    <img className={styles.cover} src={coverPicture} alt=""/>
                    <ButtonBase
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        sx={{backgroundColor: 'white', color: 'black'}} className={styles.buttonEditCover}
                    >
                        <CameraAltIcon/> Chỉnh sửa ảnh bìa
                    </ButtonBase>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClose}><ImageOutlinedIcon/> Chọn ảnh</MenuItem>
                        <MenuItem onClick={handleClose}><FileUploadOutlinedIcon/> Tải lên</MenuItem>
                        <hr/>
                        <MenuItem onClick={handleClose}><DeleteOutlineOutlinedIcon/> Gỡ</MenuItem>
                    </Menu>
                    <Box className={styles.info} sx={{display: 'flex'}}>
                        <Box className={styles.avatar}>
                            <Avatar alt="Cindy Baker" src={coverPicture} sx={{
                                width: '170px', height: '170px',
                                border: '5px solid white'
                            }}/>
                            <IconButton className={styles.buttonUploadAvatar} sx={{backgroundColor: '#F0F2F5'}}>
                                <CameraAltIcon sx={{color: 'black'}}/>
                            </IconButton>
                        </Box>
                        <Box sx={{display: 'flex'}}>
                            <Box className={styles.text}>
                                <Box className={styles.name} sx={{display: 'flex'}}>
                                    <h1>Nguyễn Phan Huy Hiếu</h1>
                                    <h2 className={styles.subName}>(Bii)</h2>
                                </Box>
                                <Box className={styles.friend}>
                                    <h5>2,5K Bạn bè</h5>
                                </Box>
                                <AvatarGroup total={24} spacing={'small'} className={styles.friendList}>
                                    <Avatar alt="Remy Sharp" src="https://scontent.fdad3-1.fna.fbcdn.net/v/t1.18169-1/18556006_104946380091976_9183765241575257849_n.jpg?stp=dst-jpg_p200x200&_nc_cat=103&ccb=1-7&_nc_sid=7206a8&_nc_ohc=lnLRxeYNCb8AX8z0abW&_nc_ht=scontent.fdad3-1.fna&oh=00_AT-uAqn7zwZm0uEpepVuEcl3uacNdywKb0tyq4j2BAZZGg&oe=62E0BE2D" />
                                    <Avatar alt="Travis Howard" src="https://scontent.fdad3-4.fna.fbcdn.net/v/t1.6435-1/110200321_138522867877254_7540728164716663231_n.jpg?stp=dst-jpg_p200x200&_nc_cat=101&ccb=1-7&_nc_sid=7206a8&_nc_ohc=_yNqM-qODQcAX9uYQRa&_nc_ht=scontent.fdad3-4.fna&oh=00_AT8EU0ZEQIKmxPt19xGTId5AzXWj9rwTbduGro4y3rQYNA&oe=62E0DD56" />
                                    <Avatar alt="Agnes Walker" src="https://scontent.fsgn5-7.fna.fbcdn.net/v/t39.30808-1/286412953_7777480448958529_2260869162989296128_n.jpg?stp=dst-jpg_p200x200&_nc_cat=100&ccb=1-7&_nc_sid=7206a8&_nc_ohc=qL4dJgXHIg8AX_Eb1uE&_nc_oc=AQmTXoStBgjLtvi9zEXA-2YNgnUV_loFIwBPVr4RaTYxeAW3TTqNDt6WuGpDix4kXU9JKVAURtqjB5pNQLgPq14k&_nc_ht=scontent.fsgn5-7.fna&oh=00_AT_8fiPT59PisUPu3L_oxxeqCDEgBX1hpJdwxNuzNud4pQ&oe=62BE4BBF" />
                                    <Avatar alt="Trevor Henderson" src="https://scontent.fsgn5-7.fna.fbcdn.net/v/t1.6435-9/123466206_444783609841178_6582193565457816780_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=q71teVRfnmwAX8mSf_5&_nc_ht=scontent.fsgn5-7.fna&oh=00_AT9jFmE-_gcEA9UOuUvoft7-ytpmnEQmGPx2Lh5oMcAbAw&oe=62DE1A65" />
                                </AvatarGroup>
                            </Box>
                            <Box className={styles.buttonFunction}>
                                <ButtonBase sx={{backgroundColor: '#1B74E4', color: 'white'}} className={styles.button}>
                                    <AddCircleIcon/> Thêm vào tin
                                </ButtonBase>
                                <ButtonBase sx={{backgroundColor: '#D8DADF', color: 'black'}} className={styles.button}>
                                    <EditIcon/> Chỉnh sửa trang cá nhân
                                </ButtonBase>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box className={styles.tabButton}>
                <Box>
                    <hr/>
                </Box>
            </Box>
        </Box>
    )
}

export default ProfileInfomation;
