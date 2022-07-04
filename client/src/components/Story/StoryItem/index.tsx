import React from 'react';
import {Avatar, Button, Grid, Box} from "@mui/material";
import styles from "../StoryItem/story-item.module.scss";
import {IStoryFull} from "../../../app/models/Story";
import {useNavigate} from "react-router-dom";

interface Props {
    story: IStoryFull
}

const StoryItem: React.FC<Props> = ({story}) => {
    const navigate = useNavigate();
    return (
        <Grid item xs={2.25} className={styles.storyListItem}>
            <Button className={styles.item}
                    onClick={() => navigate(`/stories/${story.slug}-${story.id}`)}
            >
                <Box className={styles.avatarBox}>
                    <Avatar src={story.user.userInfo.avatar || ""} className={styles.avatar}/>
                </Box>
                <img className={styles.imgStory} src={story.image} alt=""/>
                <span
                    className={styles.name}>{`${story.user.userInfo.firstName} ${story.user.userInfo.lastName}`}</span>
            </Button>
        </Grid>
    );
}

export default StoryItem;