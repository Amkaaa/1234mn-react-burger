import style from './style.module.css'

const Order = ({ order: { order } }) => {
    return(
        <div className={style.order}>
            <p>Захиалагч: {order.customer.name}</p>
            <p>Орц:
                <ul>
                    <li>{order.ingredients.bacon.name} - {order.ingredients.bacon.count}</li>
                    <li>{order.ingredients.meat.name} - {order.ingredients.meat.count}</li>
                    <li>{order.ingredients.cheese.name} - {order.ingredients.cheese.count}</li>
                    <li>{order.ingredients.salad.name} - {order.ingredients.salad.count}</li>
                </ul>
            </p>
            <p>Захиалгын дүн: <strong>{order.totalPrice}</strong></p>
        </div>
    )
}

export default Order;