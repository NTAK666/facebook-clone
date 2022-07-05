import React, {useEffect} from 'react';
import Chatbox from "../../components/Chatbox";
import ChatBoxHidden from "../../components/Chatbox/Hidden";
import {IChatBox} from "../../app/features/ChatBoxSlice";
import Header from "../../components/HomePage/Header";
import styled from "@emotion/styled";
import {useAppSelector} from "../../app/hook";
import ProfileInformation from "../../components/Profile/ProfileInformation";
import {Box} from "@mui/material";
import {useParams} from "react-router-dom";
import {useGetUserByIdMutation} from "../../app/services/UserService";

interface IProps {
    children: React.ReactNode;
}

const ProfileLayout: React.FC<IProps> = ({children}) => {
    const {id} = useParams();
    const {user} = useAppSelector(state => state.authSlice);
    const [getUserByIdApi] = useGetUserByIdMutation();
    useEffect(() => {
        if (id) {
            getUserByIdApi(id)
        }
    }, [id, getUserByIdApi, user]);
    useEffect(() => {
        if (id) {
            const userSplit = id.split('-');
            const userId = userSplit[userSplit.length - 1]
            getUserByIdApi(userId);
        }
    }, [getUserByIdApi, id]);
    const {chatbox} = useAppSelector(state => state.chatBoxSlice);
    const renderChatBox = () => {
        return chatbox.map((item: IChatBox, index) => {
            if (item.status === "HIDE") return null;
            return <Chatbox key={index} position={index === 0 ? 'chatbox-one' : 'chatbox-two'}
                            chatbox={item.user}/>
        })
    }
    return <>
        <Header/>
        <WrapperContentStyled>
            <ContentStyled>
                <Box>
                    <ProfileInformation />
                    {children}
                </Box>
            </ContentStyled>
            {renderChatBox()}
            <ChatBoxHidden/>
        </WrapperContentStyled>
    </>
}
const WrapperContentStyled = styled.main`
  margin-top: var(--header-height);
  display: flex;
  background-color: var(--background-home);
  height: 100%;
`
const ContentStyled = styled.div`
  width: 100%;
  justify-content: center;
`

export default ProfileLayout;