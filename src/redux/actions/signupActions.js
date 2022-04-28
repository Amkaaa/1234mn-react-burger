import {
    SIGNUP_USER_START,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_ERROR,
} from '../type'

import axios from 'axios'

export const signupUser = (email, password) => {
    return function (dispatch) {
        const user = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        dispatch(signupUserStart());
        axios
            .post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB2osRfx5yYdpG8o4ynUrfQbbdESb1AXYM', user)
            .then(res => {
                const token = res.data.idToken
                const userId = res.data.localId

                localStorage.setItem('token', token)
                localStorage.setItem('userId', userId)

                dispatch(signupUserSuccess(token, userId))
            })
            .catch(err => {
                dispatch(signupUserError(err))
            })
    }
}

export const signupUserStart = () => {
    return  {
        type: SIGNUP_USER_START
    }
}

export const signupUserSuccess = (token, userId) => {
    return  {
        type: SIGNUP_USER_SUCCESS,
        token,
        userId
    }
}

export const signupUserError = (err) => {
    return {
        type: SIGNUP_USER_ERROR,
        err
    }
}