import React from 'react';
import {Avatar, Box} from "@mui/material";
import styles from './styles.module.scss'

interface IProps {
    src?: string | null
    online?: boolean;
    width?: string;
    height?: string;
}

const AvatarOnline: React.FC<IProps> = (props) => {
    const {src, online, width = '40px', height = '40px'} = props;
    return <>
        <Box sx={{position: 'relative', width: width, height: height}}>
            <Avatar src={src || ""} sx={{width: '100%', height: '100%'}}/>
            {online && <span className={styles.onl}></span>}
        </Box>
    </>
}

export default AvatarOnline;