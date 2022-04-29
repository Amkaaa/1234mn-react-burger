import { createContext, useState } from "react";
import axios from '../axios-order'


const initialState = {
    orders: [],
    loading: false,
    error: null,
    newOrder: {
        saving: false,
        finished: false,
        error: null,
    }
};

const OrderContext = createContext();

export const OrderStore = (props) => {
    const [order, setOrder] = useState(initialState)

    setOrder((prevState) => ({
        ...prevState,
        loading: true,
    }))

    const loadOrders = (userId, token) => {
        axios
            .get(`/orders.json?auth=${token}&orderBy="order/userId"&equalTo="${userId}"`)
            .then(res => {
                const data = Object.entries(res.data).reverse()
                setOrder(prevState=>({
                    ...prevState,
                    orders: data,
                    loading: false
                }))
            })
            .catch(error => {
                setOrder(prevState => ({
                    ...prevState,
                    loading: false,
                    error
                }))
            })
    }

    const saveOrder = (newOrder, token) => {

        setOrder(prevState => ({
            ...prevState,
            newOrder: {
                ...prevState.newOrder,
                saving: true,
            }
        }))

        axios
            .post(`/orders.json?auth=${token}`, {
                order: newOrder
            })
            .then( res => {
                setOrder(prevState => ({
                    ...prevState,
                    newOrder: {
                        ...prevState.newOrder,
                        saving: false,
                        finished: true,
                        error: null,
                    }
                }))
            })
            .catch(error => {
                setOrder(prevState => ({
                    ...prevState,
                    newOrder: {
                        ...prevState.newOrder,
                        saving: false,
                        finished: true,
                        error,
                    }
                }))
            })
    }

    const clearOrder = () => {
        setOrder(prevState => ({
            ...prevState,
            newOrder: {
                saving: false,
                finished: false,
                error: null,
            }
        }))
    }
    
    return (
        <OrderContext.Provider value={{order, loadOrders, saveOrder, clearOrder}}>
            {props.children}
        </OrderContext.Provider>
    )
}

export default OrderContext