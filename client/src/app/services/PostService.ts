import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IPost} from "../models/Post";
import {Response} from "../models/Response";
import {IComment} from "../models/Comment";

const BASE_URL = process.env.REACT_APP_URL_API;
const APP_ID = process.env.REACT_APP_APP_ID || '';

export const postService = createApi({
    reducerPath: "postService",
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/post`,
        prepareHeaders(headers) {
            headers.set('app-id', APP_ID)
            return headers;
        },
    }),
    endpoints: (build) => ({
        getPosts : build.query<Response<IPost[]>, void>({
            query: () => `?limit=5&page=1`
        }),
        getCommentByPost : build.query<Response<IComment[]>, string>({
            query: (postId) => `/${postId}/comment?limit=5&page=1`
        })
    }),
});

export const {useGetPostsQuery, useGetCommentByPostQuery} = postService;
