import React from 'react';
import Header from "../../components/HomePage/Header";
import styled from "@emotion/styled";
import NavbarRight from "../../components/HomePage/NavbarRight";
import NavbarLeft from "../../components/HomePage/NavbarLeft";
import {Box} from "@mui/material";

interface IProps {
    children: React.ReactNode;
}

const HomeLayout: React.FC<IProps> = ({children}) => {
    return <>
        <Header/>
        <WrapperContentStyled>
            <Box>
                <NavbarLeft/>
            </Box>
            <ContentStyled>
                {children}
            </ContentStyled>
            <Box>
                <NavbarRight/>
            </Box>
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
  margin-right: var(--navbar-width);
  margin-left: var(--navbar-width);
  width: 100%;
  display: flex;
  justify-content: center;
`

export default HomeLayout;