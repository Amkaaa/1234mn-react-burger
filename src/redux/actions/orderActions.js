import { 
    LOAD_ORDERS_START,
    LOAD_ORDERS_SUCCESS,
    LOAD_ORDERS_ERROR,
    SAVE_ORDER_SUCCESS,
    SAVE_ORDER_START,
    SAVE_ORDER_ERROR,
 } from "../type";
 import axios from '../../axios-order'

export const loadOrders = (userId) => {
    return function(dispatch, getState) {
        // Захиалгыг татаж эхэллээ гэдгийг мэдэгдэнэ.
        // Энийг хүлээж аваад Spinner ажиллаж эхэлнэ.
        dispatch(loadOrdersStart)
        const token = getState().signupLoginReducer.token
        axios
            .get(`/orders.json?auth=${token}&orderBy="order/userId"&equalTo="${userId}"`)
            .then(res => {
                const data = Object.entries(res.data).reverse()
                console.log(res.data)
                dispatch(loadOrdersSuccess(data));
            })
            .catch(err => {
                dispatch(loadOrdersError(err))
            })
    }
}

export const loadOrdersStart = () => {
    return {
        type: LOAD_ORDERS_START,
    }
}

export const loadOrdersSuccess = (data) => {
    return {
        type: LOAD_ORDERS_SUCCESS,
        orders: data,
        
    }
}

export const loadOrdersError = (error) => {
    return {
        type: LOAD_ORDERS_ERROR,
        error
    }
}

export const saveOrder = newOrder => {
    return function (dispatch, getState) {
        dispatch(saveOrderStart());
        const token = getState().signupLoginReducer.token
        
        axios
            .post(`/orders.json?auth=${token}`, {
                order: newOrder
            })
            .then( res => {
                console.log('Статус код: ' + res.status + '\n Амжилттай захиалагдлаа')
                dispatch(saveOrderSuccess())
            })
            .catch(err => {
                dispatch(saveOrderError(err))
            })
    }
}

export const saveOrderStart = () => {
    return {
        type: SAVE_ORDER_START
    }
}

export const saveOrderSuccess = () => {
    return {
        type: SAVE_ORDER_SUCCESS,
    }
}

export const saveOrderError = (err) => {
    return {
        type: SAVE_ORDER_ERROR,
        err
    }
}