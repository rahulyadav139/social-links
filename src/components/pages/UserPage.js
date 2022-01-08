import styles from './UserPage.module.css';
import Preview from '../Preview';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../UI/LoadingSpinner';
import NoUserFound from './NoUserFound';

const UserPage = props => {
  const [isUser, setIsUser] = useState(false);
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();
  const username = params.username;

  useEffect(() => {
    const getUserData = async username => {
      setIsLoading(true);
      const res = await fetch(
        'https://social-links-291a6-default-rtdb.firebaseio.com/users.json'
      );

      if (!res.ok) throw new Error('Something went wrong!');

      const data = await res.json();

      for (const key in data) {
        if (data[key].username === username) {
          setIsUser(true);
          const matchedData = data[key];

          if (!!matchedData.customLinks) {
            let customLinksArray = [];
            for (const key in matchedData.customLinks) {
              if (matchedData.customLinks[key]) {
                customLinksArray.push({
                  title: key,
                  link: matchedData.customLinks[key],
                });
              }
            }
            setUserData({
              name: matchedData.name,
              quickLinks: matchedData.quickLinks,
              customLinks: customLinksArray,
            });
          }
        }
      }
      setIsLoading(false);
    };

    try {
      getUserData(username);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, [username]);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {isUser ? (
        <div className={styles.view}>
          <Preview
            name={userData.name}
            quickLinks={userData.quickLinks || []}
            customLinks={userData.customLinks || []}
          />
        </div>
      ) : (
        ''
      )}
      {!isUser && !isLoading && <NoUserFound />}
    </>
  );
};
export default UserPage;
