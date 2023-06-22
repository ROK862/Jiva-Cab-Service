import { createSlice } from '@reduxjs/toolkit';
import { PLATFORM_SETTINGS } from '../../../data/settings';

const initialState = {
    data: {
        shuttles: PLATFORM_SETTINGS.shuttles,
        new_orders: []
    },
    loading: false,
    error: null,
};

export const apiSlice = createSlice({
    name: 'api',
    initialState,
    reducers: {
        fetchDataStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchShuttleDataSuccess(state, action) {
            state.data.shuttles = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchSuccess(state, action) {
            state.loading = false;
            state.error = null;
        },
        fetchOrderDataSuccess(state, action) {
            state.data.new_orders = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchDataFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchDataStart, fetchShuttleDataSuccess, fetchDataFailure } = apiSlice.actions;

export default apiSlice;
