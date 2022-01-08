import styles from './Form.module.css';
import { Link } from 'react-router-dom';
import useInput from '../hooks/use-input';
import { useDispatch, useSelector } from 'react-redux';
import { AuthActions } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../UI/LoadingSpinner';
import { useState } from 'react';
import { ModalActions } from '../store/modalSlice';
import Modal from '../UI/Modal';

const SignIn = props => {
  const isModal = useSelector(state => state.modal.isModal);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    value: email,
    setIsTouched: emailIsTouched,
    isValid: emailIsValid,
    isInvalid: emailIsInvalid,
    changeHandler: emailChangeHandler,
    blurHandler: emailBlurHandler,
  } = useInput(value => value.trim().length !== 0);
  const {
    value: password,
    setIsTouched: passwordIsTouched,
    isValid: passwordIsValid,
    isInvalid: passwordIsInvalid,
    changeHandler: passwordChangeHandler,
    blurHandler: passwordBlurHandler,
  } = useInput(value => value.trim().length !== 0);

  const emailClasses = emailIsInvalid ? styles.invalid : '';
  const passwordClasses = passwordIsInvalid ? styles.invalid : '';

  const submitHandler = async e => {
    e.preventDefault();

    const userCredentials = {
      email,
      password,
      returnSecureToken: true,
    };

    if (!emailIsValid) emailIsTouched(true);
    if (!passwordIsValid) passwordIsTouched(true);

    if (!emailIsValid || !passwordIsValid) {
      dispatch(
        ModalActions.modalHandler({
          isModal: true,
          message: 'Email or password should not be empty!',
          isRedirect: false,
        })
      );
      return;
    }
    try {
      setIsLoading(true);
      const res = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBWVm2J3rC0AH8VD3cxetF4PcC5ZwphT0s',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(userCredentials),
        }
      );
      if (res.status === 400) {
        dispatch(
          ModalActions.modalHandler({
            isModal: true,
            message: 'Incorrect email and password!',
            isRedirect: false,
          })
        );
        setIsLoading(false);
        return;
      }
      if (!res.ok) throw new Error('Something went wrong!');

      const data = await res.json();

      dispatch(
        AuthActions.signInHandler({
          token: data.idToken,
          uid: data.localId,
        })
      );
      setIsLoading(false);
      navigate('/admin');
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <div>
        <label>Email</label>
        <input
          className={emailClasses}
          value={email}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          type="text"
        />
      </div>
      <div>
        <label>Password</label>
        <input
          className={passwordClasses}
          value={password}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          type="password"
        />
      </div>
      <div className={styles.buttons}>
        <button type="button">
          <Link to="/">Cancel</Link>
        </button>
        <button type="submit">Submit</button>
      </div>
      {isLoading && <LoadingSpinner />}
      {isModal && <Modal />}
    </form>
  );
};
export default SignIn;
