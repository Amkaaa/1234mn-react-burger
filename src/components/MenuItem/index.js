import style from './style.module.css'
import { NavLink } from 'react-router-dom'

const MenuItem = ({ children, exact, link }) => {
    return (
        <li className={style.menuItem} >
            <NavLink exact={exact === 'true' ? true : undefined} className={({ isActive }) => (isActive ? style.active : null)} to={link}>{children}</NavLink>
        </li>
    )
}

export default MenuItem