import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Routes, Route } from 'react-router-dom';
import styles from './style.module.css';
import Toolbar from '../../components/Toolbar'
import Sidebar from '../../components/Sidebar';
import BurgerPage from '../BurgerPage';
import OrderPage from '../OrderPage';
import ShippingPage from '../ShippingPage';
import Login from '../../components/Login';
import Logout from '../../components/Logout';
import Signup from '../../components/Signup';
import PrivateRoute from '../../components/PrivateRoute';
import NotFoundPage from '../NotFoundPage';
import * as actions from '../../redux/actions/signupLoginActions';

const App = ({ userId, autoLogin, autoLogoutUser, logoutUser }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  
  // useEffect нь дандаа Render-ийн дараа дуудагддаг.
  useEffect(()=> {
    const user = localStorage.getItem('userId')
    const token = localStorage.getItem('token')
    const expireDate = new Date(localStorage.getItem('expireDate'))
    // const refreshToken = localStorage.getItem('refreshToken')
    if(token) {
      if(expireDate > new Date()) {
        autoLogin(token, user) 
        autoLogoutUser(expireDate.getTime() - new Date().getTime()) 
        // console.log('app dotor expire date', expireDate.getTime() - new Date().getTime())
      } else {
        logoutUser()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggleSidebar = () => {
    setShowSidebar( prevShowSidebar => !prevShowSidebar)
  }
  
  return (
    <div className="App">
        <Toolbar toggleSidebar={toggleSidebar}  />
        <Sidebar toggleSidebar={toggleSidebar} showSidebar={showSidebar} />
        <main className={styles.content}>
          <center><div>userId: {userId} </div></center>
          <Routes>
            <Route index element={
              <PrivateRoute user={userId}>
                <BurgerPage />
              </PrivateRoute>
            } />
            
            <Route path="logout" element={ 
              <PrivateRoute user={userId}>
                <Logout />
              </PrivateRoute> 
            } />
            
            <Route path="orders" element={ 
              <PrivateRoute user={userId}>
                <OrderPage />
              </PrivateRoute>
             } />
            
            <Route path="shipping/*" element={ 
              <PrivateRoute user={userId}>
                <ShippingPage />
              </PrivateRoute>
            } />

            <Route path="*" element={ 
              <PrivateRoute user={userId}>
                <NotFoundPage />
              </PrivateRoute>
            } />

            <Route path="login" element={ <Login /> } />
            <Route path="signup" element={ <Signup /> } />
          </Routes>
        </main>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    userId : state.signupLoginReducer.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    autoLogin: (token, userId) => dispatch(actions.signupLoginUserSuccess(token, userId)),
    logoutUser: () => dispatch(actions.logoutUser()),
    autoLogoutUser: expiresIn => dispatch(actions.autoLogoutUser(expiresIn))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
