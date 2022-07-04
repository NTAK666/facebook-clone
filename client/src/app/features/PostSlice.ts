import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPostFull} from "../models/Post";
import {Response} from "../models/Response";
import {postService} from "../services/PostService";

interface IState {
    posts: IPostFull[];
}

const initialState: IState = {
    posts: [],
};

const postSlice = createSlice({
    name: "postSlice",
    initialState,
    reducers: {
        appendPosts: (state: IState, {payload}: PayloadAction<IPostFull>) => {
            state.posts = [payload, ...state.posts];
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            postService.endpoints.getPostsByFriend.matchFulfilled,
            (state: IState, {payload}: PayloadAction<Response<IPostFull[]>>) => {
                state.posts = [...payload.data, ...state.posts];
            }
        );
        builder.addMatcher(
            postService.endpoints.getPostsByMe.matchFulfilled,
            (state: IState, {payload}: PayloadAction<Response<IPostFull[]>>) => {
                if (payload.data) {
                    state.posts = [...payload.data, ...state.posts];
                }
            }
        )
    },
});

export const {appendPosts} = postSlice.actions;

export default postSlice.reducer;
