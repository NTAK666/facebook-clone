import React from 'react';
import {Box, Button, IconButton, Grid} from "@mui/material";
import styles from "./create-story.module.scss";
import AddIcon from "@mui/icons-material/Add";
import {useAppSelector} from "../../../app/hook";
import {useNavigate} from "react-router-dom";

interface Props {
}

const CreateStoryButton: React.FC<Props> = () => {
    const {user} = useAppSelector(state => state.authSlice)
    const navigate = useNavigate()
    return (
        <Grid item xs={2.25} className={styles.createStory}>
            <Button sx={{height: '100%', padding: '0', width: '100%'}} onClick={() => navigate("/stories/create")}>
                <img
                    src={user.userInfo.avatar || "https://scr.vn/wp-content/uploads/2020/07/Avatar-Facebook-tr%E1%BA%AFng.jpg"}
                    alt=""
                    style={{width: '100%'}}
                />
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