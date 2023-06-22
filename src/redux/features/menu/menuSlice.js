import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
    name: "menu",
    initialState: {
        activate_side_bar: false,
        menu_features: [],
    },
    reducers: {
        toggleSideBar: (state, action) => {
            state.activate_side_bar = action.payload;
        }
    }
});

export default menuSlice;