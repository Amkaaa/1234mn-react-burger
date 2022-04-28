import {
    SIGNUP_USER_START,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_ERROR,
    LOGIN_USER_START,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    LOGOUT_USER
} from '../type'

const initialState = {
    loadSignup: false,
    loadLogin: false,
    error: null,
    token: null,
    userId: null,
}

const signupLoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNUP_USER_START:
            return {
                ...state,
                loadSignup: true,
            }
        case SIGNUP_USER_SUCCESS:
            return {
                ...state,
                loadSignup: false,
                userId: action.userId,
                token: action.token,
                error: null,
            }
        case SIGNUP_USER_ERROR:
            return {
                ...state,
                loadSignup: false,
                error: action.err.response.data.error.message
            }
        case LOGIN_USER_START:
            return {
                ...state,
                loadLogin: true,
            }
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                loadLogin: false,
                userId: action.userId,
                token: action.token,
                error: null,
            }
        case LOGIN_USER_ERROR:
            return {
                ...state,
                loadLogin: false,
                error: action.err.response.data.error.message
            }
        case LOGOUT_USER:
            return {
                ...state,
                userId: null,
                token: null, 
                error: null,
            }
        default:
            return state
    }
}

export default signupLoginReducer;