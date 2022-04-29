import { useContext } from 'react'
import BurgerContext from '../../context/BurgerContext'

import Button from '../Utils/Button'
import style from './style.module.css'

const OrderSummary = ({ nextConfirmOrder, hideConfirmOrder }) => {
    const { burger: { ingredients, totalPrice } } = useContext(BurgerContext)

    return <div className={style.orderSummary}>
        <h3>Таны захиалга</h3>
        <p>Таны сонгосон орцууд</p>
        <ul>
            {
                Object.entries(ingredients).map((ingredient, index) => {
                    return <li key={index}>
                        {ingredient[1].name} : {ingredient[1].count}
                    </li>
                })
            }
        </ul>
        <p><strong>Захиалгын дүн: {totalPrice}₮</strong></p>
        <Button triggerBtn={hideConfirmOrder} type="danger" text="Татгалзах" />
        <Button triggerBtn={nextConfirmOrder} type="success" text="Үргэлжлүүлэх" />
    </div>
}

export default OrderSummary