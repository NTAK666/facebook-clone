import {Box} from "@mui/material";
import React from 'react';
import {useAppSelector} from "../../app/hook";
import {useGetPostsByFriendQuery} from "../../app/services/PostService";
import CreatePost from "../../components/CreatePost";
import ListPost from "../../components/Post/ListPost";
import PostNormal from "../../components/Post/PostNormal";
import PostSkeleton from '../../components/Skeleton/PostSkeleton';
import Story from "../../components/Story";
import HomeLayout from "../../layouts/HomeLayout";

const HomePage: React.FC = () => {
    const {isLoading} = useGetPostsByFriendQuery();
    const {posts} = useAppSelector(state => state.postSlice)

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
        <HomeLayout>
            <Box sx={{maxWidth: '680px', width: '680px'}}>
                <Story/>
                <CreatePost/>
                <ListPost>
                    {renderPosts()}
                    <PostSkeleton/>
                    <PostSkeleton/>
                </ListPost>
            </Box>
        </HomeLayout>
    )
}

export default HomePage;