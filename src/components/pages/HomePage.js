import styles from './HomePage.module.css';

import brandImage from '../../Assets/brand-logo-transparent.png';
import { Link } from 'react-router-dom';
const HomePage = props => {
  return (
    <section className={styles.main}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <img src={brandImage} alt="brand-logo" />
        </div>
        <nav className={styles.nav}>
          <ul>
            <li>
              <Link to="/signin">Login</Link>
            </li>

            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        </nav>
      </header>
      <h1>
        One Link to <br />
        Rule Them All
      </h1>
      <div className={styles.search}>
        <div>
          <label>social.link /</label>
          <input placeholder="username" type="text" />
        </div>
        <button>Search</button>
      </div>
    </section>
  );
};
export default HomePage;
