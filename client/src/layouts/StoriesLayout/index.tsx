import React, {useEffect, useState} from 'react';
import styles from './styles.module.scss'
import {Box} from "@mui/material";
import {useLocation} from "react-router-dom";
import NavbarList from "../../components/Stories/NavbarList";
import Header from "../../components/HomePage/Header";

interface IProps {
    children: React.ReactNode;
}

const StoriesLayout: React.FC<IProps> = ({ children }) => {
    const location = useLocation();
    const [bgr, setBgr] = useState('#e4e6eb');

    useEffect(() => {
        switch (location.pathname) {
            case '/stories':
                setBgr('#e4e6eb');
                break;
            default:
                setBgr('#000');
                break;
        }
    }, [location]);


    return <>
        <Box className={styles.root} sx={{ backgroundColor: bgr }}>
            <Header/>
            <NavbarList />
            <Box className={styles.wrapperContent}>
                    {children}
            </Box>
        </Box>
    </>
}


export default StoriesLayout;