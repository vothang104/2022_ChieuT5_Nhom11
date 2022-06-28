import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { loginFail, loginStart, loginSuccess, logoutFail, logoutStart, logoutSuccess, registerFail, registerStart, registerSuccess } from './authSlice';

// user login
const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const resp = await axios.post(`${BASE_URL}/login`, user);
        if (resp.status === 200) {
            dispatch(loginSuccess(resp.data));
            navigate('/')
        }
    } catch (error) {
        dispatch(loginFail())
        console.log(error);
    }
}
// user register
const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        const resp = await axios.post(`${BASE_URL}/register`, user);
        if (resp && resp.status === 200) {
            dispatch(registerSuccess());
            navigate('/login');
        }
    } catch (error) {
        console.log(error);
        dispatch(registerFail());
    }
}
// user logout
const logoutUser = async (accessToken, navigate, dispatch) => {
    dispatch(logoutStart());
    try {
        const resp = await axios.post(`${BASE_URL}/logout`, {}, {
            headers: {
                token: `Bearer ${accessToken}`
            }
        });
        if (resp && resp.status === 200) {
            dispatch(logoutSuccess());
            navigate('/login')
        }
    } catch (error) {
        dispatch(logoutFail());
    }
}

export {
    loginUser,
    logoutUser,
    registerUser,
}