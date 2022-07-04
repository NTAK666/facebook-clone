import React from 'react'
import styles from './story.module.scss';
import {Box, IconButton, Grid} from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CreateStory from './CreateStoryButton';
import StoryItem from '../Story/StoryItem';


const Story = () => {
    return (
        <Box>
            <Grid container className={styles.storyContainer}>
                <CreateStory user={{
                    name: 'Nguyễn Phan Huy Hiếu',
                    avatar: 'https://scontent.fdad3-4.fna.fbcdn.net/v/t1.6435-9/186540483_2924150637822211_8758031143615848898_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=TdIrZhnDatAAX8jrsOK&_nc_ht=scontent.fdad3-4.fna&oh=00_AT9sQ-hwAIv0DdwDuYZjmXfQj8O71xLPakrFhho6AVtAHQ&oe=62D8D521'
                }}/>
                <StoryItem story={{image: 'https://taimienphi.vn/tmp/cf/aut/anh-gai-xinh-1.jpg'}} user={{
                    name: 'Nguyễn Trương Anh Kiệt',
                    avatar: 'https://scontent.fdad3-3.fna.fbcdn.net/v/t39.30808-1/286412953_7777480448958529_2260869162989296128_n.jpg?stp=dst-jpg_p200x200&_nc_cat=100&ccb=1-7&_nc_sid=7206a8&_nc_ohc=kFEzNDpbprYAX-yaZB-&_nc_oc=AQlQe19MGY_RLczqEX9roK97MZonEdUPmLtOsWNIz8vbno1n0dl0eOz3bRqwdWVWnT0EVx_VkdSE-Ln5IIr9JKlv&_nc_ht=scontent.fdad3-3.fna&oh=00_AT_0wt_UrLxiPFLRrN6zODvp8587LU4EGaoefhCK0iAcyw&oe=62C43A7F'
                }}/>
                <StoryItem
                    story={{image: 'https://image-us.24h.com.vn/upload/4-2021/images/2021-12-23/anh-1-1640243906-582-width650height741.jpg'}}
                    user={{
                        name: 'Trần Hữu Tài',
                        avatar: 'https://scontent.fdad3-1.fna.fbcdn.net/v/t1.18169-1/18556006_104946380091976_9183765241575257849_n.jpg?stp=dst-jpg_p200x200&_nc_cat=103&ccb=1-7&_nc_sid=7206a8&_nc_ohc=g4OF5A5XwtIAX8vZkDe&_nc_ht=scontent.fdad3-1.fna&oh=00_AT9CDa1C8UfhuuwfkTiZ-0994v00cV3dgiSoVq0Joi9g-A&oe=62D8D52D'
                    }}/>
                <StoryItem
                    story={{image: 'https://tophinhanh.com/wp-content/uploads/2021/12/hinh-anh-gai-xinh-nhat-the-gioi.jpg'}}
                    user={{
                        name: 'Nguyễn Văn Hoàng',
                        avatar: 'https://scontent.fdad3-4.fna.fbcdn.net/v/t1.6435-9/110200321_138522867877254_7540728164716663231_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=vsWRP7OtH8oAX-r9F4W&_nc_ht=scontent.fdad3-4.fna&oh=00_AT853rzMkdQUnHoeKzorvVUYrTQTqZpXfu1wBfW5QF9U_g&oe=62DBB560'
                    }}/>
                <StoryItem story={{image: 'https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-cap-2-3.jpg'}}
                           user={{
                               name: 'Nam Phan',
                               avatar: 'https://scontent.fdad3-3.fna.fbcdn.net/v/t1.6435-9/123466206_444783609841178_6582193565457816780_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=TWd0VfYuDkwAX_3fkej&_nc_ht=scontent.fdad3-3.fna&oh=00_AT9c_yxkWU3vn2IuMFc6M_eARRXaD5pf_sdJ0LuVKBNBog&oe=62DA25E5'
                           }}/>
                <Box className={styles.seeAll}>
                    <IconButton sx={{
                        backgroundColor: 'white',
                        boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.2)',
                        '&:hover': {backgroundColor: 'white'}
                    }}>
                        <ArrowForwardIcon/>
                    </IconButton>
                </Box>
            </Grid>
        </Box>
    );
}

export default Story;
