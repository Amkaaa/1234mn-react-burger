import style from './style.module.css'

const BurgerIngredient = (props) => {
    if(props.type === 'bread-top') 
    return <div className={style.breadTop}>
            <div className={style.seed}></div>
            <div className={`${style.seed} ${style.second}`}></div>
            <div className={`${style.seed} ${style.third}`}></div>
            <div className={`${style.seed} ${style.fourth}`}></div>
        </div>
    if(props.type === 'salad') return <div className={style.salad}></div>
    if(props.type === 'meat') return <div className={style.meat}></div>
    if(props.type === 'cheese') return <div className={style.cheese}></div>
    if(props.type === 'bacon') return <div className={style.bacon}></div>
    if(props.type === 'bread-bottom') return <div className={style.breadBottom}></div>
    return (
        <div>
            {props.type}
        </div>
    )
}

export default BurgerIngredient
// https://codepen.io/pmind2015/pen/XWbXbym