import chatBoxSlice from "./features/ChatBoxSlice";
import userSlice from "./features/UserSlice";
import {postService} from "./services/PostService";
import {userService} from "./services/UserService";
import {authService} from "./services/AuthService";

export const reducers = {
    chatBoxSlice,
    userSlice,
    [userService.reducerPath]: userService.reducer,
    [postService.reducerPath]: postService.reducer,
    [authService.reducerPath]: authService.reducer
};
