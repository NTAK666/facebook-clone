import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IPostCreate, IPostFull} from "../models/Post";
import {Response} from "../models/Response";

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
    tagTypes: ["IPostFull", "IPostCreate"],
    endpoints: (build) => ({
        createPost: build.mutation<Response<IPostFull>, IPostCreate>({
            query: (data) => ({
                url: "/create",
                method: "POST",
                body: data,
            }),
        }),
        getPostsByFriend: build.query<Response<IPostFull[]>, void>({
            query: () => ({
                url: "/friends?page=0&size=10",
                method: "GET",
            }),
        }),
        getPostsByMe: build.query<Response<IPostFull[]>, void>({
            query: () => ({
                url: "/all",
                method: "GET",
            }),
        })
    }),
});

export const {useCreatePostMutation, useGetPostsByFriendQuery, useGetPostsByMeQuery} = postService;
