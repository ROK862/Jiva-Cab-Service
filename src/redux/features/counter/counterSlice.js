import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: "counter",
    initialState: {
        value: 0
    },
    reducers: {
        increment: (state, action) => {
            state.value += action.payload;
        },
        decrement: (state) => {
            state.value--;
        }
    }
});

export default counterSlice;