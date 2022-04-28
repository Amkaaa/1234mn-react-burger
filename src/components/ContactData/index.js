import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'

import style from './style.module.css'
import Button from '../Utils/Button'
import Spinner from '../Utils/Spinner'
import * as orderActions from '../../redux/actions/orderActions'
import * as burgerActions from '../../redux/actions/burgerActions'

const ContactData = ({ newOrderStatus, userId, ingredients, totalPrice, saveOrder, clearOrder, clearBurger }) => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");

    useEffect(()=> {
        if(newOrderStatus.finished && !newOrderStatus.error) {
            navigate('/orders', { replace: true })
        }

        return () => {
            // Цэвэрлэгч функц: Захиалгыг хоосолно.
            if(newOrderStatus.finished && !newOrderStatus.error) {
                clearOrder()
                clearBurger()
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newOrderStatus.finished, newOrderStatus.error])

    const saveOrderClick = () => {
        
        const order = {
            userId,
            ingredients,
            totalPrice,
            customer: {
                name,
                address: {
                    street,
                    city
                }
            }
        }
        
        saveOrder(order)
    }

    return (
        <div className={style.contactData}>
            <input onChange={e => setName(e.target.value)} type="text" name="name" placeholder="Таны нэр" />
            <input onChange={e => setStreet(e.target.value)} type="text" name="street" placeholder="Таны гэрийн хаяг" />
            <input onChange={e => setCity(e.target.value)} type="text" name="city" placeholder="Таны хот" />
            {
                newOrderStatus.saving ? <Spinner /> : <Button triggerBtn={saveOrderClick} type="success" text="ИЛГЭЭХ" />
            }
        </div>
    )
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
        saveOrder: (order) => dispatch(orderActions.saveOrder(order)),
        clearBurger: () => dispatch(burgerActions.clearOrder()),
        clearOrder: () => dispatch(orderActions.clearOrder()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactData)