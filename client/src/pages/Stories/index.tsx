import React from 'react';
import StoriesLayout from "../../layouts/StoriesLayout";
import {useGetStoriesByMeQuery} from "../../app/services/StoryService";
import {Box, Typography} from "@mui/material";

interface IProps {

}

const StoriesPage: React.FC<IProps> = () => {
    useGetStoriesByMeQuery();
    return <>
        <StoriesLayout>
            <Box sx={{display: `flex`,height: `100%`, justifyContent: `center`, alignItems: `center`}}>
                <Box sx={{display: `flex`, flexDirection: `column`}}>
                    <img
                        style={{width: `112px`, height: `112px`}}
                        src="https://www.facebook.com/images/comet/empty_states_icons/media/null_states_media_gray_wash.svg"
                        alt=""/>
                    <Typography sx={{color: `#65676B`}} fontWeight={`bold`}>
                        Chọn tin để mở.
                    </Typography>
                </Box>
            </Box>
        </StoriesLayout>
    </>
}
export default StoriesPage;