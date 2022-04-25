import { Component } from 'react'
import Burger from '../../components/Burger'
import BuildControls from '../../components/BuildControls'
import Modal from '../../components/Utils/Modal'
import OrderSummary from '../../components/OrderSummary'
import {withRouter} from '../../with-router'

class BurgerPage extends Component {
    constructor(){
        super()
        this.state = {
            confirmOrder: false,
        }

        this.nextConfirmOrder = this.nextConfirmOrder.bind(this)
    }

    nextConfirmOrder = () => {
        this.props.navigate('/shipping');

        this.hideConfirmOrder()
    }

    hideConfirmOrder = () => {
        this.setState({
            confirmOrder: false,
        })
    }

    showConfirmOrder = () => {
        this.setState({
            confirmOrder: true,
        })
    }

    render() {
        return (
            <div>
                <Modal show={this.state.confirmOrder} hideConfirmOrder={this.hideConfirmOrder} >
                    <OrderSummary
                        hideConfirmOrder={this.hideConfirmOrder}
                        nextConfirmOrder={this.nextConfirmOrder} />
                </Modal>
                <Burger />
                <BuildControls showConfirmOrder={this.showConfirmOrder} />
            </div>
        )
    }
}

export default (withRouter(BurgerPage));
