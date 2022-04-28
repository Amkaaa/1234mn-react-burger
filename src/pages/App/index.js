import { Component } from 'react'
import { connect } from 'react-redux'
import { Routes, Route } from 'react-router-dom';
import styles from './style.module.css';
import Toolbar from '../../components/Toolbar'
import Sidebar from '../../components/Sidebar';
import OrderPage from '../OrderPage';
import BurgerPage from '../BurgerPage';
import ShippingPage from '../ShippingPage';
import Login from '../../components/Login';
import Logout from '../../components/Logout';
import Signup from '../../components/Signup';
import PrivateRoute from '../../components/PrivateRoute';
import NotFoundPage from '../NotFoundPage';
import * as actions from '../../redux/actions/loginActions';

class App extends Component {
  state = {
    showSidebar : false
  }

  componentDidMount() {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const expireDate = new Date(localStorage.getItem('expireDate'))
    // const refreshToken = localStorage.getItem('refreshToken')
    if(token) {
      if(expireDate > new Date()) {
        this.props.autoLogin(token, userId) 
        this.props.autoLogoutUser(expireDate.getTime() - new Date().getTime()) 
      } else {
        this.props.logoutUser()
      }
    }
  }

  toggleSidebar = () => {
    this.setState( prevState => {
      return {
        showSidebar : !prevState.showSidebar
      }
    })
  }
  
  render() {

    return (
      <div className="App">
          <Toolbar toggleSidebar={this.toggleSidebar}  />
          <Sidebar toggleSidebar={this.toggleSidebar} showSidebar={this.state.showSidebar} />
          <main className={styles.content}>
            <Routes>
              <Route index element={
                <PrivateRoute user={this.props.userId}>
                  <BurgerPage />
                </PrivateRoute>
              } />
              
              <Route path="logout" element={ 
                <PrivateRoute user={this.props.userId}>
                  <Logout />
                </PrivateRoute> 
              } />
              
              <Route path="orders" element={ 
                <PrivateRoute user={this.props.userId}>
                  <OrderPage />
                </PrivateRoute>
               } />
              
              <Route path="shipping/*" element={ 
                <PrivateRoute user={this.props.userId}>
                  <ShippingPage />
                </PrivateRoute>
              } />

              <Route path="*" element={ 
                <PrivateRoute user={this.props.userId}>
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
}

const mapStateToProps = state => {
  return {
    userId: state.signupLoginReducer.userId,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    autoLogin: (token, userId) => dispatch(actions.loginUserSuccess(token, userId)),
    logoutUser: () => dispatch(actions.logoutUser()),
    autoLogoutUser: expiresIn => dispatch(actions.autoLogoutAfterMillisec(expiresIn * 1000))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
