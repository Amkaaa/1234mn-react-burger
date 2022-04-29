import { useContext } from 'react'
import BurgerContext from '../../context/BurgerContext'
import { Route, Routes, useNavigate } from 'react-router-dom'

import Burger from '../../components/Burger'
import ContactData from '../../components/ContactData'
import Button from '../../components/Utils/Button'
import style from './style.module.css'

const ShippingPage = () => {
    const { burger: { totalPrice } } = useContext(BurgerContext)
    const navigate = useNavigate()
    
    const goBack = () => {
        navigate(-1);
    }

    const showContactData = () => {
        navigate('/shipping/contact', { replace: true });
    }

    return (
        <div className={style.shippingPage}>
            <p>
                <strong>Таны захиалга хүргэгдэхэд хэдхэн алхам үлдлээ...</strong>
            </p>
            <p>
                <strong>Нийт дүн: {totalPrice}₮</strong>
            </p>
            <Burger />
            <Button triggerBtn={goBack} type="danger" text="ЗАХИАЛГА ЦУЦЛАХ" />
            <Button triggerBtn={showContactData} type="success" text="ХҮРГЭЛТИЙН МЭДЭЭЛЭЛ ОРУУЛАХ" />
            <Routes>
                <Route path="contact" element={ <ContactData /> } />
            </Routes>
        </div>
    )
}

export default ShippingPage