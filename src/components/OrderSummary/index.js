import { connect } from 'react-redux'
import Button from '../Utils/Button'
import style from './style.module.css'

const OrderSummary = ({ ingredients, totalPrice, nextConfirmOrder, hideConfirmOrder }) => {
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

const mapStateToProps = state => {
    return {
        ingredients: state.burgerReducer.ingredients,
        totalPrice: state.burgerReducer.totalPrice
    }
}

export default connect(mapStateToProps)(OrderSummary)