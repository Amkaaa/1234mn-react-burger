import { Component } from 'react'
import { connect } from 'react-redux'

import Button from '../Utils/Button'
import style from './style.module.css'
import axios from '../../axios-order'
import { withRouter } from '../../with-router'
import Spinner from '../Utils/Spinner'

class ContactData extends Component {
    state = {
        name: null,
        city: null,
        street: null,
        loading: false,
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

    saveOrder = () => {
        
        const order = {
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

        this.setState({ loading: true })

        axios
            .post('/orders.json', {
                order
            })
            .then( res => {
                console.log('Статус код: ' + res.status + '\n Амжилттай захиалагдлаа')
            })
            .finally(() => {
                this.setState({ loading: false })
                this.props.navigate('/orders', { replace: true })

            })
    }

    render() {
        return <div className={style.contactData}>
            <input onChange={this.changeName} type="text" name="name" placeholder="Таны нэр" />
            <input onChange={this.changeStreet} type="text" name="street" placeholder="Таны гэрийн хаяг" />
            <input onChange={this.changeCity} type="text" name="city" placeholder="Таны хот" />
            {
                this.state.loading ? <Spinner /> : <Button triggerBtn={this.saveOrder} type="success" text="ИЛГЭЭХ" />
            }
        </div>
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
    }
}

export default connect(mapStateToProps, null)(withRouter(ContactData))