import styles from './Admin.module.css';
import {
  InstagramIcon,
  FacebookIcon,
  TwitterIcon,
  LinkedInIcon,
  GithubIcon,
} from '../UI/icons';
import { useEffect, useState } from 'react';
import QuickLinkForm from '../QuickLinkForm';
import CustomLinkForm from '../CustomLinkForm';
import CustomLinkBar from '../CustomLinkBar';

import { useDispatch, useSelector } from 'react-redux';
import { AuthActions } from '../store/authSlice';

import QuickLinkBar from '../QuickLinkBar';
import Preview from '../Preview';

import LoadingSpinner from '../UI/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import { ModalActions } from '../store/modalSlice';
import Modal from '../UI/Modal';

const iconData = [
  {
    title: 'Facebook',
    icon: <FacebookIcon />,
  },
  {
    title: 'Instagram',
    icon: <InstagramIcon />,
  },
  {
    title: 'LinkedIn',
    icon: <LinkedInIcon />,
  },

  {
    title: 'Twitter',
    icon: <TwitterIcon />,
  },
  {
    title: 'Github',
    icon: <GithubIcon />,
  },
];

const Admin = props => {
  const isModal = useSelector(state => state.modal.isModal);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [customLinks, setCustomLinks] = useState([]);
  const [quickLinks, setQuickLinks] = useState([]);
  const [userData, setUserData] = useState('');
  const [quickLinkTitle, setQuickLinkTitle] = useState(null);
  const [editQuickLinks, setEditQuickLinks] = useState(false);
  const [addCustomLink, setAddCustomLink] = useState(false);

  const authDetails = useSelector(state => state.auth);
  const transfer = authDetails.transfer;

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      const res = await fetch(
        `https://social-links-291a6-default-rtdb.firebaseio.com/users/${authDetails.uid}.json?auth=${authDetails.token}`
      );
      if (res.status === 401) {
        dispatch(
          ModalActions.modalHandler({
            isModal: true,
            message: 'Logout!',
            isRedirect: true,
          })
        );
        setIsLoading(false);
        return;
      }
      if (!res.ok) throw new Error('Something went wrong');

      const data = await res.json();

      setUserData(data);

      if (data.quickLinks) {
        setQuickLinks(data.quickLinks);
      }
      let customLinksArray = [];
      if (!!data.customLinks) {
        for (const key in data.customLinks) {
          if (data.customLinks[key]) {
            customLinksArray.push({ title: key, link: data.customLinks[key] });
          }
        }
        setCustomLinks(customLinksArray);
      }
      setIsLoading(false);
    };

    try {
      getData();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, [transfer, authDetails.token, authDetails.uid, dispatch]);

  const setEditQuickLinkHandler = title => {
    setEditQuickLinks(true);
    setAddCustomLink(false);
    setQuickLinkTitle(title);
  };

  const exitEditQuickLinksHandler = () => {
    setEditQuickLinks(false);
  };

  const setEditCustomLinkHandler = () => {
    setAddCustomLink(true);
    setEditQuickLinks(false);
  };

  const exitEditCustomLinkHandler = () => {
    setAddCustomLink(false);
  };

  const logoutHandler = () => {
    dispatch(AuthActions.signOutHandler());
    navigate('/');
  };

  return (
    <div className={styles.interface}>
      <div className={styles.preview}>
        <div className={styles.wrapper}>
          <span className={styles.colored}>My Link: </span>
          <a
            className={styles['my-link']}
            target="_blank"
            rel="noreferrer"
            href={`https://social-links-green.vercel.app/${userData.username}`}
          >
            {`social-links-green.vercel.app/${userData.username}`}
          </a>
        </div>

        <div className={styles.card}>
          <Preview
            name={userData.name}
            quickLinks={quickLinks}
            customLinks={customLinks}
          />
        </div>
      </div>

      <div className={styles.actions}>
        <header className={styles.header}>
          <h2>{`Hi ${userData && userData.name.split(' ')[0]},`}</h2>
          <button onClick={logoutHandler}>Logout</button>
        </header>
        <div className={styles['quick-links']}>
          {iconData.map(el => (
            <div
              className={styles['quick-link']}
              key={el.title}
              onClick={() => setEditQuickLinkHandler(el.title)}
            >
              {el.icon}
            </div>
          ))}
        </div>
        {editQuickLinks && (
          <QuickLinkForm
            onExit={exitEditQuickLinksHandler}
            title={quickLinkTitle}
          />
        )}
        {!addCustomLink && (
          <button className={styles.add} onClick={setEditCustomLinkHandler}>
            Add More
          </button>
        )}

        {addCustomLink && <CustomLinkForm onExit={exitEditCustomLinkHandler} />}
        <div className={styles['custom-links']}>
          <QuickLinkBar quickLinks={quickLinks} />
          <CustomLinkBar customLinks={customLinks} />
        </div>
      </div>
      {isLoading && <LoadingSpinner />}
      {isModal && <Modal />}
    </div>
  );
};
export default Admin;
