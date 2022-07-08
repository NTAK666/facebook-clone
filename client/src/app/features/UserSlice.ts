import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Response} from "../models/Response";
import {IUserFull} from "../models/User";
import { userService } from "../services/UserService";
import {USER_DEFAULT} from "./AuthSlice";

interface IState {
    userCurrent: IUserFull;
}

const initialState: IState = {
    userCurrent: USER_DEFAULT,
};
const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            userService.endpoints.getUserById.matchFulfilled,
            (state, action: PayloadAction<Response<IUserFull>>) => {
                if (action.payload.data) {
                    state.userCurrent = action.payload.data;
                }
            }
        );
    }
});

export default userSlice.reducer;