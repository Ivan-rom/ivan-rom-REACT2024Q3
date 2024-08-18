import { NavLink } from 'react-router-dom';
import styles from './header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/uncontrolled-form">Uncontrolled form</NavLink>
        <NavLink to="/hook-form">Hook form</NavLink>
      </nav>
    </header>
  );
}

export default Header;
