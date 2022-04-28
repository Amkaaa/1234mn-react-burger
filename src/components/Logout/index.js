import { Component } from 'react'
import { Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions/loginActions'

class Logout extends Component {
    componentDidMount() {
        this.props.logout()
    }
    render() {
        return <Navigate to="/" replace />
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(actions.logoutUser())
    }
}

export default connect(null, mapDispatchToProps)(Logout)