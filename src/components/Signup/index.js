import { Component } from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import * as actions from '../../redux/actions/signupActions'
import Button from '../Utils/Button'
import Spinner from '../Utils/Spinner'
import style from './style.module.css'

class Signup extends Component {
    state = {
        email: "",
        password1: "",
        password2: "",
        error: "",
    }

    changeEmail = (e) => {
        this.setState({email: e.target.value})
    }

    changePassword1 = (e) => {
        this.setState({password1: e.target.value})
    }

    changePassword2 = (e) => {
        this.setState({password2: e.target.value})
    }

    signup = (e) => {
        e.preventDefault()
        if(this.state.password1 === this.state.password2) {
            this.props.signupUser(this.state.email, this.state.password1)
        } else {
            this.setState({error: "Нууц үг таарсангүй"})
        }
    }

    render() {
        return (
            <div className={style.signup}>
                {this.props.userId && <Navigate to="/orders" replace /> }
                <h1>Бүртгэлийн форм</h1>
                <div>Та өөрийн мэдээллээ оруулна уу</div>
                {
                    this.props.loading ? <Spinner /> : (<form>
                        <input onChange={this.changeEmail} type="text" autoComplete='' placeholder="Имэйл хаяг" />
                        <input onChange={this.changePassword1} type="password" autoComplete='' placeholder="Нууц үг" />
                        <input onChange={this.changePassword2} type="password" autoComplete='' placeholder="Нууц үгээ давтах" />
                        {
                            this.state.error && (
                                <div className={style.error}>{this.state.error}</div>
                            )
                        }
                        {
                            this.props.error && (
                                <div className={style.error}>{this.props.error}</div>
                            )
                        }
                        <Button type="success" text="Бүртгүүлэх" triggerBtn={this.signup} />
                    </form>)
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.signupLoginReducer.loadSignup,
        error: state.signupLoginReducer.error,
        userId: state.signupLoginReducer.userId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signupUser: (email, password) => dispatch(actions.signupUser(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)