import style from './style.module.css'
import MyLogo from '../../assets/images/burger.png'

const Logo = () => (
    <div className={style.logo}>
        <img src={MyLogo} alt="logo" />
    </div>
)

export default Logo