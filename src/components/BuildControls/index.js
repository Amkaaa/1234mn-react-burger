import style from './style.module.css'
import BuildControl from '../BuildControl'

import {connect} from 'react-redux'

const BuildControls = ({ ingredients, totalPrice, purchasing, showConfirmOrder }) => {
    return (
        <div className={style.buildControls}>
            <p>Бургерийн үнэ: <strong>{totalPrice}</strong></p>
            {
                Object.entries(ingredients).map((ingredient, index) => {
                    return (
                        <BuildControl
                            key={index}
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
        ingredients: state.burgerReducer.ingredients,
        totalPrice: state.burgerReducer.totalPrice,
        purchasing: state.burgerReducer.purchasing,
    }
}

export default connect(mapStateToProps)(BuildControls)