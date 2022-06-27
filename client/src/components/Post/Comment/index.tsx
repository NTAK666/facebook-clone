import React from 'react';
import styles from './styles.module.scss'
import {Box, IconButton, InputBase} from "@mui/material";
import styled from "@emotion/styled";
import AvatarOnline from "../../Avatar/AvatarOnline";
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import CommentItem from "./CommentItem";

interface IProps {
    postId: string;
}

const Comment: React.FC<IProps> = ({postId}) => {
    return (
        <>
            <Box className={styles.root}>
                <Box className={styles.header}>
                    <AvatarOnline src={'https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-1/286412953_7777480448958529_2260869162989296128_n.jpg?stp=dst-jpg_p100x100&_nc_cat=100&ccb=1-7&_nc_sid=7206a8&_nc_ohc=ncwh4TJZAIsAX-Cacjz&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fsgn2-6.fna&oh=00_AT_g62KgrbOtHjyq0Gjec24biU7pP9XgHAV7eolVmGMbQw&oe=62B4687F'} online={true}/>
                    <InputStyled placeholder={'Viết bình luận'} />
                    <Box className={styles.headerActions}>
                        <IconButton>
                            <CameraAltOutlinedIcon />
                        </IconButton>
                    </Box>
                </Box>
                <Box>
                    <CommentItem
                        time={'1 giờ trước'}
                        commentId={`comment-${1}`}
                        image={'https://images.unsplash.com/photo-1477346611705-65d1883cee1e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8MmslMjB3YWxscGFwZXJ8ZW58MHx8MHx8&w=1000&q=80'}
                        title={'Nguyễn Trương Anh Kiệt'} content={'Đăng ôn thi cho zui mà mấy bé vào an ủi cùng nhau vượt qua nào Đăng ôn thi cho zui mà mấy bé vào an ủi cùng nhau vượt qua nào '} src={'https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-1/286412953_7777480448958529_2260869162989296128_n.jpg?stp=dst-jpg_p100x100&_nc_cat=100&ccb=1-7&_nc_sid=7206a8&_nc_ohc=ncwh4TJZAIsAX-Cacjz&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fsgn2-6.fna&oh=00_AT_g62KgrbOtHjyq0Gjec24biU7pP9XgHAV7eolVmGMbQw&oe=62B4687F'}/>
                    <CommentItem
                        time={'1 giờ trước'}
                        commentId={`comment-${2}`}
                        title={'Nguyễn Trương Anh Kiệt'} content={'Đăng ôn thi cho zui mà mấy bé vào an ủi cùng nhau vượt qua nào Đăng ôn thi cho zui mà mấy bé vào an ủi cùng nhau vượt qua nào '} src={'https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-1/286412953_7777480448958529_2260869162989296128_n.jpg?stp=dst-jpg_p100x100&_nc_cat=100&ccb=1-7&_nc_sid=7206a8&_nc_ohc=ncwh4TJZAIsAX-Cacjz&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fsgn2-6.fna&oh=00_AT_g62KgrbOtHjyq0Gjec24biU7pP9XgHAV7eolVmGMbQw&oe=62B4687F'}/>
                </Box>
            </Box>
        </>
    )
}

const InputStyled = styled(InputBase)`
  width: 100%;
  border-radius: 18px;
  background-color: #F0F2F5;
  padding: 0 10px;
`

export default Comment;