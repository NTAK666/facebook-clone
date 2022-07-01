import {userService} from "./services/UserService";
import {authService} from "./services/AuthService";
import {postService} from "./services/PostService";
import {getDefaultMiddleware} from "@reduxjs/toolkit";

export const middleware = [
    ...getDefaultMiddleware(),
    userService.middleware,
    authService.middleware,
    postService.middleware
];