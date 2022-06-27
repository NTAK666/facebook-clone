import {getDefaultMiddleware} from "@reduxjs/toolkit";
import {userService} from "./services/UserService";
import {postService} from "./services/PostService";

export const middleware = [
    ...getDefaultMiddleware(),
    userService.middleware,
    postService.middleware
];