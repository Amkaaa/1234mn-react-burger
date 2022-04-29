import { useContext } from 'react'
import BurgerContext from '../../context/BurgerContext'

import style from './style.module.css'
import BuildControl from '../BuildControl'

const BuildControls = ({ showConfirmOrder }) => {
    const { burger: { totalPrice, purchasing, ingredients } } = useContext(BurgerContext)

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

export default BuildControls