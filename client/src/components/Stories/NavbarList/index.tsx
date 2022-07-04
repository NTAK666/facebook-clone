import React from 'react';
import styles from './styles.module.scss';
import {Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import StoryItem from "../StoryItem";
import {useAppSelector} from "../../../app/hook";

interface IProps {

}

const NavbarList: React.FC<IProps> = () => {
    const navigate = useNavigate();
    const {storiesMe} = useAppSelector(state => state.storySlice);

    const renderStoriesMe = () => {
        if (storiesMe.length <= 0) return;

        return storiesMe.map((story, index) => {
            return <StoryItem key={index} story={story} />
        })
    }

    return <Box className={styles.root}>
        <Box className={styles.header}>
            <Typography fontWeight={`bold`} fontSize={`x-large`}>Tin</Typography>
            <Box sx={{display: 'flex', gap: '5px'}}>
                <Link to={`/stories`} className={`text-color-link text-decoration-none`}>
                    <Typography fontSize={`medium`}>Kho lưu trữ</Typography>
                </Link>
                .
                <Link to={`/stories`} className={`text-color-link text-decoration-none`}>
                    <Typography fontSize={`medium`}>Cài đặt</Typography>
                </Link>
            </Box>
        </Box>
        <Box className={styles.wrapperStoriesMe}>
            <List
                subheader={
                    <Typography fontWeight={`bold`} fontSize={`large`}>
                        Tin của bạn
                    </Typography>
                }
            >
                <ListItem sx={{padding: 0}}>
                    <ListItemButton onClick={() => navigate(`/stories/create`)}>
                        <ListItemIcon>
                            <Box sx={{backgroundColor: `var(--background-gray)`, padding: `10px`, borderRadius: `50%`}}>
                                <AddIcon/>
                            </Box>
                        </ListItemIcon>
                        <ListItemText
                            primary={<Typography fontWeight={`bold`}>Tạo tin</Typography>}
                            secondary={<Typography variant={`caption`} fontSize={`small`}>Bạn có thể chia sẻ ảnh hoặc
                                viết gì đó</Typography>}
                        />
                    </ListItemButton>
                </ListItem>
                {renderStoriesMe()}
            </List>
        </Box>
        <Box className={styles.wrapperStoriesFriend}>
            <List
                subheader={
                    <Typography fontWeight={`bold`} fontSize={`large`}>
                        Tất cả tin
                    </Typography>
                }
            >
                {renderStoriesMe()}
            </List>
        </Box>
    </Box>
}


export default NavbarList;