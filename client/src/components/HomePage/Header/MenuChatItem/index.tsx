import React from 'react';
import {
    Avatar,
    Divider,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Typography
} from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {Logout} from "@mui/icons-material";
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {IUserFull} from "../../../../app/models/User";

interface IProps {
    src: string;
    title: string;
    description?: string;
    onClick?: () => void;
    user: IUserFull;
}

const MenuChatItem: React.FC<IProps> = ({onClick, src, title, description, user}) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return <>
        <ListItem secondaryAction={
            <IconButton onClick={handleClick}>
                <MoreHorizIcon/>
            </IconButton>}
                  disablePadding
        >
            <ListItemButton role={undefined} onClick={onClick}
                            sx={{gap: '10px', padding: '4px 8px', borderRadius: '6px'}} dense>
                <ListItemAvatar>
                    <Avatar src={src} alt={title} sx={{width: '50px', height: '50px'}}/>
                </ListItemAvatar>
                <ListItemText
                    primary={<Typography fontSize={'medium'} fontWeight={'bold'}
                                         className={'text-limit-line-1'}>{title}</Typography>}
                    secondary={<Typography className={'text-limit-line-1'}
                                           fontSize={'small'}>{description}</Typography>}>
                </ListItemText>
            </ListItemButton>
        </ListItem>
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
                <Avatar src={src}/> Xem trang cá nhân
            </MenuItem>
            <Divider/>
            <MenuItem>
                <ListItemIcon>
                    <MessageOutlinedIcon fontSize={'small'}/>
                </ListItemIcon>
                Mở chat
            </MenuItem>
            <MenuItem>
                <ListItemIcon>
                    <DeleteOutlineOutlinedIcon fontSize="small"/>
                </ListItemIcon>
                Xoá đoạn chat
            </MenuItem>
            <MenuItem>
                <ListItemIcon>
                    <Logout fontSize="small"/>
                </ListItemIcon>
                Rời khỏi nhóm
            </MenuItem>
        </Menu>
    </>
}

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

export default MenuChatItem;