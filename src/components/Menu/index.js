import { useContext } from 'react'
import SignupLoginContext from '../../context/SignupLoginContext'

import style from './style.module.css'
import MenuItem from '../MenuItem'

const Menu = () => {
    const { user: { userId } } = useContext(SignupLoginContext)

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

export default Menu