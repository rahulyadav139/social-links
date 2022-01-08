import styles from './Modal.module.css';
import ReactDom from 'react-dom';
import { useDispatch } from 'react-redux';
import { ModalActions } from '../store/modalSlice';
import { useSelector } from 'react-redux';

import { AuthActions } from '../store/authSlice';

const Backdrop = props => {
  return <div onClick={props.onHide} className={styles.backdrop}></div>;
};

const ModalOverlay = props => {
  const message = useSelector(state => state.modal.message);
  return (
    <div className={styles.modal}>
      <p>{message}</p>
      <div className={styles.button}>
        <button onClick={props.onHide}>Ok</button>
      </div>
    </div>
  );
};

const overlay = document.getElementById('overlay');
const Modal = props => {
  const dispatch = useDispatch();

  const isRedirect = useSelector(state => state.modal.isRedirect);

  const hideModalHandler = () => {
    if (isRedirect) {
      dispatch(AuthActions.signOutHandler());

      dispatch(
        ModalActions.modalHandler({
          isModal: false,
          message: '',
          isRedirect: false,
        })
      );
      return;
    }

    dispatch(
      ModalActions.modalHandler({
        isModal: false,
        message: '',
        isRedirect: false,
      })
    );
  };
  return (
    <>
      {ReactDom.createPortal(<Backdrop onHide={hideModalHandler} />, overlay)}
      {ReactDom.createPortal(
        <ModalOverlay onHide={hideModalHandler} />,
        overlay
      )}
    </>
  );
};

export default Modal;
