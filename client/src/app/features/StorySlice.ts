import {IStoryFull} from "../models/Story";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {storyService} from "../services/StoryService";
import {Response} from "../models/Response";

interface IState {
    storiesMe: IStoryFull[];
    storyNext: string;
    storyPrevious: string;
}

const initialState: IState = {
    storiesMe: [],
    storyNext: "",
    storyPrevious: "",
};

const storySlice = createSlice({
    name: "storySlice",
    initialState,
    reducers: {
        setStoryCurrent: (state, action: PayloadAction<number>) => {
            let index = state.storiesMe.findIndex(story => story.id === action.payload);
            if (index === -1) return;

            const nextItem = index + 1 < state.storiesMe.length ? state.storiesMe[index + 1] : null;
            const prevItem = index - 1 >= 0 ? state.storiesMe[index - 1] : null;

            state.storyNext = nextItem ? `${nextItem.slug}-${nextItem.id}` : "";
            state.storyPrevious = prevItem ? `${prevItem.slug}-${prevItem.id}` : "";
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            storyService.endpoints.getStoriesByMe.matchFulfilled,
            (state: IState, {payload}: PayloadAction<Response<IStoryFull[]>>) => {
                state.storiesMe = payload.data;
            }
        );
    },
});

export const {setStoryCurrent} = storySlice.actions;

export default storySlice.reducer;
