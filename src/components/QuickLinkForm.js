import styles from './QuickLinkForm.module.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthActions } from './store/authSlice';
import LoadingSpinner from './UI/LoadingSpinner';
import { ModalActions } from './store/modalSlice';

const QuickLinkForm = props => {
  const [isLoading, setIsLoading] = useState(false);
  const authDetails = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const [username, setUsername] = useState('');

  const usernameChangeHandler = e => {
    setUsername(e.target.value);
  };

  const submitHandler = async e => {
    e.preventDefault();
    if (!username) {
      dispatch(
        ModalActions.modalHandler({
          isModal: true,
          message: 'Username should not be empty!',
          isRedirect: false,
        })
      );
      return;
    }

    setIsLoading(true);

    await fetch(
      `https://social-links-291a6-default-rtdb.firebaseio.com/users/${authDetails.uid}/quickLinks/${props.title}.json?auth=${authDetails.token}`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(username),
      }
    );

    dispatch(AuthActions.transferToggle());
    props.onExit();
    setIsLoading(false);
  };
  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <div className={styles.inputs}>
        <label>{props.title}</label>
        <input
          placeholder="Username"
          value={username}
          onChange={usernameChangeHandler}
          className={styles.username}
          type="text"
        />
      </div>
      <div className={styles.buttons}>
        <button onClick={props.onExit} type="button">
          Cancel
        </button>
        <button type="submit">Submit</button>
      </div>

      {isLoading && <LoadingSpinner />}
    </form>
  );
};
export default QuickLinkForm;
