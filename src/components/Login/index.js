import { Component } from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import * as actions from '../../redux/actions/loginActions'
import Button from '../Utils/Button'
import Spinner from '../Utils/Spinner'
import style from './style.module.css'

class Login extends Component {
    state = {
        email: "",
        password: "",
    }

    changeEmail = (e) => {
        this.setState({email: e.target.value})
    }

    changePassword = (e) => {
        this.setState({password: e.target.value})
    }

    login = (e) => {
        e.preventDefault()
        this.props.loginUser(this.state.email, this.state.password)
    }

    render() {
        return (
            <div className={style.login}>
                {this.props.userId && <Navigate to="/" /> }
                <h1>Нэвтрэх</h1>
                {
                    this.props.loading ? <Spinner /> : (<form>
                        <input onChange={this.changeEmail} autoComplete=''  type="text" placeholder="Нэвтрэх нэр" />
                        <input onChange={this.changePassword} autoComplete=''  type="password" placeholder="Нууц үг" />
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
                        <Button type="success" text="Нэвтрэх" triggerBtn={this.login} />
                    </form>)
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.signupLoginReducer.loadLogin,
        error: state.signupLoginReducer.error,
        userId: state.signupLoginReducer.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loginUser: (email, password) => dispatch(actions.loginUser(email, password)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)