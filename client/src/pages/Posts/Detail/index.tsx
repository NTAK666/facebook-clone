import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import HomeLayout from "../../../layouts/HomeLayout";
import {Box} from "@mui/material";
import styles from './styles.module.scss'
import {useFindPostByIdMutation} from "../../../app/services/PostService";
import {IPostFull} from "../../../app/models/Post";
import PostNormal from "../../../components/Post/PostNormal";
import {POST_DEFAULT} from "../../../app/features/PostSlice";

interface IProps {

}

const PostDetail: React.FC<IProps> = () => {
    const {slug} = useParams();
    const [findByPostApi] = useFindPostByIdMutation();
    const [postDetail, setPostDetail] = useState<IPostFull>(POST_DEFAULT);

    useEffect(() => {
        if (slug) {
            const temp = slug.split(`-`);
            const id = temp[temp.length - 1];
            findByPostApi(id).then((response: any) => {
                if (response.data.status === 200) {
                    setPostDetail(response.data.data)
                }
            })
        }
    }, [findByPostApi, slug]);

    console.log(postDetail)

    return <HomeLayout isNavbarLeft={false} isNavbarRight={false}>
        <Box className={styles.root}>
            <PostNormal post={postDetail}/>
        </Box>
    </HomeLayout>
}


export default PostDetail;