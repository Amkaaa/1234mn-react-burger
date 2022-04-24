import style from './style.module.css'
import Logo from '../Logo'
import Menu from '../Menu'
import Shadow from '../Utils/Shadow'

const Sidebar = ({ toggleSidebar, showSidebar }) => {
    let classes = [style.sidebar, style.close]

    if(showSidebar) classes = [style.sidebar, style.open]


    return (
        <div>
            <Shadow show={showSidebar} clicked={toggleSidebar} />
            <div className={classes.join(' ')}>
                <div className={style.logo}>
                <Logo />
                </div>
                <Menu />
            </div>
        </div>
    )
}

export default Sidebar;