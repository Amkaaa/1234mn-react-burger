import style from './style.module.css'

const BuildControl = ({ ingredient, addIngredient,  removeIngredient }) => {
    return (
        <div className={style.buildControl}>
            <div className={style.label}>{ingredient[1].name}</div>
            <button disabled={ingredient[1].count <= 0} className={style.less} onClick={() => removeIngredient(ingredient[0])}>Хасах</button>
            <button className={style.more} onClick={() => addIngredient(ingredient[0])}>Нэмэх</button>
        </div>
    )
}

export default BuildControl