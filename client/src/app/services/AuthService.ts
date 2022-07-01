import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUserFull, IUserLogin, IUserRegister } from "../models/User";
import { Response } from "../models/Response";

const BASE_URL = process.env.REACT_APP_URL_API || `http://localhost:1000/api/v1`;

export const authService = createApi({
    reducerPath: "authService",
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/auth`,
        prepareHeaders(headers) {
            const token = localStorage.getItem("auth");
            if (token) headers.set("Authorization", `Bearer ${token}`);
            return headers;
        },
    }),
    endpoints: (build) => ({
        postRegister: build.mutation<void, IUserRegister>({
            query: (data) => ({
                url: `/register`,
                method: `POST`,
                body: data,
            }),
        }),
        postLogin: build.mutation<void, IUserLogin>({
            query: (data) => ({
                url: `/login`,
                method: `POST`,
                body: data,
            }),
        }),
        getMe: build.query<Response<IUserFull>, void>({
            query: () => ({
                url: `/me`,
                method: `GET`,
            }),
        }),
    }),
});

export const { usePostRegisterMutation, usePostLoginMutation, useGetMeQuery } = authService;
