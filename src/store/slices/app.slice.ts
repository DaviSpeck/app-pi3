import { createSlice } from "@reduxjs/toolkit";
import { appInitialState } from "../initialState/app";
import { clearRedux } from "../actions";

const appSlice = createSlice({
    name: 'app',
    initialState: appInitialState,
    reducers: {
        changeSpinner(state, action) {
            state.spinner = action.payload;
        },
    },
    extraReducers(builder) {
        builder.addCase(clearRedux, (state) => {
            state.spinner = appInitialState.spinner
        })
    },
});

export const { changeSpinner } = appSlice.actions;
export const appReducer = appSlice.reducer;