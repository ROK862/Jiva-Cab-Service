import { createSlice } from "@reduxjs/toolkit";

const utilSlice = createSlice({
    name: "util",
    initialState: {
        global_trigger: 0,
    },
    reducers: {
        triggerGlobalChange: (state) => {
            state.global_trigger++;
        },
    }
});

export default utilSlice;