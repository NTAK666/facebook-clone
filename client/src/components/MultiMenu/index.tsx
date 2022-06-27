import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {createPortal} from "react-dom";
import {Avatar, Box, Divider, List, Paper, Typography} from "@mui/material";
import styles from './styles.module.scss'
import SubMenu from "./SubMenu";
import {Link, useNavigate} from "react-router-dom";
import styled from "@emotion/styled";
import {useAppSelector} from "../../app/hook";
import {LIST_MENU_SETTING} from "../../constants";
import MultiMenuItem from "./MultiMenuItem";

const PROFILE_LINK = `/profile`

interface IProps {
    anchorEl: null | HTMLElement;
    handleClose: () => void;
}

const MultiMenu: React.FC<IProps> = (props) => {
    const {anchorEl, handleClose} = props;
    const {user} = useAppSelector(state => state.userSlice);
    const navigate = useNavigate();
    const [subMenuList, setSubMenuList] = useState<{
        data: any[],
        title: string;
        active: boolean;
    }>({
        data: [],
        title: ``,
        active: false,
    });

    const handleCloseEl = useCallback((e: any) => {
        if (anchorEl && !anchorEl.contains(e.target as Node)) {
            handleClose();
        }
    }, [anchorEl, handleClose]);


    useEffect(() => {

        document.addEventListener('click', handleCloseEl);

        return () => {
            document.removeEventListener('click', handleCloseEl);
        }

    }, [handleCloseEl])

    const handleGoBack = () => {
        setSubMenuList((subMenuList) => {
            return {
                ...subMenuList,
                active: false
            }
        });
        console.log('Go back')
    }

    const renderMenuSettings = useMemo(() => {
        return LIST_MENU_SETTING.map((item, index) => {
            const {Icon, subMenu, label, to} = item;
            return <MultiMenuItem onClick={() => {
                if (to) {
                    return navigate(to);
                }
                if (subMenu) {
                    setSubMenuList({
                        data: [...subMenu],
                        title: label,
                        active: true
                    });
                }
            }} key={index} arrowIcon={!!subMenu} icon={<Icon/>} text={label}/>
        })
    }, [navigate])

    return anchorEl && (
        createPortal(<>
            <Paper className={styles.root}>
                <MultiMenuHeader>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: '15px', width: '100%'}}>
                        <Avatar src={user.picture} sx={{width: '50px', height: '50px'}}/>
                        <Typography fontWeight={'bold'}>{`${user.firstName} ${user.lastName}`}</Typography>
                    </Box>
                    <Divider sx={{width: '90%', backgroundColor: "#e4e6eb", margin: '0 auto'}}/>
                    <Link to={PROFILE_LINK} className={'text-decoration-none'}>
                        <Typography fontWeight={'bold'} className={'text-color-link'}>Xem tất cả trang cá
                            nhân</Typography>
                    </Link>
                </MultiMenuHeader>
                <List sx={{marginTop: '10px'}}>
                    {renderMenuSettings}
                </List>
                <SubMenu parentTitle={subMenuList['title']} active={subMenuList['active']} data={subMenuList['data']} handleClose={handleGoBack}/>
            </Paper>
        </>, anchorEl)
    )
}

const MultiMenuHeader = styled(Box)`
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
  padding: 10px 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: flex-start;
`

export default MultiMenu;