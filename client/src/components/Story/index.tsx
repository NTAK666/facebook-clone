import React from 'react'
import styles from './story.module.scss';
import {Box, Grid, IconButton} from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CreateStory from './CreateStoryButton';
import StoryItem from '../Story/StoryItem';
import {useAppSelector} from "../../app/hook";
import {useNavigate} from "react-router-dom";


const Story = () => {
    const {storiesMe} = useAppSelector(state => state.storySlice);
    const navigate = useNavigate();

    return (
        <Box>
            <Grid container className={styles.storyContainer}>
                <CreateStory/>
                {storiesMe.slice(0, 4).map((story, index) => {
                    return (
                        <StoryItem key={index} story={story}/>
                    )
                })}
                {storiesMe.length >= 4 && (
                    <Box className={styles.seeAll}>
                        <IconButton
                            onClick={() => navigate(`/stories`)}
                            sx={{
                                backgroundColor: 'white',
                                boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.2)',
                                '&:hover': {backgroundColor: 'white'}
                            }}>
                            <ArrowForwardIcon/>
                        </IconButton>
                    </Box>
                )}
            </Grid>
        </Box>
    );
}

export default Story;
