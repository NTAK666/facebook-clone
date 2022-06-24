import React from 'react';
import {Badge, IconButton, Tooltip} from "@mui/material";
import styled from "@emotion/styled";

interface IProps {
    children: React.ReactNode;
    onClick?: (e: any) => void;
    title?: string;
    number?: number;
    color?: "primary" | "secondary" | "default" | "error" | "info" | "success" | "warning";
    width?: string;
    height?: string;
}

const ButtonCircle: React.FC<IProps> = (props) => {
    const {title = '', onClick, children, number, color, width = '40px', height = '40px'} = props;
    return <>
        <Tooltip title={title}>
            <Badge badgeContent={number || null} color={color || "default"}>
                <IconButtonCustom onClick={onClick} sx={{width: width, height: height}}>
                    {children}
                </IconButtonCustom>
            </Badge>
        </Tooltip>
    </>
}

const IconButtonCustom = styled(IconButton)`
  background-color: #d8dadf;

  &:hover {
    background-color: #cbccd0;
  }
`

export default ButtonCircle;