import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser, IUserFull} from "../models/User";
import {userService} from "../services/UserService";
import {Response} from "../models/Response";

interface IState {
    user: IUserFull,
    friends: IUser[]
}

const initialState: IState = {
    user: {
        id: "",
        title: "",
        firstName: "",
        lastName: "",
        gender: "",
        email: "",
        phone: "",
        picture: "",
    },
    friends: []
};

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            userService.endpoints.getMe.matchFulfilled,
            (state, {payload}: PayloadAction<IUserFull>) => {
                state.user = payload;
            }
        );
        builder.addMatcher(
            userService.endpoints.getFriends.matchFulfilled,
            (state, {payload}: PayloadAction<Response<IUser[]>>) => {
                state.friends = payload.data;
            }
        )
    }
});

export default userSlice.reducer;