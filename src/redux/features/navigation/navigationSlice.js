import { createSlice } from "@reduxjs/toolkit";
import { NAVIGATION_KEYS } from "../../../data/settings";

const navigationSlice = createSlice({
    name: "menu",
    initialState: {
        page: NAVIGATION_KEYS.booking,
        order_page: NAVIGATION_KEYS.booking,
    },
    reducers: {
        goToPage: (state, action) => {
            state.page = action.payload;
        },
        goToOrderPage: (state, action) => {
            state.order_page = action.payload;
        }
    }
});

export default navigationSlice;