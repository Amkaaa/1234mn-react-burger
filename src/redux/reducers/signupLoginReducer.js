import {
    SIGNUP_LOGIN_USER_START,
    SIGNUP_LOGIN_USER_SUCCESS,
    SIGNUP_LOGIN_USER_ERROR,
    LOGOUT_USER
} from '../type'

const initialState = {
    loading: false,
    error: null,
    token: null,
    userId: null,
}

const signupLoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNUP_LOGIN_USER_START:
            return {
                ...state,
                loading: true,
            }
        case SIGNUP_LOGIN_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                userId: action.userId,
                token: action.token,
                error: null,
            }
        case SIGNUP_LOGIN_USER_ERROR:
            return {
                ...state,
                loading: false,
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