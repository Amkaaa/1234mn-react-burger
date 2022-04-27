import { Component } from 'react'
import { connect } from 'react-redux'

import Button from '../Utils/Button'
import style from './style.module.css'
import { withRouter } from '../../with-router'
import Spinner from '../Utils/Spinner'
import * as actions from '../../redux/actions/orderActions'
import * as burgerActions from '../../redux/actions/burgerActions'

class ContactData extends Component {
    state = {
        name: null,
        city: null,
        street: null,
    }

    changeName = (e) => {
        this.setState({ name: e.target.value })
    }

    changeCity = (e) => {
        this.setState({ city: e.target.value })
    }

    changeStreet = (e) => {
        this.setState({ street: e.target.value })
    }

    componentDidUpdate() {
        if(this.props.newOrderStatus.finished && !this.props.newOrderStatus.error) {
            this.props.navigate('/orders', { replace: true })
        }
    }

    saveOrder = () => {
        
        const order = {
            userId: this.props.userId,
            ingredients: this.props.ingredients,
            totalPrice: this.props.totalPrice,
            customer: {
                name: this.state.name,
                address: {
                    street: this.state.street,
                    city: this.state.city
                }
            }
        }
        
        this.props.saveOrder(order);
    }

    render() {
        return <div className={style.contactData}>
            <input onChange={this.changeName} type="text" name="name" placeholder="Таны нэр" />
            <input onChange={this.changeStreet} type="text" name="street" placeholder="Таны гэрийн хаяг" />
            <input onChange={this.changeCity} type="text" name="city" placeholder="Таны хот" />
            {
                this.props.newOrderStatus.saving ? <Spinner /> : <Button triggerBtn={this.saveOrder} type="success" text="ИЛГЭЭХ" />
            }
        </div>
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerReducer.ingredients,
        totalPrice: state.burgerReducer.totalPrice,
        newOrderStatus: state.orderReducer.newOrder,
        userId: state.signupLoginReducer.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveOrder: (order) => dispatch(actions.saveOrder(order)),
        clearOrder: () => dispatch(burgerActions.clearOrder())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ContactData))