import { createSlice } from "@reduxjs/toolkit";
import { PLATFORM_SETTINGS } from "../../../data/settings";

const journeySlice = createSlice({
    name: "journey",
    initialState: {
        current_point: {},
        destination_point: {},
        search_assists: false,
        search_assists_highlight: -1,
        distance: 0,
        shuttle: PLATFORM_SETTINGS.shuttles[0],
        locations: [
            PLATFORM_SETTINGS.user_location_template,
            PLATFORM_SETTINGS.destination_template],
    },
    reducers: {
        setDestination: (state, action) => {
            state.destination_point = action.payload;
        },
        setSearchAssist: (state, action) => {
            state.search_assists = action.payload;
        },
        setSearchHighlight: (state, action) => {
            state.search_assists_highlight = action.payload;
        },
        setCurrent: (state, action) => {
            state.current_point = action.payload;
        },
        setLocations: (state, action) => {
            state.locations[action.payload.index] = action.payload.value;
        },
        setDistance: (state, action) => {
            if (action.payload > 0)
                state.distance = action.payload
        },
        setShuttle: (state, action) => {
            if (action.payload !== null)
                state.shuttle = action.payload
        }
    }
});

export default journeySlice;