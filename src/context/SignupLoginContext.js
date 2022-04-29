import { createContext, useState } from "react";
import axios from "../axios-order";

const SignupLoginContext = createContext();
const initialState = {
    loading: false,
    error: null,
    token: null,
    userId: null,
}

const API_KEY = 'AIzaSyB2osRfx5yYdpG8o4ynUrfQbbdESb1AXYM'

export const SignupLoginStore = props => {
    const [user, setUser] = useState(initialState)

    const signupUser = (email, password) => {
        const user = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        setUser(prevState => ({
            ...prevState,
            loading: true,
        }))

        axios
            .post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + API_KEY, user)
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

                setUser(prevState => ({
                    ...prevState,
                    loading: false,
                    userId,
                    token,
                    error: null,
                }))

                autoRenewUser(expiresIn * 1000)
            })
            .catch(err => {
                setUser(prevState => ({
                    ...prevState,
                    loading: false,
                    error: err.response.data.error.message
                }))
            })
    }

    const loginUser = (email, password) => {
        const user = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        setUser(prevState => ({
            ...prevState,
            loading: true,
        }))

        axios
            .post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + API_KEY, user)
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

                setUser(prevState => ({
                    ...prevState,
                    loading: false,
                    userId,
                    token,
                    error: null,
                }))

                autoRenewUser(expiresIn * 1000)
            })
            .catch(err => {
                setUser(prevState => ({
                    ...prevState,
                    loading: false,
                    error: err.response.data.error.message
                }))
            })
    }

    const autoLogin = (token, user) => {
        setUser(prevState => ({
            ...prevState,
            token,
            userId: user,
        }))
    }

    const autoRenewUser = (ms) => {
            axios
              .post(
                "https://securetoken.googleapis.com/v1/token?key=" + API_KEY,
                {
                  grant_type: "refresh_token",
                  refresh_token: localStorage.getItem("refreshToken")
                }
              )
              .then(result => {
                const token = result.data.id_token;
                const userId = result.data.user_id;
                const expiresIn = result.data.expires_in;
                const expireDate = new Date(new Date().getTime() + expiresIn * 1000);
                const refreshToken = result.data.refresh_token;
                localStorage.setItem("token", token);
                localStorage.setItem("userId", userId);
                localStorage.setItem("expireDate", expireDate);
                localStorage.setItem("refreshToken", refreshToken);
                setUser(prevState => ({
                    ...prevState,
                    loading: false,
                    userId,
                    token,
                    error: null,
                }))
              })
              .catch(err => {
                  console.log(err.message)
                setUser(prevState => ({
                    ...prevState,
                    loading: false,
                    error: err.response.data.error.message
                }))
              });

        setTimeout(() => {
            autoRenewUser(ms)
        }, ms)
    }

    const logoutUser = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        localStorage.removeItem('expireDate',)
        localStorage.removeItem('refreshToken')
        setUser(initialState)
    }

    return (
        <SignupLoginContext.Provider value={{
            user, 
            signupUser,
            loginUser,
            logoutUser,
            autoRenewUser,
            autoLogin
        }}>
            {props.children}
        </SignupLoginContext.Provider>
    )
}

export default SignupLoginContext