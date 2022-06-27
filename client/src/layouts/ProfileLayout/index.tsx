import React from 'react';
import Chatbox from "../../components/Chatbox";
import ChatBoxHidden from "../../components/Chatbox/Hidden";
import {IChatBox} from "../../app/features/ChatBoxSlice";
import Header from "../../components/HomePage/Header";
import styled from "@emotion/styled";
import {useAppSelector} from "../../app/hook";

interface IProps {
    children: React.ReactNode;
}

const ProfileLayout: React.FC<IProps> = ({children}) => {
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
                {children}
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