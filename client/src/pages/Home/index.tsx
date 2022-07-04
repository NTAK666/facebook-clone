import { Box } from "@mui/material";
import React from 'react';
import { useAppSelector } from "../../app/hook";
import {useGetPostsByFriendQuery, useGetPostsByMeQuery} from "../../app/services/PostService";
import CreatePost from "../../components/CreatePost";
import ListPost from "../../components/Post/ListPost";
import PostNormal from "../../components/Post/PostNormal";
import PostSkeleton from '../../components/Skeleton/PostSkeleton';
import Story from "../../components/Story";
import HomeLayout from "../../layouts/HomeLayout";
import {useGetStoriesByMeQuery} from "../../app/services/StoryService";

const HomePage: React.FC = () => {
    const { isLoading } = useGetPostsByFriendQuery();
    useGetStoriesByMeQuery();
    useGetPostsByMeQuery();
    const { posts } = useAppSelector(state => state.postSlice)

    const renderPosts = () => {
        if (isLoading) {
            return (
                <>
                    <PostSkeleton />
                    <PostSkeleton />
                </>
            )
        }

        if (posts.length > 0) {
            return posts.map((post, index) => {
                return (
                    <PostNormal
                        key={index}
                        post={post}
                    />
                )
            })
        }
    }

    return (
        <HomeLayout>
            <Box sx={{ maxWidth: '680px', width: '680px' }}>
                <Story />
                <CreatePost />
                <ListPost>
                    {renderPosts()}
                    <PostSkeleton />
                    <PostSkeleton />
                </ListPost>
            </Box>
        </HomeLayout>
    )
}

export default HomePage;