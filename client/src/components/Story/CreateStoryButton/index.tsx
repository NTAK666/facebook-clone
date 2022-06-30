import React from 'react';
import {Box, Button, IconButton, Grid} from "@mui/material";
import styles from "./create-story.module.scss";
import AddIcon from "@mui/icons-material/Add";

interface Props {
    user: {
        name: string;
        avatar: string;
    }
}

const CreateStoryButton: React.FC<Props> = (props) => {
    return (
        <Grid item xs={2.25} className={styles.createStory}>
            <Button sx={{height: '100%', padding: '0'}}>
                <img
                    src={props.user.avatar}
                    alt=""/>
                <Box className={styles.addBox}>
                            <span className={styles.addButton}>
                                <IconButton className={styles.button}>
                                    <AddIcon sx={{color: 'white'}}/>
                                </IconButton>
                            </span>
                    <span className={styles.text}>Tạo tin</span>
                </Box>
            </Button>
        </Grid>
    );
}

export default CreateStoryButton;