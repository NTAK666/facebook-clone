import React from 'react';
import {Box, Grid} from "@mui/material";
import styles from "../ProfileIntroduce/profile-introduce.module.scss";
import CreatePost from "../../CreatePost";
import ListPost from "../../Post/ListPost";
import {useGetPostsByMeQuery} from "../../../app/services/PostService";
import PostNormal from "../../Post/PostNormal";
import PostSkeleton from "../../Skeleton/PostSkeleton";
import {useAppSelector} from "../../../app/hook";


const ProfilePost = () => {
    const {isLoading} = useGetPostsByMeQuery();
    const {posts} = useAppSelector(state => state.postSlice);

    const renderPosts = () => {
        if (isLoading) {
            return (
                <>
                    <PostSkeleton/>
                    <PostSkeleton/>
                </>
            )
        }

        if (posts.length > 0) {
            return posts.map((post, index) => {
                return (
                    <PostNormal
                        key={index}
                        postId={post.id}
                        likeNumber={post.reactPosts.length}
                        time={'1 giờ trước'}
                        username={`${post.user.userInfo.firstName} ${post.user.userInfo.lastName}`}
                        content={post.body}
                        image={post.thumbnail}
                    />
                )
            })
        }
    }
    return (
        <Box className={styles.post}>
            <CreatePost />
            <ListPost>
                {renderPosts()}
            </ListPost>
        </Box>
    )
}

export default ProfilePost;