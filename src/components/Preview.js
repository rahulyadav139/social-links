import styles from './Preview.module.css';
import {
  InstagramIcon,
  FacebookIcon,
  TwitterIcon,
  LinkedInIcon,
  GithubIcon,
} from './UI/icons';

const Preview = props => {
  const { quickLinks, customLinks, name } = props;
  return (
    <div className={styles.screen}>
      <div className={styles.image}>
        <img src={require('../Assets/brand-logo.png')} alt="" />
      </div>
      <h2 className={styles.name}>{name}</h2>

      <div className={styles.links}>
        {quickLinks && quickLinks.Instagram && (
          <div className={styles.link}>
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://instagram.com/${quickLinks.Instagram}`}
            >
              <InstagramIcon />
            </a>
          </div>
        )}
        {quickLinks && quickLinks.Facebook && (
          <div className={styles.link}>
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://facebook.com/${quickLinks.Facebook}`}
            >
              <FacebookIcon />
            </a>
          </div>
        )}
        {quickLinks && quickLinks.LinkedIn && (
          <div className={styles.link}>
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://linkedin.com/in/${quickLinks.LinkedIn}`}
            >
              <LinkedInIcon />
            </a>
          </div>
        )}
        {quickLinks && quickLinks.Twitter && (
          <div className={styles.link}>
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://twitter.com/${quickLinks.Twitter}`}
            >
              <TwitterIcon />
            </a>
          </div>
        )}
        {quickLinks && quickLinks.Github && (
          <div className={styles.link}>
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://github.com/${quickLinks.Github}`}
            >
              <GithubIcon />
            </a>
          </div>
        )}
      </div>
      <div className={styles['custom-links']}>
        {customLinks.length !== 0 &&
          customLinks.map(el => (
            <a key={el.title} target="_blank" rel="noreferrer" href={el.link}>
              <div className={styles.custom}>{el.title}</div>
            </a>
          ))}
      </div>
    </div>
  );
};
export default Preview;
