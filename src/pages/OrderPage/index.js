import React from 'react'
import { connect } from 'react-redux'

// import axios from '../../axios-order'
import Order from '../../components/Order'
import Spinner from '../../components/Utils/Spinner'
import * as actions from '../../redux/actions/orderActions'

class OrderPage extends React.Component {

    componentDidMount() {
        this.props.loadOrders(this.props.userId)
    }
    
    render() {
        // console.log(JSON.stringify(this.props.orders))
        return (
            <div>
                { this.props.loading ? <Spinner /> : this.props.orders.map((order) => (<Order key={order[0]} order={order[1]} />)) }
            </div>
        )
    }
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