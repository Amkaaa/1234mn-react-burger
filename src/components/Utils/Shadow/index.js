import style from './style.module.css'

const Shadow = ({ show, clicked }) => {
    return show ? <div onClick={clicked} className={style.shadow} /> : null
}

export default Shadow