import React from 'react'
import HomeLayout from "../../layouts/HomeLayout";
import ListPost from "../../components/Post/ListPost";
import {Box} from "@mui/material";
import PostNormal from "../../components/Post/PostNormal";
import CreatePost from "../../components/CreatePost";
import Story from "../../components/Story";
import {useGetPostsQuery} from "../../app/services/PostService";
import {IPost} from "../../app/models/Post";
import moment from "moment";


const HomePage: React.FC = () => {
    const {data} = useGetPostsQuery();

    const renderPosts = () => {
        if (!data) {
            return null;
        }
        return data.data.map((post:IPost) => {
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
        <HomeLayout>
            <Box sx={{maxWidth: '680px', width: '680px'}}>
                <Story/>
                <CreatePost  name={'Nguyễn Phan Huy Hiếu'} avatar={'https://scontent.fdad3-4.fna.fbcdn.net/v/t1.6435-9/186540483_2924150637822211_8758031143615848898_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=TdIrZhnDatAAX8jrsOK&_nc_ht=scontent.fdad3-4.fna&oh=00_AT9sQ-hwAIv0DdwDuYZjmXfQj8O71xLPakrFhho6AVtAHQ&oe=62D8D521'}/>
                <ListPost>
                    {renderPosts()}
                </ListPost>
            </Box>
        </HomeLayout>
    )
}

export default HomePage;