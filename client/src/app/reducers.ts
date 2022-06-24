import chatBoxSlice from "./features/ChatBoxSlice";
import {userService} from "./services/UserService";
import userSlice from "./features/UserSlice";

export const reducers = {
    chatBoxSlice,
    userSlice,
    [userService.reducerPath]: userService.reducer
};
