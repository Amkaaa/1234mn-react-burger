import style from './style.module.css'
import MenuItem from '../MenuItem'

const Menu = () => (
    <div>
        <ul className={style.menu}>
            <MenuItem exact={true} link="/">Шинэ захиалга</MenuItem>
            <MenuItem link="/login">Нэвтрэх</MenuItem>
            <MenuItem link="/orders">Захиалгууд</MenuItem>
        </ul>
    </div>
)

export default Menu