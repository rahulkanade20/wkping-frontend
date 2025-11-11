import { Link } from 'react-router-dom';

import styles from './NavBar.module.css';

const NavBar = () => {
  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <Link to="/" className={styles.brand}>
            WebHealth Monitor
          </Link>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link to="/" className={styles.navLink}>Home</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/registerTeam" className={styles.navLink}>Register Team</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/registerLink" className={styles.navLink}>Register Link</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/dashBoard" className={styles.navLink}>Dashboard</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;