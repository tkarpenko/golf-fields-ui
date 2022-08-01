import { createSlice } from "@reduxjs/toolkit";

export const TIMEOUT_TO_CLEAN_ALERTS_IN_SECONDS = 10;

const initialState = {
    msgs: [],
};

export const alertSlice = createSlice({
    name: 'alerts',
    initialState,
    reducers: {
        addAlert: function(state = initialState, action) {
            const alertMsg = action.payload;
            state.msgs.push(alertMsg);
        },
        hideAlerts: function(state) {
            state.msgs = [];
        },
    }
});

export const {addAlert, hideAlerts} = alertSlice.actions;

export const selectAlerts = (state) => state.alerts.msgs;

export const selectAlertsVisibility = (state) => state.alerts.isActive;

export default alertSlice.reducer;