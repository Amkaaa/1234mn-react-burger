import style from './style.module.css'
import BuildControl from '../BuildControl'

const BuildControls = ({ addIngredient, removeIngredient, ingredients, totalPrice, btnDisable, showConfirmOrder }) => {
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
                disabled={btnDisable}  
                // synthetic event
                onClick={showConfirmOrder}>Захиалах</button>
        </div>
    )
}

export default BuildControls