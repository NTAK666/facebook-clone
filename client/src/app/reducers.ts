import chatBoxSlice from "./features/ChatBoxSlice";
import {userService} from "./services/UserService";
import userSlice from "./features/UserSlice";
import {postService} from "./services/PostService";

export const reducers = {
    chatBoxSlice,
    userSlice,
    [userService.reducerPath]: userService.reducer,
    [postService.reducerPath]: postService.reducer,
};
