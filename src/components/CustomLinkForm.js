import styles from './CustomLinkForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AuthActions } from './store/authSlice';
import { useState } from 'react';
import LoadingSpinner from './UI/LoadingSpinner';
import { textFormatter } from './store/helper-functions';
import { ModalActions } from './store/modalSlice';

const CustomLinkForm = props => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const authDetails = useSelector(state => state.auth);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');

  const titleChangeHandler = e => {
    setTitle(e.target.value);
  };

  const linkChangeHandler = e => {
    setLink(e.target.value);
  };

  const submitHandler = async e => {
    e.preventDefault();

    if (!title) {
      dispatch(
        ModalActions.modalHandler({
          isModal: true,
          message: 'Title should not be empty!',
          isRedirect: false,
        })
      );
      return;
    }
    if (!link) {
      dispatch(
        ModalActions.modalHandler({
          isModal: true,
          message: 'Link should not be empty!',
          isRedirect: false,
        })
      );
      return;
    }

    setIsLoading(true);

    await fetch(
      `https://social-links-291a6-default-rtdb.firebaseio.com/users/${
        authDetails.uid
      }/customLinks/${textFormatter(title)}.json?auth=${authDetails.token}`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(link),
      }
    );

    setIsLoading(true);
    dispatch(AuthActions.transferToggle());
    props.onExit();
  };
  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <div className={styles.inputs}>
        <input
          value={title}
          onChange={titleChangeHandler}
          placeholder="Title"
          type="text"
        />
        <input
          value={link}
          onChange={linkChangeHandler}
          placeholder="Link"
          type="url"
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
export default CustomLinkForm;
