import { Component } from 'react'
import Burger from '../../components/Burger'
import BuildControls from '../../components/BuildControls'
import Modal from '../../components/Utils/Modal'
import Spinner from '../../components/Utils/Spinner'
import OrderSummary from '../../components/OrderSummary'
import {withRouter} from '../../with-router'
import {connect} from 'react-redux'
import * as actions from '../../redux/action/actionTypes'

class BurgerPage extends Component {
    constructor(){
        super()
        this.state = {
            purchasing: false,
            confirmOrder: false,
            loading: false
        }

        this.nextConfirmOrder = this.nextConfirmOrder.bind(this)
    }

    nextConfirmOrder = () => {

        const params = []

        for (let ingredient in this.state.ingredients) {
            params.push(encodeURIComponent(ingredient) + '=' + encodeURIComponent(this.state.ingredients[ingredient].count));
        }

        params.push('total=' + this.state.totalPrice);

        const query = params.join('&');

        console.log(query);

        this.props.navigate('/shipping?' + query);

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

    addIngredient = (type) => {
        const newIngredient = { ...this.state.ingredients }

        newIngredient[type].count++;

        const newPrice = this.state.totalPrice + this.state.ingredients[type].price;

        this.setState({
            purchasing: true,
            totalPrice: newPrice,
            ingredients: newIngredient,
        })
    }

    removeIngredient = (type) => {
        if(this.state.ingredients[type].count > 0) {
            const newIngredient = { ...this.state.ingredients }
            console.log(type);
            newIngredient[type].count--;
            const newPrice = this.state.totalPrice - this.state.ingredients[type].price;

            this.setState({
                purchasing: newPrice > 1000,
                totalPrice: newPrice,
                ingredients: newIngredient,
            })
        }

        // switch(type) {
        //     case 'salad':
        //         this.setState({
        //             ingredients: {
        //                 ...this.state.ingredients,
        //                 salad: this.state.ingredients.salad - 1
        //             },
        //         })
        //         break;
        //     case 'cheese':
        //         this.setState({
        //             ingredients: {
        //                 ...this.state.ingredients,
        //                 cheese: this.state.ingredients.cheese - 1
        //             },
        //         })
        //         break;
        //     case 'bacon':
        //         this.setState({
        //             ingredients: {
        //                 ...this.state.ingredients,
        //                 bacon: this.state.ingredients.bacon - 1
        //             },
        //         })
        //         break;
        //     case 'meat':
        //         this.setState({
        //             ingredients: {
        //                 ...this.state.ingredients,
        //                 meat: this.state.ingredients.meat - 1
        //             },
        //         })
        //         break;
        //     default:
        //         break;
        // }
    }

    render() {
        return (
            <div>
                <Modal show={this.state.confirmOrder} hideConfirmOrder={this.hideConfirmOrder} >
                    {this.state.loading ? <Spinner /> : <OrderSummary
                        hideConfirmOrder={this.hideConfirmOrder}
                        nextConfirmOrder={this.nextConfirmOrder} 
                        ingredients={this.props.ingredients} 
                        totalPrice={this.props.totalPrice} />}
                </Modal>
                <Burger ingredients={this.props.ingredients} />
                <BuildControls 
                    addIngredient={this.props.addIngredient} 
                    removeIngredient={this.props.removeIngredient} 
                    ingredients={this.props.ingredients} 
                    totalPrice={this.props.totalPrice} 
                    showConfirmOrder={this.showConfirmOrder}
                    btnDisable={!this.state.purchasing} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredient: (ingredient) => dispatch(actions.addIngredient(ingredient)),
        removeIngredient: (ingredient) => dispatch(actions.removeIngredient(ingredient)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BurgerPage));
