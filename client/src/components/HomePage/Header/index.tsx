import React, {useMemo} from 'react';
import styles from './header.module.scss';
import {Box} from "@mui/material";
import InputSearch from "./InputSearch";
import NavigateItem from "./NavigateItem";
import {NAVIGATE_LIST} from "../../../constants";
import {Link, useLocation} from 'react-router-dom';
import HeaderRight from "./HeaderRight";

interface IProps {
}

const Header: React.FC<IProps> = () => {
    const {pathname} = useLocation();
    const renderNavigate = useMemo(() => {
        return NAVIGATE_LIST.map((item, index) => {
            const {Icon} = item;
            return <NavigateItem title={item.title} key={index} to={item.to} active={pathname === item.to}>
                <Icon active={pathname === item.to}/>
            </NavigateItem>
        })
    }, [pathname]);

    return <Box className={styles.root}>
        <Box className={styles.headerLeft}>
            <Box className={styles.logo}>
                <Link to={`/`}>
                    <img src="/images/logo.svg" alt=""/>
                </Link>
            </Box>
            <Box>
                <InputSearch/>
            </Box>
        </Box>
        <Box className={styles.headerMid}>
            {renderNavigate}
        </Box>
        <HeaderRight/>
    </Box>
}



export default Header;