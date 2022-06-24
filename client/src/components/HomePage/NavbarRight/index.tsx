import React, {useMemo} from 'react';
import NavList from "./NavList";
import styles from './styles.module.scss'
import {Box, Typography} from "@mui/material";
import NavItemButton from "../NavItemButton";
import AvatarOnline from "../../Avatar/AvatarOnline";
import NavItemLink from "../NavItemLink";
import CakeIcon from '@mui/icons-material/Cake';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {useAppDispatch, useAppSelector} from "../../../app/hook";
import {IUser} from "../../../app/models/User";
import {createChatBox} from "../../../app/features/ChatBoxSlice";

interface IProps {

}

const NavbarRight: React.FC<IProps> = () => {
    const {friends} = useAppSelector(state => state.userSlice)
    const dispatch = useAppDispatch();

    const renderList = useMemo(() => {
        if (friends.length !== 0) {
            return friends.map((item: IUser, index: number) => {
                return <NavItemButton key={index} onClick={() => {
                    dispatch(createChatBox(item));
                }} title={`${item.firstName} ${item.lastName}`} Icon={<AvatarOnline
                    src={item.picture} online={true}/>}/>
            })
        }
        return null;
    }, [friends, dispatch])


    return <>
        <Box className={styles.root}>
            <NavList subheader={
                <Box>
                    <Typography fontSize={'medium'} fontWeight={'bold'}>Sinh nhật</Typography>
                </Box>
            }>
                <NavItemLink title={'Hôm nay là sinh nhật của Anh Kiệt'}
                             Icon={<CakeIcon sx={{width: '40px', height: '40px'}}/>}
                             to={'/profile/anh-kiet'}/>
            </NavList>

            <NavList
                subheader={
                    <Box>
                        <Typography fontSize={'medium'} fontWeight={'bold'}>Người liên hệ</Typography>
                    </Box>
                }
            >
                {renderList}
            </NavList>

            <NavList subheader={
                <Box>
                    <Typography fontSize={'medium'} fontWeight={'bold'}>Cuộc trò chuyện nhóm</Typography>
                </Box>
            }>
                <NavItemButton title={'Tạo nhóm mới'} Icon={<AddCircleIcon sx={{width: '35px', height: '35px'}}/>}/>
            </NavList>

        </Box>
    </>
}
export default NavbarRight;