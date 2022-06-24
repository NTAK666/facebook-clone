import React, {useEffect, useMemo, useState} from 'react';
import styles from './styles.module.scss'
import {Box, IconButton, Tooltip} from "@mui/material";
import AvatarOnline from "../../Avatar/AvatarOnline";
import {useAppDispatch, useAppSelector} from "../../../app/hook";
import {IChatBox, openChatBox, removeAllHiddenBox} from "../../../app/features/ChatBoxSlice";
import styled from "@emotion/styled";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

interface IProps {

}

const ChatBoxHidden: React.FC<IProps> = () => {
    const {chatbox} = useAppSelector(state => state.chatBoxSlice);
    const dispatch = useAppDispatch();
    const [numberHidden, setNumberHidden] = useState<null | number>(null);
    const [chatBoxHidden, setChatBoxHidden] = useState<IChatBox[]>([]);

    useEffect(() => {
        const listHidden: IChatBox[] = chatbox.filter(item => item.status === "HIDE");
        setChatBoxHidden([...listHidden])
        let count = listHidden.slice(5).length;
        if (count > 0) {
            setNumberHidden(listHidden.slice(5).length);
        } else {
            setNumberHidden(null)
        }
    }, [chatbox]);


    const renderChatboxHidden = useMemo(() => {
        return chatBoxHidden.map((item: IChatBox, index) => {
            if (index >= 5) return null;
            return (
                <IconButton key={index} onClick={() => {
                    dispatch(openChatBox(item.user));
                }}>
                    <AvatarOnline width={'50px'} height={'50px'} src={item.user.picture} online={true}/>
                </IconButton>
            )
        })
    }, [chatBoxHidden, dispatch]);

    return (
        <Box className={styles.root}>
            <Box className={styles.listIcon}>
                {chatBoxHidden.length > 0 && (
                    <Tooltip placement={"top"} title={'Đóng tất cả đoạn chat'}>
                        <IconButton onClick={() => {
                            dispatch(removeAllHiddenBox())
                        }} sx={{backgroundColor: 'white'}}>
                            <MoreHorizIcon/>
                        </IconButton>
                    </Tooltip>
                )}
                {numberHidden && <BoxCircle>{numberHidden}</BoxCircle>}
                {renderChatboxHidden}
            </Box>
        </Box>
    )
}

const BoxCircle = styled(IconButton)`
  width: 55px;
  height: 55px;
  background-color: rgba(0,0,0,0.2);
`

export default ChatBoxHidden;