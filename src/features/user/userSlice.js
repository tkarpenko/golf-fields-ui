import {createSlice} from '@reduxjs/toolkit';
import {getLoggedUser, getApiToken, LOCAL_STORAGE_USER_DETAILS} from './userServices';


const initialState = {
    loggedUser: getLoggedUser(),
    apiToken: getApiToken()
}


// ====================== Redux Slice ===========================


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signin: function(state = initialState, action) {

            state.loggedUser = action.payload.phone;
            state.apiToken = action.payload.token;

            try {
                const data = JSON.stringify({
                    phone: action.payload.phone,
                    token: action.payload.token,
                });
                localStorage.setItem(LOCAL_STORAGE_USER_DETAILS, data);
            } catch (err) { }
        },

        signout: function(state = initialState) {

            try {
                localStorage.removeItem(LOCAL_STORAGE_USER_DETAILS);
            } catch (err) { }
        }
    }
});


export default userSlice.reducer;

export const {signin, signout} = userSlice.actions;

export const selectUser = (state) => state.user.loggedUser;

export const selectUserToken = (state) => state.user.apiToken;