import { useContext } from 'react'
import BurgerContext from '../../context/BurgerContext'
import style from './style.module.css'

const BuildControl = ({ ingredient }) => {
    const { addIngredient, removeIngredient } = useContext(BurgerContext)

    return (
        <div className={style.buildControl}>
            <div className={style.label}>{ingredient[1].name}</div>
            <button disabled={ingredient[1].count <= 0} className={style.less} onClick={() => removeIngredient(ingredient[0])}>Хасах</button>
            <button className={style.more} onClick={() => addIngredient(ingredient[0])}>Нэмэх</button>
        </div>
    )
}

export default BuildControl