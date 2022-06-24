import React from 'react';
import {Avatar, Box, Typography} from "@mui/material";
import styles from "./styles.module.scss";

interface IProps {
    owner: boolean;
    text?: string;
    image?: string;
}

const MessageItem: React.FC<IProps> = ({owner, text, image}) => {
    return <>
        <Box className={`${styles.message} ${owner ? styles.messageRight : styles.messageLeft}`}>
            <Avatar sx={{width: '30px', height: '30px'}}/>
            <Box className={`${owner ? styles.right : styles.left}`}>
                <Typography className={styles.text}>{text}</Typography>
                {image && <img className={styles.image} src={image} alt=""/>}
            </Box>
        </Box>
    </>
}
export default MessageItem;