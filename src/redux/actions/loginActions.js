import {
    LOGIN_USER_START,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    LOGOUT_USER,
} from '../type'

import axios from 'axios'

export const loginUser = (email, password) => {
    return function (dispatch) {
        const user = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        dispatch(loginUserStart());
        axios
            .post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB2osRfx5yYdpG8o4ynUrfQbbdESb1AXYM', user)
            .then(res => {
                // console.log(res.data);
                const token = res.data.idToken
                const userId = res.data.localId
                const expiresIn = res.data.expiresIn
                const expireDate = new Date(new Date().getTime() + expiresIn * 1000)
                const refreshToken = res.data.refreshToken

                localStorage.setItem('token', token)
                localStorage.setItem('userId', userId)
                localStorage.setItem('expireDate', expireDate)
                localStorage.setItem('refreshToken', refreshToken)

                dispatch(loginUserSuccess(token, userId))
                dispatch(autoLogoutAfterMillisec(expireDate * 1000))
            })
            .catch(err => {
                dispatch(loginUserError(err))
            })
    }
}

export const loginUserStart = () => {
    return  {
        type: LOGIN_USER_START
    }
}

export const loginUserSuccess = (token, userId) => {
    return  {
        type: LOGIN_USER_SUCCESS,
        token,
        userId
    }
}

export const loginUserError = (err) => {
    return {
        type: LOGIN_USER_ERROR,
        err
    }
}

export const logoutUser = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expireDate',)
    localStorage.removeItem('refreshToken')

    return {
        type: LOGOUT_USER
    }
}



export const autoLogoutAfterMillisec = ms => {
    return function(dispatch) {
        setTimeout(() => {
            dispatch(logoutUser())
        }, ms)
    }
}