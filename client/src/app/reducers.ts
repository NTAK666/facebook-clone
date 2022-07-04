import chatBoxSlice from "./features/ChatBoxSlice";
import userSlice from "./features/UserSlice";
import authSlice from "./features/AuthSlice";
import postSlice from "./features/PostSlice";
import storySlice from "./features/StorySlice";
import { userService } from "./services/UserService";
import { authService } from "./services/AuthService";
import { postService } from "./services/PostService";
import { storyService } from "./services/StoryService";

export const reducers = {
    chatBoxSlice,
    userSlice,
    authSlice,
    postSlice,
    storySlice,
    [userService.reducerPath]: userService.reducer,
    [authService.reducerPath]: authService.reducer,
    [postService.reducerPath]: postService.reducer,
    [storyService.reducerPath]: storyService.reducer,
};
