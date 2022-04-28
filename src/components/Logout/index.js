import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from '../../redux/actions/signupLoginActions'

const Logout = ({ logoutUser }) => {
    useEffect(()=> {
        logoutUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    return <Navigate to="/" replace />
}

const mapDispatchToProps = (dispatch) => {
    return {
        logoutUser: () => dispatch(logoutUser())
    }
}

export default connect(null, mapDispatchToProps)(Logout)