import Logo from '../Logo';
import HamburgerMenu from '../HamburgerMenu';
import Menu from '../Menu';
import styles from './style.module.css'

const Toolbar = ({ toggleSidebar }) => {
    return (
        <header className={styles.toolbar}>
            <HamburgerMenu clicked={toggleSidebar} />
            <Logo />
            <nav className={styles.hideOnMobile}>
                <Menu />
            </nav>
        </header>
    )
}

export default Toolbar;