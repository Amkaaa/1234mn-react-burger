import style from './style.module.css'

const Button = ({ type, text, triggerBtn }) => (<button onClick={triggerBtn} className={`${style.button} ${style[type]}`}>{ text }</button>)

export default Button