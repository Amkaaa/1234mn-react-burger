import { useState, useContext } from 'react'
import { Navigate } from 'react-router-dom'

import SignupLoginContext from '../../context/SignupLoginContext'
import Button from '../Utils/Button'
import Spinner from '../Utils/Spinner'
import style from './style.module.css'

const Login = () => {
    const { user: { loading, error, userId }, loginUser } = useContext(SignupLoginContext);

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const changeEmail = (e) => {
        const newEmail = e.target.value
        setForm(( prevForm )=>({
            ...prevForm,
            email: newEmail
        }))
    }

    const changePassword = (e) => {
        const newPassword = e.target.value
        setForm(( prevForm )=>({
            ...prevForm,
            password: newPassword
        }))
    }

    const loginForm = (e) => {
        e.preventDefault()
        loginUser(form.email, form.password)
    }

    return (
        <div className={style.login}>
            {userId && <Navigate to="/" /> }
            <h1>Нэвтрэх</h1>
            {
                loading ? <Spinner /> : (<form>
                    <input onChange={changeEmail} autoComplete=""  type="text" placeholder="Нэвтрэх нэр" />
                    <input onChange={changePassword} autoComplete=""  type="password" placeholder="Нууц үг" />
                    {
                        error && (
                            <div className={style.error}>{error}</div>
                        )
                    }
                    {
                        error && (
                            <div className={style.error}>{error}</div>
                        )
                    }
                    <Button type="success" text="Нэвтрэх" triggerBtn={loginForm} />
                </form>)
            }
        </div>
    )
}

export default Login