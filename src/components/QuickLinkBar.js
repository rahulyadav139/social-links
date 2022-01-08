import { AuthActions } from './store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from './UI/LoadingSpinner';
import { useState } from 'react';
import styles from './LinkBar.module.css';
import { DeleteIcon } from './UI/icons';
const QuickLinkBar = props => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const authDetails = useSelector(state => state.auth);
  const { quickLinks } = props;

  let quickLinksArray = [];
  for (const key in quickLinks) {
    if (quickLinks[key]) {
      quickLinksArray.push({ title: key, value: quickLinks[key] });
    }
  }

  const cancelHandler = async title => {
    setIsLoading(true);

    await fetch(
      `https://social-links-291a6-default-rtdb.firebaseio.com/users/${authDetails.uid}/quickLinks/${title}.json?auth=${authDetails.token}`,
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
      {quickLinksArray.length !== 0 &&
        quickLinksArray.map((el, i) => (
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
export default QuickLinkBar;
