import style from './style.module.css'

const HamburgerMenu = ({ clicked }) => (
    <div onClick={clicked} className={style.hamburgerMenu}>
        <div />
        <div />
        <div />
    </div>
)

export default HamburgerMenu