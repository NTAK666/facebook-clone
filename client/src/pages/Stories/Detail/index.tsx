import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import StoriesLayout from "../../../layouts/StoriesLayout";
import {Box, IconButton} from "@mui/material";
import styles from './styles.module.scss'
import {useGetStoriesByMeQuery, useGetStoryByIdMutation} from "../../../app/services/StoryService";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {useAppDispatch, useAppSelector} from "../../../app/hook";
import {setStoryCurrent} from "../../../app/features/StorySlice";
import {LIST_REACT} from "../../../constants";

interface IProps {

}

const StoryDetail: React.FC<IProps> = () => {
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useGetStoriesByMeQuery();
    const [getStoryByIdApi, {data}] = useGetStoryByIdMutation();
    const {storyNext, storyPrevious} = useAppSelector(state => state.storySlice);

    useEffect(() => {
        if (data) {
            dispatch(setStoryCurrent(data.data.id));
        }
    }, [data, dispatch])

    useEffect(() => {
        if (id) {
            const storySplit = id.split('-');
            const storyId = storySplit[storySplit.length - 1]
            getStoryByIdApi(storyId);

        }
    }, [getStoryByIdApi, id]);

    const handleNavigate = (type: string) => {
        if (type === 'NEXT' && storyNext) {
            navigate(`/stories/${storyNext}`);
        } else if (type === 'PREVIOUS' && storyPrevious) {
            navigate(`/stories/${storyPrevious}`);
        } else {
            navigate(`/stories`);
        }
    }


    return <StoriesLayout>
        <Box className={styles.root}>
            <Box className={styles.wrapperContent}>
                <IconButton onClick={() => handleNavigate(`PREVIOUS`)} className={styles.buttonPrevious}>
                    <ArrowBackIosNewIcon/>
                </IconButton>
                {data && <img src={data.data.image} alt=""/>}
                <IconButton onClick={() => handleNavigate(`NEXT`)} className={styles.buttonNext}>
                    <ArrowForwardIosIcon/>
                </IconButton>
                <Box sx={{display: `flex`, justifyContent: `center`}}>
                    {LIST_REACT.map((item, index) => {
                        return (
                            <IconButton key={index} className={styles.buttonReact}>
                                <img src={item.src} alt={item.name}/>
                            </IconButton>
                        )
                    })}

                </Box>
            </Box>

        </Box>
    </StoriesLayout>
}


export default StoryDetail;