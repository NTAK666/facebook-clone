import {createSlice} from "@reduxjs/toolkit";

interface IState {
}

const initialState: IState = {};
const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
    }
});

export default userSlice.reducer;