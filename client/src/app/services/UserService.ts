import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IUser, IUserFull} from "../models/User";
import {Response} from "../models/Response";

const BASE_URL = process.env.REACT_APP_URL_API;
const FAKE_ID_USER_CURRENT = `60d0fe4f5311236168a109ca`
const APP_ID = process.env.REACT_APP_APP_ID || '';

export const userService = createApi({
    reducerPath: "userService",
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/user`,
        prepareHeaders(headers) {
            headers.set('app-id', APP_ID)
            return headers;
        },
    }),
    endpoints: (build) => ({
        getMe: build.query<IUserFull, void>({
            query: () => `/${FAKE_ID_USER_CURRENT}`
        }),
        getFriends: build.query<Response<IUser[]>, void>({
            query: () => `?limit=30&page=2`
        })
    }),
});

export const {useGetMeQuery, useGetFriendsQuery} = userService;
