import React from 'react';
import {IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface IProps {
    icon: React.ReactNode;
    text: string;
    arrowIcon?: boolean;
    onClick?: () => void;
}

const MultiMenuItem: React.FC<IProps> = ({icon, arrowIcon = false, text, onClick}) => {
    return <>
        <ListItem disablePadding secondaryAction={
            arrowIcon && (
                <IconButton>
                    <ChevronRightIcon/>
                </IconButton>
            )
        }>
            <ListItemButton sx={{borderRadius: '6px', padding: '10px 20px'}} onClick={onClick}>
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                <ListItemText
                    primary={<Typography sx={{fontSize: '16px'}} fontWeight={'bold'}>
                        {text}
                    </Typography>}
                />
            </ListItemButton>
        </ListItem>
    </>
}
export default MultiMenuItem;