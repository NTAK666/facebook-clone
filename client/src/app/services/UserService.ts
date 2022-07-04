import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IUserFull} from "../models/User";
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
    endpoints: (build) => ({
        findByName: build.mutation<Response<IUserFull[]>, string>({
            query: (name) => ({
                url: `/find-by-name?name=${name}`,
                method: "GET",
            })
        })
    }),
});

export const {useFindByNameMutation} = userService;
