import React from 'react';
import {Box, Grid} from "@mui/material";
import styles from "../ProfileIntroduce/profile-introduce.module.scss";
import CreatePost from "../../CreatePost";
import ListPost from "../../Post/ListPost";
import {useGetPostsQuery} from "../../../app/services/PostService";
import {IPost} from "../../../app/models/Post";
import PostNormal from "../../Post/PostNormal";
import moment from "moment";

const ProfilePost = () => {
    const {data} = useGetPostsQuery();

    const renderPosts = () => {
        if (!data) {
            return null;
        }
        return data.data.map((post: IPost) => {
            return <PostNormal
                key={post.id}
                postId={post.id}
                likeNumber={post.likes}
                time={moment(post.publishDate).fromNow()}
                username={post.owner.lastName}
                content={post.text}
                image={post.image}
            />
        })
    }
    return (
            <Box className={styles.post}>
                <CreatePost name={'Nguyễn Phan Huy Hiếu'}
                            avatar={'https://scontent.fdad3-4.fna.fbcdn.net/v/t1.6435-9/186540483_2924150637822211_8758031143615848898_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=TdIrZhnDatAAX8jrsOK&_nc_ht=scontent.fdad3-4.fna&oh=00_AT9sQ-hwAIv0DdwDuYZjmXfQj8O71xLPakrFhho6AVtAHQ&oe=62D8D521'}/>
                <ListPost>
                    {renderPosts()}
                </ListPost>
            </Box>
    )
}

export default ProfilePost;