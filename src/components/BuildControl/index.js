import style from './style.module.css'
import {connect} from 'react-redux'
import * as actions from '../../redux/actions/burgerActions'

const BuildControl = ({ ingredient, addIngredient,  removeIngredient }) => {
    return (
        <div className={style.buildControl}>
            <div className={style.label}>{ingredient[1].name}</div>
            <button disabled={ingredient[1].count <= 0} className={style.less} onClick={() => removeIngredient(ingredient[0])}>Хасах</button>
            <button className={style.more} onClick={() => addIngredient(ingredient[0])}>Нэмэх</button>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredient: (ingredient) => dispatch(actions.addIngredient(ingredient)),
        removeIngredient: (ingredient) => dispatch(actions.removeIngredient(ingredient)),
    }
}

export default connect(null, mapDispatchToProps)(BuildControl)