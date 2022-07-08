import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IUserFull, IUserUpdate} from "../models/User";
import {Response} from "../models/Response";

const BASE_URL = process.env.REACT_APP_URL_API;

export const userService = createApi({
    reducerPath: "userService",
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/users`,
        prepareHeaders(headers) {
            const accessToken = localStorage.getItem("auth");
            headers.set("Authorization", `Bearer ${accessToken}`);
            return headers;
        },
    }),
    tagTypes: ["UpdateImage"],
    endpoints: (build) => ({
        findByName: build.mutation<Response<IUserFull[]>, string>({
            query: (name) => ({
                url: `/find-by-name?name=${name}`,
                method: "GET",
            })
        }),
        getUserById: build.mutation<Response<IUserFull>, string>({
            query: (id) => ({
                url: `/get/${id}`,
                method: "GET",
            })
        }),
        getImageOfUser: build.query<Response<string[]>, void>({
            query: () => ({
                url: `/get-image-of-user`,
                method: "GET",
            }),
            providesTags: ["UpdateImage"],
        }),
        updateUser: build.mutation<Response<IUserFull>, IUserUpdate>({
            query: (data) => ({
                url: `/settings/update`,
                method: "PUT",
                body: data,
            }),
        })
    }),
});

export const {useFindByNameMutation, useGetUserByIdMutation, useGetImageOfUserQuery, useUpdateUserMutation} = userService;
