import React from 'react';
import styles from "../../Story/StoryItem/story-item.module.scss";
import {Button, Grid, Typography} from "@mui/material";

interface Props {
    story: {
        image: string;
    },
    nameStory?: string;
}

const FeaturedStory: React.FC<Props> = (props) => {
    return (
        <Grid item xs={3.75} className={styles.storyListItem} >
            <Button className={styles.item} >
                <img className={styles.imgStory} src={props.story.image} alt=""/>
            </Button>
            <Typography sx={{textAlign: 'center', width: '100%', marginTop: '3px'}}>🙋</Typography>
        </Grid>
    )
}

export default FeaturedStory;