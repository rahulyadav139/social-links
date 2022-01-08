import styles from './NoUserFound.module.css';
import userNotFoundImg from '../../Assets/user-not-found-alt.png';

const NoUserFound = props => {
  return (
    <div className={styles.error}>
      <div className={styles.image}>
        <img src={userNotFoundImg} alt="user-not-found" />
      </div>
      <h1>User Not Found!</h1>
    </div>
  );
};
export default NoUserFound;
