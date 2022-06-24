import {configureStore} from "@reduxjs/toolkit";
import {reducers} from "./reducers";
import {middleware} from "./middleware";

export const store = configureStore({
    reducer: reducers,
    middleware,
    devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
