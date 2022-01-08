import styles from './Form.module.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AuthActions } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import useInput from '../hooks/use-input';
import { textFormatter } from '../store/helper-functions.js';
import { useState } from 'react';
import LoadingSpinner from '../UI/LoadingSpinner';
import { ModalActions } from '../store/modalSlice';

const SignUp = props => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    value: firstName,
    setIsTouched: firstNameIsTouched,
    isValid: firstNameIsValid,
    isInvalid: firstNameIsInvalid,
    changeHandler: firstNameChangeHandler,
    blurHandler: firstNameBlurHandler,
  } = useInput(value => value.trim().length !== 0);
  const {
    value: lastName,
    setIsTouched: lastNameIsTouched,
    isValid: lastNameIsValid,
    isInvalid: lastNameIsInvalid,
    changeHandler: lastNameChangeHandler,
    blurHandler: lastNameBlurHandler,
  } = useInput(value => value.trim().length !== 0);
  const {
    value: email,
    setIsTouched: emailIsTouched,
    isValid: emailIsValid,
    isInvalid: emailIsInvalid,
    changeHandler: emailChangeHandler,
    blurHandler: emailBlurHandler,
  } = useInput(value => value.includes('@') && value.includes('.'));
  const {
    value: username,
    setIsTouched: usernameIsTouched,
    isValid: usernameIsValid,
    isInvalid: usernameIsInvalid,
    changeHandler: usernameChangeHandler,
    blurHandler: usernameBlurHandler,
  } = useInput(value => value.trim().length >= 6);
  const {
    value: password,
    setIsTouched: passwordIsTouched,
    isValid: passwordIsValid,
    isInvalid: passwordIsInvalid,
    changeHandler: passwordChangeHandler,
    blurHandler: passwordBlurHandler,
  } = useInput(value => value.trim().length >= 6);
  const {
    value: confirmPassword,
    setIsTouched: confirmPasswordIsTouched,
    isValid: confirmPasswordIsValid,
    isInvalid: confirmPasswordIsInvalid,
    changeHandler: confirmPasswordChangeHandler,
    blurHandler: confirmPasswordBlurHandler,
  } = useInput(value => value.trim().length !== 0);

  const firstNameClasses = firstNameIsInvalid ? styles.invalid : '';
  const lastNameClasses = lastNameIsInvalid ? styles.invalid : '';
  const emailClasses = emailIsInvalid ? styles.invalid : '';
  const passwordClasses = passwordIsInvalid ? styles.invalid : '';
  const usernameClasses = usernameIsInvalid ? styles.invalid : '';
  const confirmPasswordClasses = confirmPasswordIsInvalid ? styles.invalid : '';

  const submitHandler = async e => {
    e.preventDefault();

    if (!firstNameIsValid) firstNameIsTouched(true);
    if (!lastNameIsValid) lastNameIsTouched(true);
    if (!emailIsValid) emailIsTouched(true);
    if (!usernameIsValid) usernameIsTouched(true);
    if (!passwordIsValid) passwordIsTouched(true);
    if (!confirmPasswordIsValid) confirmPasswordIsTouched(true);

    if (
      !firstNameIsValid ||
      !lastNameIsValid ||
      !emailIsValid ||
      !confirmPasswordIsValid
    )
      return;

    if (!passwordIsValid) {
      dispatch(
        ModalActions.modalHandler({
          isModal: true,
          message: 'Password should be minimum 6 characters!',
          isRedirect: false,
        })
      );
      return;
    }
    if (password !== confirmPassword) {
      dispatch(
        ModalActions.modalHandler({
          isModal: true,
          message: 'Password does not match!',
          isRedirect: false,
        })
      );
      return;
    }

    const userCredentials = {
      email,
      password,
      returnSecureToken: true,
    };
    try {
      setIsLoading(true);
      const res = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBWVm2J3rC0AH8VD3cxetF4PcC5ZwphT0s',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(userCredentials),
        }
      );

      if (!res.ok) throw new Error('Something went wrong!');

      const data = await res.json();

      dispatch(
        AuthActions.signInHandler({
          token: data.idToken,
          uid: data.localId,
        })
      );

      await fetch(
        `https://social-links-291a6-default-rtdb.firebaseio.com/users/${data.localId}.json?auth=${data.idToken}`,
        {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            name: `${textFormatter(firstName)} ${textFormatter(lastName)}`,
            username,
          }),
        }
      );
      setIsLoading(false);
      navigate('/admin');
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div>
        <label>First Name</label>
        <input
          className={firstNameClasses}
          value={firstName}
          onChange={firstNameChangeHandler}
          onBlur={firstNameBlurHandler}
          type="text"
        />
      </div>
      <div>
        <label>Last Name</label>
        <input
          className={lastNameClasses}
          value={lastName}
          onChange={lastNameChangeHandler}
          onBlur={lastNameBlurHandler}
          type="text"
        />
      </div>
      <div>
        <label>Email</label>
        <input
          className={emailClasses}
          value={email}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          type="email"
        />
      </div>
      <div>
        <label>Username</label>
        <input
          className={usernameClasses}
          value={username}
          onChange={usernameChangeHandler}
          onBlur={usernameBlurHandler}
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
          type="text"
        />
      </div>
      <div>
        <label>Confirm Password</label>
        <input
          className={confirmPasswordClasses}
          value={confirmPassword}
          onChange={confirmPasswordChangeHandler}
          onBlur={confirmPasswordBlurHandler}
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
    </form>
  );
};
export default SignUp;
