import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const BASE_URL = process.env.REACT_APP_URL_API;
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
    endpoints: (build) => ({}),
});

// export const {} = userService;
