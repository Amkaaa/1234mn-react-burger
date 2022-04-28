import axios from 'axios'
import {
    SIGNUP_LOGIN_USER_START,
    SIGNUP_LOGIN_USER_SUCCESS,
    SIGNUP_LOGIN_USER_ERROR,
    LOGOUT_USER,
} from '../type'

export const signupUser = (email, password) => {
    return function (dispatch) {
        const user = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        dispatch(signupLoginUserStart());
        axios
            .post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB2osRfx5yYdpG8o4ynUrfQbbdESb1AXYM', user)
            .then(res => {
                const token = res.data.idToken
                const userId = res.data.localId
                const expiresIn = res.data.expiresIn
                const expireDate = new Date(new Date().getTime() + expiresIn * 1000)
                const refreshToken = res.data.refreshToken

                localStorage.setItem('token', token)
                localStorage.setItem('userId', userId)
                localStorage.setItem('expireDate', expireDate)
                localStorage.setItem('refreshToken', refreshToken)

                dispatch(signupLoginUserSuccess(token, userId))
                dispatch(autoLogoutUser(expiresIn * 1000))
            })
            .catch(err => {
                dispatch(signupLoginUserError(err))
            })
    }
}

export const loginUser = (email, password) => {
    return function (dispatch) {
        const user = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        dispatch(signupLoginUserStart());
        axios
            .post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB2osRfx5yYdpG8o4ynUrfQbbdESb1AXYM', user)
            .then(res => {
                const token = res.data.idToken
                const userId = res.data.localId
                const expiresIn = res.data.expiresIn
                const expireDate = new Date(new Date().getTime() + expiresIn * 1000)
                const refreshToken = res.data.refreshToken

                localStorage.setItem('token', token)
                localStorage.setItem('userId', userId)
                localStorage.setItem('expireDate', expireDate)
                localStorage.setItem('refreshToken', refreshToken)

                dispatch(signupLoginUserSuccess(token, userId))
                dispatch(autoLogoutUser(expiresIn * 1000))
            })
            .catch(err => {
                dispatch(signupLoginUserError(err))
            })
    }
}

export const signupLoginUserStart = () => {
    return  {
        type: SIGNUP_LOGIN_USER_START
    }
}

export const signupLoginUserSuccess = (token, userId) => {
    return  {
        type: SIGNUP_LOGIN_USER_SUCCESS,
        token,
        userId
    }
}

export const signupLoginUserError = (err) => {
    return {
        type: SIGNUP_LOGIN_USER_ERROR,
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

export const autoLogoutUser = ms => {
    return function(dispatch) {
        // refresh token bichij bolno
        // console.log('Auto logout ms:', ms)
        // token shinechleh code
            // axios
            //   .post(
            //     "https://securetoken.googleapis.com/v1/token?key=AIzaSyCEmDZW6k2XJlQritKoYeJG14ExYa1rRSM",
            //     {d
            //       grant_type: "refresh_token",
            //       refresh_token: localStorage.get("refresh_token")
            //     }
            //   )
            //   .then(result => {
            //     const token = result.data.id_token;
            //     const userId = result.data.user_id;
            //     const token = result.data.idToken;
            //     const userId = result.data.localId;
            //     const expiresIn = result.data.expiresIn;
            //     const expireDate = new Date(new Date().getTime() + expiresIn * 1000);
            //     const refreshToken = result.data.refreshToken;
            //     localStorage.setItem("token", token);
            //     localStorage.setItem("userId", userId);
            //     localStorage.setItem("expireDate", expireDate);
            //     localStorage.setItem("refreshToken", refreshToken);
            //     dispatch(loginUserSuccess(token, userId));
            //   })
            //   .catch(err => {
            //     dispatch(signupUserError(err));
            //   });

        setTimeout(() => {
            dispatch(logoutUser())
        }, ms)
    }
}