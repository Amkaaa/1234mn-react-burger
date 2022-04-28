import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Burger from '../../components/Burger'
import BuildControls from '../../components/BuildControls'
import Modal from '../../components/Utils/Modal'
import OrderSummary from '../../components/OrderSummary'

const  BurgerPage = () => {
    const navigate = useNavigate()
    const [confirmOrder, setConfirmOrder] = useState(false)

    const nextConfirmOrder = () => {
        navigate('/shipping', {
            replace: true
        });

        hideConfirmOrder()
    }

    const hideConfirmOrder = () => {
        setConfirmOrder(false)
    }

    const showConfirmOrder = () => {
        setConfirmOrder(true)
    }

    return (
        <div>
            <Modal show={confirmOrder} hideConfirmOrder={hideConfirmOrder} >
                <OrderSummary
                    hideConfirmOrder={hideConfirmOrder}
                    nextConfirmOrder={nextConfirmOrder} />
            </Modal>
            <Burger />
            <BuildControls showConfirmOrder={showConfirmOrder} />
        </div>
    )
}

export default BurgerPage;
