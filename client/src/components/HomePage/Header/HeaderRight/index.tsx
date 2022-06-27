import React, {useMemo} from 'react';
import {Box, IconButton, InputBase} from "@mui/material";
import styles from "./styles.module.scss";
import ButtonCircle from "../../../Button/Circle";
import Menu from "../Menu";
import MenuItemWithAvatar from "../MenuItemWithAvatar";
import MenuChatItem from "../MenuChatItem";
import AvatarCircle from "../../../Avatar/AvatarCircle";
import styled from "@emotion/styled";
import {useAppDispatch, useAppSelector} from "../../../../app/hook";
import {IUser} from "../../../../app/models/User";
import {createChatBox} from "../../../../app/features/ChatBoxSlice";
import MultiMenu from "../../../MultiMenu";

interface IProps {

}

const HeaderRight: React.FC<IProps> = () => {
    const {user, friends} = useAppSelector(state => state.userSlice)
    const dispatch = useAppDispatch();
    const [anchorEl, setAnchorEl] = React.useState<{
        notify: null | HTMLElement;
        messenger: null | HTMLElement;
        settings: null | HTMLElement;
    }>({
        notify: null,
        messenger: null,
        settings: null,
    });
    const openMenu = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, title: any) => {
        switch (title) {
            case 'notify':
                setAnchorEl(({notify}) => {
                    return {
                        messenger: null,
                        settings: null,
                        notify: notify ? null : event.currentTarget,
                    }
                });
                break;
            case 'messenger':
                setAnchorEl(({messenger}) => {
                    return {
                        messenger: messenger ? null : event.currentTarget,
                        settings: null,
                        notify: null,
                    }
                })
                break;
            case 'settings':
                setAnchorEl(({settings}) => {
                    return {
                        messenger: null,
                        notify: null,
                        settings: settings ? null : event.currentTarget
                    }
                })
                break;
            default:
                break;
        }
    }

    const renderMenuChat = useMemo(() => {
        return friends.map((item: IUser, index) => {
            return <MenuChatItem key={index}
                                 onClick={() => {
                                     dispatch(createChatBox(item))
                                 }}
                                 user={item} src={item.picture} title={`${item.firstName} ${item.lastName}`}
                                 description={'Xin chào mọi người'}/>
        })
    }, [friends, dispatch])

    const handleClose = () => {
        setAnchorEl({
            messenger: null,
            notify: null,
            settings: null
        })
    }

    return <>
        <Box className={styles.headerRight}>
            <ButtonCircle title={'Menu'}>
                <img src="/images/button/icon-button-bar.svg" alt=""/>
            </ButtonCircle>
            <ButtonCircle title={'Messenger'}
                          onClick={(event) => openMenu(event, 'messenger')}>
                <img src="/images/button/icon-button-message.svg" alt=""/>
            </ButtonCircle>
            <ButtonCircle color={'error'} number={4} title={'Thông báo'}
                          onClick={(event) => openMenu(event, 'notify')}>
                <img src="/images/button/icon-button-notify.svg" alt=""/>
            </ButtonCircle>
            <Menu title={'Thông  báo'} handleClose={handleClose}
                  anchorEl={anchorEl['notify']}>
                <MenuItemWithAvatar time={'Khoảng 1 tháng trước'} src={''} to={'/'}
                                    title={'𝐋𝐨𝐚 𝐦𝐚́𝐲 𝐭𝐢́𝐧𝐡 𝐒𝐩𝐞𝐚𝐤𝐞𝐫 𝐄-𝟏𝟎𝟏𝟒 được thiết kế đẹp mắt, sang trọng.\n' +
                                        'Thích hợp để bạn sử dụng trong không gian phòng nhỏ và ấm áp\n' +
                                        'Sản phẩm bảo hành 06 Tháng\n' +
                                        '⏰ Bảo hành 06 tháng'}/>
            </Menu>
            <Menu title={'Chat'} anchorEl={anchorEl['messenger']}
                  handleClose={handleClose}
            >
                <InputSearchMessenger placeholder={'Tìm kiếm trên Messenger'}/>
                {renderMenuChat}
            </Menu>
            <IconButton onClick={(event) => openMenu(event, 'settings')}>
                <AvatarCircle
                    src={user.picture}
                    title={'Trang cá nhân của bạn'}/>
            </IconButton>
            <MultiMenu anchorEl={anchorEl['settings']} handleClose={handleClose} />
        </Box>
    </>
}

const InputSearchMessenger = styled(InputBase)`
  width: 100%;
  border-radius: 30px;
  background-color: #f5f5f5;
  padding: 5px 15px;
  font-size: 16px;
  margin-bottom: 10px;
`



export default HeaderRight;