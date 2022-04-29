import { useState, useEffect, Suspense, lazy, useContext } from 'react'
import { Routes, Route } from 'react-router-dom';

import { BurgerStore } from '../../context/BurgerContext'
import { OrderStore } from '../../context/OrderContext'
import SignupLoginContext from '../../context/SignupLoginContext';

import styles from './style.module.css';
import Toolbar from '../../components/Toolbar'
import Sidebar from '../../components/Sidebar';
import ShippingPage from '../ShippingPage';
import Login from '../../components/Login';
import Logout from '../../components/Logout';
import PrivateRoute from '../../components/PrivateRoute';
import NotFoundPage from '../NotFoundPage';

const BurgerPage = lazy(() => {
  return import('../BurgerPage')
})

const OrderPage = lazy(() => {
  return import('../OrderPage')
})

const Signup = lazy(() => {
  return import('../../components/Signup')
})

const App = () => {
  const { user: { userId }, autoLogin, autoRenewUser, logoutUser } = useContext(SignupLoginContext)

  const [showSidebar, setShowSidebar] = useState(false);
  
  // useEffect нь дандаа Render-ийн дараа дуудагддаг.
  useEffect(()=> {
    const user = localStorage.getItem('userId')
    const token = localStorage.getItem('token')
    const expireDate = new Date(localStorage.getItem('expireDate'))
    if(token) {
      if(expireDate > new Date()) {
        autoLogin(token, user) 
        autoRenewUser(expireDate.getTime() - new Date().getTime()) 
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
          <BurgerStore>
            <Suspense fallback={<div>Түр хүлээ...</div>}>
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
                  <OrderStore>
                    <PrivateRoute user={userId}>
                      <OrderPage />
                    </PrivateRoute>
                  </OrderStore>
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
            </Suspense>
          </BurgerStore>
        </main>
    </div>
  );
}

export default App;
