import styles from './HomePage.module.css';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { HeartIcon } from '../UI/icons';

import brandImage from '../../Assets/brand-logo-transparent.png';
import { Link } from 'react-router-dom';
const HomePage = props => {
  const navigate = useNavigate();
  const usernameRef = useRef();

  const enterToSearchHandler = e => {
    if (e.keyCode === 13) {
      searchHandler();
    }
  };

  const searchHandler = () => {
    const username = usernameRef.current.value;

    if (!username) return;

    navigate(`/${username.toLowerCase()}`);
  };
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
          <label>links /</label>
          <input
            onKeyDown={enterToSearchHandler}
            ref={usernameRef}
            placeholder="username"
            type="text"
          />
        </div>
        <button onClick={searchHandler}>search</button>
        <div className={styles.promotion}>
          Made with <HeartIcon /> by{' '}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://social-links-green.vercel.app/rahulyadav"
          >
            Rahul Yadav
          </a>
        </div>
      </div>
    </section>
  );
};
export default HomePage;
