import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false
        },
        register: {
            isFetching: false,
            error: false,
            success: false
        },
        logout: {
            isFetching: false,
            error: false,
            success: false
        }
    },
    reducers: {
        loginStart(state) {
            state.login.isFetching = true
        },
        loginSuccess(state, action) {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
            state.register.success = false;
        },
        loginFail(state) {
            state.register.success = false;
            state.login.isFetching = false;
            state.login.error = true;
        },
        registerStart(state) {
            state.register.isFetching = true;
        },
        registerSuccess(state) {
            state.register.isFetching = false;
            state.register.error = false;
            state.register.success = true;
        },
        registerFail(state) {
            state.register.isFetching = false;
            state.register.error = true;
            state.register.success = false;
        },
        logoutStart(state) {
            state.logout.isFetching = true;
        },
        logoutSuccess(state) {
            state.logout.isFetching = false;
            state.logout.error = false;
            state.logout.success = true;
            state.login.currentUser = null;
        },
        logoutFail(state) {
            state.logout.error = true;
            state.logout.isFetching = false;
            state.logout.success = false;
        }
    }
})

export default authSlice.reducer;
export const {
    loginStart,
    loginFail,
    loginSuccess,
    registerStart,
    registerSuccess,
    registerFail,
    logoutStart,
    logoutFail,
    logoutSuccess
} = authSlice.actions