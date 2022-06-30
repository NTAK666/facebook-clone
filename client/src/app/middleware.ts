import {getDefaultMiddleware} from "@reduxjs/toolkit";
import {userService} from "./services/UserService";
import {postService} from "./services/PostService";
import {authService} from "./services/AuthService";

export const middleware = [
    ...getDefaultMiddleware(),
    userService.middleware,
    postService.middleware,
    authService.middleware

];