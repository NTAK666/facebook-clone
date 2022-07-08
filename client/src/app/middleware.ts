import { userService } from "./services/UserService";
import { authService } from "./services/AuthService";
import { postService } from "./services/PostService";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import { storyService } from "./services/StoryService";
import {friendService} from "./services/FriendService";

export const middleware = [
    ...getDefaultMiddleware(),
    userService.middleware,
    authService.middleware,
    postService.middleware,
    storyService.middleware,
    friendService.middleware
];
