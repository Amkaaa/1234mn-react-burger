import { useState } from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { loginUser } from '../../redux/actions/signupLoginActions'
import Button from '../Utils/Button'
import Spinner from '../Utils/Spinner'
import style from './style.module.css'

const Login = ({ loading, error, userId, loginUser }) => {
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

const mapStateToProps = state => {
    return {
        loading: state.signupLoginReducer.loading,
        error: state.signupLoginReducer.error,
        userId: state.signupLoginReducer.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loginUser: (email, password) => dispatch(loginUser(email, password)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)