import React from 'react';
import styles from './styles.module.scss'
import {Box, IconButton} from "@mui/material";
import HeaderRight from "../../../components/HomePage/Header/HeaderRight";
import CloseIcon from '@mui/icons-material/Close';

interface IProps {

}

const CreateStories: React.FC<IProps> = () => {
    return <>
        <Box className={styles.root}>
            <Box className={styles.navbar}>
                <Box className={styles.header}>
                    <IconButton sx={{backgroundColor: `#e4e6eb`}}>
                        <CloseIcon fontSize={'large'}/>
                    </IconButton>
                    <Box>
                        <img src="/images/logo.svg" alt=""/>
                    </Box>
                </Box>
            </Box>
            <Box className={styles.content}>
                <Box className={styles.header}>
                    <HeaderRight />
                </Box>
            </Box>

        </Box>
    </>
}

export default CreateStories;