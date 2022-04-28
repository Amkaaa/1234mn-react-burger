import { useEffect } from 'react'
import { connect } from 'react-redux'

import Order from '../../components/Order'
import Spinner from '../../components/Utils/Spinner'
import * as actions from '../../redux/actions/orderActions'

const OrderPage = ({ userId, loading, orders, loadOrders }) => {

    useEffect(() => {
        loadOrders(userId)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (
        <div>
            { loading ? <Spinner /> : orders.map((order) => (<Order key={order[0]} order={order[1]} />)) }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        orders: state.orderReducer.orders,
        loading: state.orderReducer.loading,
        userId: state.signupLoginReducer.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadOrders: (userId) => dispatch(actions.loadOrders(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderPage)