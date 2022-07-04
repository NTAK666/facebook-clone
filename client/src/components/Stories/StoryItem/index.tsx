import styled from '@emotion/styled';
import {Avatar, Box, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material";
import React from 'react';
import {IStoryFull} from '../../../app/models/Story';
import moment from 'moment';
import {useNavigate} from "react-router-dom";

interface IProps {
    story: IStoryFull
}

const StoryItem: React.FC<IProps> = ({story}) => {
    const navigate = useNavigate();

    return <>
        <ListItem disablePadding>
            <ListItemButton onClick={() => {
                navigate(`/stories/${story.slug}-${story.id}`)
            }} sx={{display: "flex", gap: "10px", borderRadius: '4px', padding: `5px 10px`}}>
                <ListItemIcon>
                    <WrapperAvatar>
                        <Avatar src={story.image} sx={{width: "50px", height: "50px"}}/>
                    </WrapperAvatar>
                </ListItemIcon>
                <ListItemText primary={
                    <Typography
                        fontWeight={`bold`}>{`${story.user.userInfo.firstName} ${story.user.userInfo.lastName}`}</Typography>
                }
                              secondary={
                                  <Typography>{moment(story.createdAt).fromNow()}</Typography>
                              }
                />
            </ListItemButton>
        </ListItem>
    </>
}


const WrapperAvatar = styled(Box)`
  border: 3px solid #ced0d4;
  border-radius: 50%;
`


export default StoryItem;