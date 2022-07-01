import chatBoxSlice from "./features/ChatBoxSlice";
import userSlice from "./features/UserSlice";
import {postService} from "./services/PostService";
import {userService} from "./services/UserService";
import {authService} from "./services/AuthService";
import authSlice from "./features/AuthSlice";
import postSlice from "./features/PostSlice";


export const reducers = {
    chatBoxSlice,
    userSlice,
    authSlice,
    postSlice,
    [userService.reducerPath]: userService.reducer,
    [postService.reducerPath]: postService.reducer,
    [authService.reducerPath]: authService.reducer
};
