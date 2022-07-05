import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserFull } from "../models/User";
import { authService } from "../services/AuthService";
import { Response } from "../models/Response";

interface IState {
    user: IUserFull;
    isLoggedIn: boolean;
}

export const USER_DEFAULT = {
    id: 0,
    email: "",
    userInfo: {
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
        avatar: "",
        coverImage: "",
        about: "",
        bio: "",
        slug: "",
        birthday: "",
        gender: false,
    },
};

const initialState: IState = {
    user: USER_DEFAULT,
    isLoggedIn: false,
};

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        onLogout: (state: IState) => {
            localStorage.removeItem("auth");
            state.isLoggedIn = false;
            state.user = USER_DEFAULT;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            authService.endpoints.getMe.matchFulfilled,
            (state, action: PayloadAction<Response<IUserFull>>) => {
                state.user = action.payload.data;
                if (state.user) {
                    state.isLoggedIn = true;
                }
            }
        );
    },
});

export const { onLogout } = authSlice.actions;

export default authSlice.reducer;
