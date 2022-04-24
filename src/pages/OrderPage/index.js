import React from 'react'
import axios from '../../axios-order'
import Order from '../../components/Order'
import Spinner from '../../components/Utils/Spinner'

class OrderPage extends React.Component {
    state = {
        orders: [],
        loading: false
    }

    componentDidMount() {
        this.setState({ loading: true })

        axios
            .get('/orders.json')
            .then(res => {
                this.setState({ orders: Object.entries(res.data).reverse() })
            })
            .finally(
                () => this.setState({ loading: false })
            )
    }
    
    render() {
        return (
            <div>
                { this.state.loading ? <Spinner /> : this.state.orders.map((order) => (<Order key={order[0]} order={order[1]} />)) }
            </div>
        )
    }
}

export default OrderPage