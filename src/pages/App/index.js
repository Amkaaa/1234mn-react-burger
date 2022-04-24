import { Component } from 'react'
import { Routes, Route } from 'react-router-dom';
import styles from './style.module.css';
import Toolbar from '../../components/Toolbar'
import Sidebar from '../../components/Sidebar';
import OrderPage from '../OrderPage';
import BurgerPage from '../BurgerPage';
import ShippingPage from '../ShippingPage';

class App extends Component {
  state = {
    showSidebar : false
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
              <Route index element={ <BurgerPage /> } />
              <Route path="orders" element={ <OrderPage /> } />
              <Route path="shipping/*" element={ <ShippingPage /> } />
            </Routes>
          </main>
      </div>
    );
  }
}

export default App;
