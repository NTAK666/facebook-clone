import React from 'react';
import {Avatar, IconButton, Tooltip} from "@mui/material";

interface IProps {
    src: string | null;
    onClick?: () => void;
    title?: string;
}

const AvatarCircle: React.FC<IProps> = ({title, onClick, src}) => {
    return (
        <Tooltip title={title || ''}>
            <IconButton sx={{width: '40px', height: '40px'}} onClick={onClick}>
                <Avatar src={src || ""}/>
            </IconButton>
        </Tooltip>
    )
}
export default AvatarCircle;