import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Response} from "../models/Response";
import {IStoryCreate, IStoryFull} from "../models/Story";

const BASE_URL = process.env.REACT_APP_URL_API || "";

export const storyService = createApi({
    reducerPath: "storyService",
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/stories`,
        prepareHeaders(headers) {
            const accessToken = localStorage.getItem("auth");
            headers.set("Authorization", `Bearer ${accessToken}`);
            return headers;
        },
    }),
    tagTypes: ["IStoryFull", "IStoryCreate"],
    endpoints: (build) => ({
        createStory: build.mutation<Response<IStoryFull>, IStoryCreate>({
            query: (data) => ({
                url: `/create`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["IStoryFull"],
        }),
        getStoriesByMe: build.query<Response<IStoryFull[]>, void>({
            query: () => ({
                url: `/all`,
                method: "GET",
            }),
            providesTags: ["IStoryFull"],
        }),
        getStoryById: build.mutation<Response<IStoryFull>, string>({
            query: (id) => ({
                url: `/get/${id}`,
                method: "GET",
            }),
        })
    }),
});

export const {useGetStoryByIdMutation, useCreateStoryMutation, useGetStoriesByMeQuery} = storyService;
