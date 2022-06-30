import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUserFull} from "../models/User";

export type IChatBox = {
    user: IUserFull,
    status: "SHOW" | "HIDE"
}

interface IState {
    chatbox: IChatBox[]
}

const initialState: IState = {
    chatbox: []
};

const formatChatBox = (list: IChatBox[]): IChatBox[] => {
    return list.map((item, index) => {
        if (index < 2) {
            return {
                ...item,
                status: 'SHOW'
            }
        } else {
            return {...item, status: 'HIDE'}
        }
    })
}

const chatBoxSlice = createSlice({
    name: "chatSlice",
    initialState,
    reducers: {
        createChatBox: (state, {payload}: PayloadAction<IUserFull>) => {
            let list: IChatBox[] = [...state.chatbox];
            const index = list.findIndex(item => item.user.id === payload.id);
            if (index !== -1) {
                return;
            }

            let object: IChatBox = {
                user: payload,
                status: "SHOW"
            }
            list = [object, ...list];

            if (list.filter(item => item.status === "SHOW").length > 2) {
                list = formatChatBox(list)
            }

            state.chatbox = [...list];
        },
        closeChatBox: (state, {payload}: PayloadAction<IUserFull>) => {
            state.chatbox = state.chatbox.filter(item => item.user.id !== payload.id);
        },
        openChatBox: (state, {payload}: PayloadAction<IUserFull>) => {
            let list: IChatBox[] = [...state.chatbox];
            const index = list.findIndex(item => item.user.id === payload.id);

            if (index <= -1) return;

            let object: IChatBox = {
                user: list[index].user,
                status: "SHOW"
            }

            list.splice(index, 1);

            list = [object, ...list];

            if (list.filter(item => item.status === "SHOW").length > 2) {
                list = formatChatBox(list)
            }

            state.chatbox = [...list];
        },
        minimizeChatBox: (state, {payload}: PayloadAction<IUserFull>) => {
            let list: IChatBox[] = [...state.chatbox];
            const index = list.findIndex(item => item.user.id === payload.id);

            const object: IChatBox = {
                user: list[index].user,
                status: "HIDE"
            }
            list.splice(index, 1);

            state.chatbox = [...list, object];
        },
        removeAllHiddenBox: (state) => {
            state.chatbox = [];

        }

    },
    extraReducers: {}
});

export const {createChatBox, closeChatBox, openChatBox, minimizeChatBox, removeAllHiddenBox} = chatBoxSlice.actions;

export default chatBoxSlice.reducer;