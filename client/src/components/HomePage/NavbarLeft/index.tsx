import React, {useMemo} from 'react';
import styles from './styles.module.scss';
import {Avatar, Box, List} from "@mui/material";
import NavItem from "../NavItemLink";
import {LIST_ITEM_NAVBAR} from "../../../constants";
import {useAppSelector} from "../../../app/hook";

interface IProps {

}

const NavbarLeft: React.FC<IProps> = () => {
    const {user} = useAppSelector(state => state.authSlice);
    const renderNavItems = useMemo(() => {
        return LIST_ITEM_NAVBAR.map((item, index) => {
            return <NavItem key={index} to={item.to} Icon={<img src={item.src} alt=""/>} title={item.title}/>
        })
    }, [])

    return <>
        <Box className={styles.root}>
            <List sx={{padding: '4px 8px'}}>
                <NavItem to={'/profile'} Icon={<Avatar src={user.userInfo.avatar || ""}/>}
                         title={`${user.userInfo.firstName} ${user.userInfo.lastName}`}/>
                {renderNavItems}
            </List>
        </Box>
    </>
}
export default NavbarLeft;