import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import styles from './styles.module.scss'
import {
    Avatar,
    Box,
    ButtonBase,
    Divider,
    IconButton,
    InputBase,
    ListItemIcon,
    Menu,
    MenuItem,
    Tooltip,
    Typography
} from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';
import styled from "@emotion/styled";
import {LikeIcon, SmileIcon} from "../Icons";
import MessageItem from "./MessageItem";
import {Logout} from "@mui/icons-material";
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import {IUser} from "../../app/models/User";
import {useAppDispatch} from "../../app/hook";
import {closeChatBox, minimizeChatBox} from "../../app/features/ChatBoxSlice";
import {SubmitHandler, useForm} from "react-hook-form";
import Picker from 'emoji-picker-react';

interface IProps {
    chatbox: IUser;
    position: 'chatbox-one' | 'chatbox-two' | 'chatbox-three';
}

type Inputs = {
    message: string;
}

const Chatbox: React.FC<IProps> = ({chatbox, position}) => {
    const elementRef = useRef<HTMLElement>(null);
    const [elementActive, setElementActive] = useState(false)
    const emojiRef = useRef<HTMLElement>(null);
    const [emojiActive, setEmojiActive] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [information, setInformation] = useState({
        name: '',
        avatar: ''
    })
    const dispatch = useAppDispatch();
    const {register, handleSubmit, setValue, watch} = useForm<Inputs>();
    const [messageList, setMessageList] = useState<Inputs[]>([]);

    useEffect(() => {
        setInformation((information) => {
            return {
                ...information,
                name: `${chatbox.firstName} ${chatbox.lastName}`,
                avatar: chatbox.picture
            }
        })
    }, [chatbox]);


    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const checkActive = useCallback((e: any) => {
        if (elementRef.current && !elementRef.current.contains(e.target as Node)) {
            setElementActive(false);
        }
    }, []);

    const checkEmojiActive = useCallback((e: any) => {
        if (emojiRef.current && !emojiRef.current.contains(e.target as Node)) {
            setEmojiActive(false);
        }
    }, []);


    useEffect(() => {
        document.addEventListener('mousedown', checkActive);
        document.addEventListener('mousedown', checkEmojiActive);

        return () => {
            document.removeEventListener('mousedown', checkActive);
            document.removeEventListener('mousedown', checkEmojiActive);
        }
    }, [checkActive, checkEmojiActive])

    const renderMessage = useMemo(() => {
        return messageList.slice().reverse().map((item: Inputs, index) => {
            return <MessageItem key={index} owner={true} text={item.message}/>
        })
    }, [messageList]);


    const handleFocus = () => {
        setElementActive(true);
    }

    const handleSendMessage: SubmitHandler<Inputs> = (data) => {
        setMessageList((messageList) => [...messageList, data]);
        setValue('message', '');
        setEmojiActive(false);
    }

    return (
        <Box className={`${styles.root} ${position}`} ref={elementRef} onClick={handleFocus}>
            <Box className={styles.header}>
                <ButtonBase className={styles.headerTitle} onClick={handleClick}>
                    <Avatar src={information.avatar} sx={{width: '35px', height: '35px'}}/>
                    <Typography sx={{fontSize: '14px'}} fontWeight={'bold'}>{information.name}</Typography>
                </ButtonBase>

                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={paperProps}
                    transformOrigin={{horizontal: 'right', vertical: 'top'}}
                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                >
                    <MenuItem>
                        <Avatar src={information.avatar}/> Xem trang cá nhân
                    </MenuItem>
                    <Divider/>
                    <MenuItem>
                        <ListItemIcon>
                            <ImageOutlinedIcon fontSize={'small'}/>
                        </ListItemIcon>
                        Thay đổi ảnh
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <ModeEditOutlinedIcon fontSize={'small'}/>
                        </ListItemIcon>
                        Đổi tên cuộc trò chuyện
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <GroupsOutlinedIcon fontSize={'small'}/>
                        </ListItemIcon>
                        Thành viên
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <GroupAddOutlinedIcon fontSize={'small'}/>
                        </ListItemIcon>
                        Thêm người
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <Logout fontSize="small"/>
                        </ListItemIcon>
                        Rời khỏi cuộc trò chuyện
                    </MenuItem>
                </Menu>

                <Box className={styles.headerActions}>
                    <Tooltip placement={'top'} title={'Thu nhỏ đoạn chat'}>
                        <IconButton onClick={() => {
                            dispatch(minimizeChatBox(chatbox))
                        }}><RemoveIcon className={elementActive ? 'color-active' : ''}/></IconButton>
                    </Tooltip>
                    <Tooltip placement={'top'} title={'Đóng đoạn chat'}>
                        <IconButton onClick={() => {
                            dispatch(closeChatBox(chatbox))
                        }}><CloseIcon className={elementActive ? 'color-active' : ''}/></IconButton>
                    </Tooltip>
                </Box>
            </Box>

            <Box className={styles.body}>
                <Box className={styles.bodyMessages}>
                    {renderMessage}
                    <MessageItem owner={true} text={'ời'}/>
                    <MessageItem owner={false} text={'Xin chào mọi người'}/>
                </Box>
            </Box>
            <Box className={styles.footer}>
                <Tooltip title={'Đính kèm file'}>
                    <IconButton>
                        <ImageIcon className={elementActive ? 'color-active' : ''}/>
                        <label htmlFor="file" className='wrapper-ab'></label>
                    </IconButton>
                </Tooltip>
                <input type="file" hidden id="file"/>
                <form style={{display: 'flex', width: '100%', position: 'relative'}}
                      onSubmit={handleSubmit(handleSendMessage)}>
                    <InputStyled {...register('message', {required: true})}
                                 endAdornment={<IconButton
                                     onClick={() => setEmojiActive((emojiActive) => !emojiActive)}>
                                     <SmileIcon active={elementActive}/>
                                 </IconButton>}
                                 placeholder={'Aa'}/>
                    {emojiActive && <WrapperEmojiStyled ref={emojiRef}>
                        <Picker pickerStyle={{
                            position: 'absolute',
                            top: '0px',
                            left: '0px',
                            bottom: '0px',
                            right: '0px',
                            width: '100%',
                            height: '100%'
                        }} onEmojiClick={(event, emojiData) => {
                            setValue('message', `${watch('message')}${emojiData.emoji}`);
                        }}/>
                    </WrapperEmojiStyled>}
                    <IconButton type="submit">
                        <LikeIcon active={elementActive}/>
                    </IconButton>
                </form>
            </Box>
        </Box>
    )
}

const InputStyled = styled(InputBase)`
  width: 100%;
  background: var(--background-gray);
  border-radius: 32px;
  padding-left: 10px;
`

const WrapperEmojiStyled = styled(Box)`
  position: absolute;
  width: 300px;
  background-color: white;
  bottom: 100%;
  right: 50px;
  height: 300px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 1px 1px rgba(0, 0, 0, 0.1);
`

const paperProps = {
    elevation: 0,
    sx: {
        overflow: 'visible',
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        mt: 1.5,
        '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
        },
        '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
        },
    },
}

export default Chatbox;