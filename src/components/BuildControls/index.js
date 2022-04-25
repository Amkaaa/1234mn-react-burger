import style from './style.module.css'
import BuildControl from '../BuildControl'

import {connect} from 'react-redux'
import * as actions from '../../redux/action/actionTypes'

const BuildControls = ({ addIngredient, removeIngredient, ingredients, totalPrice, purchasing, showConfirmOrder }) => {
    return (
        <div className={style.buildControls}>
            <p>Бургерийн үнэ: <strong>{totalPrice}</strong></p>
            {
                Object.entries(ingredients).map((ingredient, index) => {
                    return (
                        <BuildControl
                            key={index}
                            addIngredient={addIngredient}
                            removeIngredient={removeIngredient}
                            ingredient={ingredient}
                        />
                    )
                })
            }
            <button 
                className={style.orderButton} 
                disabled={!purchasing}  
                // synthetic event
                onClick={showConfirmOrder}>Захиалах</button>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        purchasing: state.purchasing,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredient: (ingredient) => dispatch(actions.addIngredient(ingredient)),
        removeIngredient: (ingredient) => dispatch(actions.removeIngredient(ingredient)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuildControls)