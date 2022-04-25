import { Component } from 'react'
import { Route, Routes } from 'react-router-dom'
import { connect } from 'react-redux'

import Burger from '../../components/Burger'
import ContactData from '../../components/ContactData'
import Button from '../../components/Utils/Button'
import { withRouter } from '../../with-router'
import style from './style.module.css'

class ShippingPage extends Component {

    // componentDidMount() {
    //     const query = new URLSearchParams(window.location.search)
    //     let totalPrice =  0;

    //     const newIngredients = {
    //         salad: {
    //             name: 'Салад',
    //             type: 'salad',
    //             price: 400,
    //             count: 0,
    //         },
    //         cheese: {
    //             name: 'Бяслаг',
    //             type: 'cheese',
    //             price: 500,
    //             count: 0,
    //         },
    //         bacon: {
    //             name: 'Бекон',
    //             type: 'bacon',
    //             price: 1000,
    //             count: 0,
    //         },
    //         meat: {
    //             name: 'Үхрийн мах',
    //             type: 'meat',
    //             price: 1200,
    //             count: 0,
    //         },
    //     }
        
    //     for(let param of query.entries()) {
    //         if(param[0] !== 'total') newIngredients[param[0]].count = param[1]
    //         else totalPrice = param[1]
    //     }

    //     this.setState({ ingredients: newIngredients, totalPrice })
    // }

    goBack = () => {
        this.props.navigate(-1);
    }

    showContactData = () => {
        this.props.navigate('/shipping/contact', { replace: true });
    }

    render() {
        return (
            <div className={style.shippingPage}>
                <p>
                    <strong>Таны захиалга хүргэгдэхэд хэдхэн алхам үлдлээ...</strong>
                </p>
                <p>
                    <strong>Нийт дүн: {this.props.totalPrice}₮</strong>
                </p>
                <Burger />
                <Button triggerBtn={this.goBack} type="danger" text="ЗАХИАЛГА ЦУЦЛАХ" />
                <Button triggerBtn={this.showContactData} type="success" text="ХҮРГЭЛТИЙН МЭДЭЭЛЭЛ ОРУУЛАХ" />
                <Routes>
                    <Route path="contact" element={ <ContactData /> } />
                </Routes>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        totalPrice: state.totalPrice,
    }
}

export default connect(mapStateToProps, null)(withRouter(ShippingPage))