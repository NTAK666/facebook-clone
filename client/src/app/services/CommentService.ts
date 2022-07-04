import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const BASE_URL = process.env.REACT_APP_URL_API || "";

export const CommentService = createApi({
    reducerPath: "CommentService",
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/comments`,
        prepareHeaders(headers) {
            return headers;
        },
    }),
    endpoints: (build) => ({}),
});

export const {} = CommentService;
