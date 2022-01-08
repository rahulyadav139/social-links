import styles from './LinkBar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AuthActions } from './store/authSlice';
import LoadingSpinner from './UI/LoadingSpinner';
import { useState } from 'react';

import { DeleteIcon } from './UI/icons';

const CustomLinkBar = props => {
  const [isLoading, setIsLoading] = useState(false);
  const authDetails = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const { customLinks } = props;

  const cancelHandler = async title => {
    setIsLoading(true);
    await fetch(
      `https://social-links-291a6-default-rtdb.firebaseio.com/users/${authDetails.uid}/customLinks/${title}.json?auth=${authDetails.token}`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(''),
      }
    );
    setIsLoading(false);
    dispatch(AuthActions.transferToggle());
  };
  return (
    <>
      {customLinks.length !== 0 &&
        customLinks.map((el, i) => (
          <div className={styles.row} key={i + 1}>
            <h2>{el.title}</h2>
            <button onClick={() => cancelHandler(el.title)}>
              <DeleteIcon />
            </button>
          </div>
        ))}
      {isLoading && <LoadingSpinner />}
    </>
  );
};
export default CustomLinkBar;
