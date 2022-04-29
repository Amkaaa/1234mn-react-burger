import { useEffect, useContext } from 'react'
import { Navigate } from 'react-router-dom'

import SignupLoginContext from '../../context/SignupLoginContext'

const Logout = () => {
    const { logoutUser } = useContext(SignupLoginContext)

    useEffect(()=> {
        logoutUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    return <Navigate to="/" replace />
}

export default Logout