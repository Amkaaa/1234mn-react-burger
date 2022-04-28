import { connect } from 'react-redux'
import style from './style.module.css'
import MenuItem from '../MenuItem'

const Menu = ({ userId }) => {
    return (
        <div>
            <ul className={style.menu}>
                {userId ? (
                    <>
                        <MenuItem exact={true} link="/">Шинэ захиалга</MenuItem>
                        <MenuItem link="/orders">Захиалгууд</MenuItem>
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
}

const mapStateToProps = state => {
    return {
        userId: state.signupLoginReducer.userId
    }
}

export default connect(mapStateToProps)(Menu)