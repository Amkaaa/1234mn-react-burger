import { useState } from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Button from '../Utils/Button'
import Spinner from '../Utils/Spinner'
import style from './style.module.css'
import { signupUser } from '../../redux/actions/signupLoginActions'

const Signup = ({ loading, firebaseError, userId, signupUser}) => {
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [error, setError] = useState("")

    const changeEmail = (e) => {
        setEmail(e.target.value)
    }

    const changePassword1 = (e) => {
        setPassword1(e.target.value)
    }

    const changePassword2 = (e) => {
        setPassword2(e.target.value)
    }

    const signup = (e) => {
        e.preventDefault()
        if(password1 === password2) {
            signupUser(email, password1)
        } else {
            setError("Нууц үг таарсангүй")
        }
    }

    return (
        <div className={style.signup}>
            {userId && <Navigate to="/orders" replace /> }
            <h1>Бүртгэлийн форм</h1>
            <div>Та өөрийн мэдээллээ оруулна уу</div>
            {
                loading ? <Spinner /> : (<form>
                    <input onChange={changeEmail} type="text" autoComplete='' placeholder="Имэйл хаяг" />
                    <input onChange={changePassword1} type="password" autoComplete='' placeholder="Нууц үг" />
                    <input onChange={changePassword2} type="password" autoComplete='' placeholder="Нууц үгээ давтах" />
                    {
                        error && (
                            <div className={style.error}>{error}</div>
                        )
                    }
                    {
                        firebaseError && (
                            <div className={style.error}>{firebaseError}</div>
                        )
                    }
                    <Button type="success" text="Бүртгүүлэх" triggerBtn={signup} />
                </form>)
            }
        </div>
    )
        }

const mapStateToProps = (state) => {
    return {
        loading: state.signupLoginReducer.loading,
        firebaseError: state.signupLoginReducer.error,
        userId: state.signupLoginReducer.userId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signupUser: (email, password) => dispatch(signupUser(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)