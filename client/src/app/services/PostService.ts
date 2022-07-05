import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IPostCreate, IPostFull} from "../models/Post";
import {Response} from "../models/Response";
import {ICommentCreate} from "../models/Comment";
import {IReactCreate, IReactFull} from "../models/React";

const BASE_URL = process.env.REACT_APP_URL_API || "";

export const postService = createApi({
    reducerPath: "postService",
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/posts`,
        prepareHeaders(headers) {
            const accessToken = localStorage.getItem("auth");
            headers.set("Authorization", `Bearer ${accessToken}`);
            return headers;
        },
    }),
    tagTypes: ["IPostFull", "IPostCreate", "UpdateImage"],
    endpoints: (build) => ({
        createPost: build.mutation<Response<IPostFull>, IPostCreate>({
            query: (data) => ({
                url: "/create",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["UpdateImage"],
        }),
        getPostsByMe: build.query<Response<IPostFull[]>, void>({
            query: () => `/all`,
        }),
        getPostsByFriend: build.query<Response<IPostFull[]>, void>({
            query: () => ({
                url: "/friends?page=0&size=10",
                method: "GET",
            }),
        }),
        sendCommentByPost: build.mutation<Response<IPostFull>, ICommentCreate>({
            query: (data) => ({
                url: `/comment/${data.postId}`,
                method: "POST",
                body: {
                    comment: data.comment,
                },
            })
        }),
        reactByPost: build.mutation<Response<IReactFull>, IReactCreate>({
            query: (data) => ({
                url: `/react/${data.postId}`,
                method: "POST",
                body: {
                    reactType: data.reactType,
                }
            })
        })
    }),
});

export const {
    useCreatePostMutation,
    useGetPostsByFriendQuery,
    useGetPostsByMeQuery,
    useSendCommentByPostMutation,
    useReactByPostMutation
} = postService;