import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const BASE_URL = process.env.REACT_APP_URL_API;

export const userService = createApi({
    reducerPath: "userService",
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/user`,
        prepareHeaders(headers) {
            return headers;
        },
    }),
    endpoints: (build) => ({}),
});

// export const {} = userService;
