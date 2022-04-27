import { connect } from 'react-redux'
import * as actions from '../../redux/actions/loginActions'

import style from './style.module.css'
import MenuItem from '../MenuItem'

const Menu = (props) => (
    <div>
        <ul className={style.menu}>
            {props.userId ? (
                <>
                    <MenuItem exact={true} link="/">Шинэ захиалга</MenuItem>
                    <MenuItem link="/orders">Захиалгууд</MenuItem>
                    <MenuItem link="/asdasd">asdasd</MenuItem>
                    <MenuItem link="/logout">Гарах</MenuItem>
                </>
            ) : (
                <>
                    <MenuItem link="/login">Нэвтрэх</MenuItem>
                    <MenuItem link="/signup">Бүртгүүлэх</MenuItem>
                </>
            )}
        </ul>
    </div>
)

const mapStateToProps = state => {
    return {
        userId: state.signupLoginReducer.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logoutUser()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)