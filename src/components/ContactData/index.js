import { useState, useEffect, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import OrderContext from '../../context/OrderContext'
import BurgerContext from '../../context/BurgerContext'
import SignupLoginContext from '../../context/SignupLoginContext'

import style from './style.module.css'
import Button from '../Utils/Button'
import Spinner from '../Utils/Spinner'

const ContactData = () => {
    const { saveOrder, clearOrder, order: { newOrder } } = useContext(OrderContext)
    const { burger: { ingredients, totalPrice }, clearIngredient } = useContext(BurgerContext)
    const { user: { userId, token } } = useContext(SignupLoginContext)

    const priceRef = useRef();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");

    useEffect(()=> {
        if(newOrder.finished && !newOrder.error) {
            navigate('/orders', { replace: true })
        }

        return () => {
            // Цэвэрлэгч функц: Захиалгыг хоосолно.
            if(newOrder.finished && !newOrder.error) {
                clearOrder()
                clearIngredient()
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newOrder.finished, newOrder.error])

    const changeName = (e) => {
        
        if(priceRef.current.style.color === 'red') {
            priceRef.current.style.color = "green";
        } else {
            priceRef.current.style.color = "red";
        }
        setName(e.target.value)
    }

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
        
        saveOrder(order, token)
    }

    return (
        <div className={style.contactData}>
            <div ref={priceRef}>
                <strong>Дүн: {totalPrice}₮</strong>
            </div>
            <input onChange={changeName} type="text" name="name" placeholder="Таны нэр" />
            <input onChange={e => setStreet(e.target.value)} type="text" name="street" placeholder="Таны гэрийн хаяг" />
            <input onChange={e => setCity(e.target.value)} type="text" name="city" placeholder="Таны хот" />
            {
                newOrder.saving ? <Spinner /> : <Button triggerBtn={saveOrderClick} type="success" text="ИЛГЭЭХ" />
            }
        </div>
    )
}

export default ContactData