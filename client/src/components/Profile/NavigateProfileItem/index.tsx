import React from 'react';
import styled from "@emotion/styled";
import {ButtonBase, Tooltip} from "@mui/material";
import {Link} from "react-router-dom";

interface IProps {
    children: React.ReactNode;
    to: string;
    active: boolean;
    title?: string;
}

const NavigateProfileItem: React.FC<IProps> = ({title, to, children, active}) => {
    return <>
        <Tooltip title={title || ''}>
            <LinkStyled to={to} className={active ? 'navigate-profile-active' : ''}>
                <ButtonStyled className={'button-active'}>
                    {children}
                </ButtonStyled>
            </LinkStyled>
        </Tooltip>
    </>
}

const LinkStyled = styled(Link)`
  text-decoration: none;
  color: #65676B;
`

const ButtonStyled = styled(ButtonBase)`
  min-width: 50px;
  height: 100%;
  padding: 10px 25px;
  border-radius: 6px;
  font-size: .875rem;
  font-weight: bold;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`


export default NavigateProfileItem;