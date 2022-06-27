import React from 'react';
import styles from './styles.module.scss';
import {Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material";
import {LIST_SETTING} from "../../../constants";

interface IProps {

}

const Navbar: React.FC<IProps> = () => {
    return <>
        <Box className={styles.root}>
            <Box className={styles.header}>
                <Typography fontSize={'x-large'} fontWeight={'bold'}>Cài đặt</Typography>
            </Box>

            <List>
                {LIST_SETTING.map((item, index) => {
                    return (
                        <ListItem disablePadding key={index}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <img src={item.src} alt=""/>
                                </ListItemIcon>
                                <ListItemText primary={
                                    <Typography fontWeight={'bold'}>
                                        {item.label}
                                    </Typography>
                                }/>
                            </ListItemButton>
                        </ListItem>
                    )
                })}
            </List>
        </Box>
    </>
}
export default Navbar;