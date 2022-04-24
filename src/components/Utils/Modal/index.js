import Shadow from '../Shadow'
import style from './style.module.css'

const Modal = ({ children, show, hideConfirmOrder }) => {
    return (
        <div>
            <Shadow show={show} clicked={hideConfirmOrder} />
            <div 
                style={{
                    transform: show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: show ? 1 : 0,
                }}
                className={style.modal}>
                {children}
            </div>
        </div>
    )
}

export default Modal