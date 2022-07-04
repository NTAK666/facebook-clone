import React from 'react';
import {Avatar, Box, Divider, IconButton, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SettingsIcon from "@mui/icons-material/Settings";
import styles from './styles.module.scss'
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../../app/hook";

interface IProps {

}

const Navbar: React.FC<IProps> = () => {
    const navigate = useNavigate()
    const {user} = useAppSelector(state => state.authSlice)

    return <>
        <Box className={styles.navbar}>
            <Box className={styles.header}>
                <IconButton sx={{backgroundColor: `#e4e6eb`}} onClick={() => navigate(-1)}>
                    <CloseIcon fontSize={'medium'}/>
                </IconButton>
                <Box>
                    <img src="/images/logo.svg" alt=""/>
                </Box>
            </Box>
            <Box className={styles.body}>
                <Divider sx={{backgroundColor: "#f0f2f5"}}/>
                <Box className={styles.bodyHeader}>
                    <Box className={styles.bodyHeaderTop}>
                        <Typography fontWeight={`bold`} fontSize={`x-large`}>Tin của bạn</Typography>
                        <IconButton sx={{backgroundColor: `#e4e6eb`}}>
                            <SettingsIcon sx={{color: `#333`}}/>
                        </IconButton>
                    </Box>
                    <Box className={styles.bodyHeaderBottom}>
                        <Avatar src={user.userInfo.avatar || ""} sx={{width: `60px`, height: `60px`}}/>
                        <Typography fontWeight={`bold`}
                                    fontSize={`large`}>{`${user.userInfo.firstName} ${user.userInfo.lastName}`}</Typography>
                    </Box>
                </Box>
                <Divider sx={{backgroundColor: "#f0f2f5"}}/>
            </Box>
        </Box>
    </>
}


export default Navbar;