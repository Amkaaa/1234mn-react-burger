import { useEffect, useContext } from 'react'
import SignupLoginContext from '../../context/SignupLoginContext'
import OrderContext from '../../context/OrderContext'

import Order from '../../components/Order'
import Spinner from '../../components/Utils/Spinner'

const OrderPage = () => {
    const { user: { userId, token } } = useContext(SignupLoginContext)
    const { order: { orders, loading }, loadOrders } = useContext(OrderContext)

    useEffect(() => {
        loadOrders(userId, token)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (
        <div>
            { loading ? <Spinner /> : orders.map((order) => (<Order key={order[0]} order={order[1]} />)) }
        </div>
    )
}

export default OrderPage