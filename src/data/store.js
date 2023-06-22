import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../redux/features/counter/counterSlice";
import menuSlice from "../redux/features/menu/menuSlice";
import journeySlice from "../redux/features/journey/journeySlice";
import navigationSlice from "../redux/features/navigation/navigationSlice";
import utilSlice from "../redux/features/util/utilSlice";
import apiSlice from "../redux/features/api/apiSlice";
import thunk from 'redux-thunk';

const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        menu: menuSlice.reducer,
        journey: journeySlice.reducer,
        navigator: navigationSlice.reducer,
        util: utilSlice.reducer,
        api: apiSlice.reducer,
    },
    middleware: [thunk],
});

export default store;