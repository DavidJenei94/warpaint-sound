import { Link, useNavigate } from 'react-router-dom';

import Modal from '../../UI/Modal/Modal';
import CloseButton from '../../UI/CloseButton';

import styles from './Information.module.scss';
import WpSLogo from '../../../assets/WarpaintSound-logo.png';
import NewSoundRecordIcon from '../../../assets/map-assets/add-sound-icon.png';
import SearchIcon from '../../../assets/map-assets/search-icon.png';
import ListIcon from '../../../assets/map-assets/list-icon.png';
import DataboundIcon from '../../../assets/map-assets/databound-icon.png';
import DonationIcon from '../../../assets/map-assets/donation-icon.png';
import ScrollIcon from '../../../assets/map-assets/scroll-to-map-icon.png';

const Information = () => {
  const navigate = useNavigate();

  const handlOutsideClick = () => {
    navigate('/map');
  };

  return (
    <Modal
      backdrop={true}
      overlay={true}
      onClose={handlOutsideClick}
      style={{ width: '80%', height: '80%' }}
    >
      <>
        <CloseButton onClose={handlOutsideClick} />
        <div className={styles.container}>
          <h1>Warpaint Sound</h1>
          <img
            className={styles.logo}
            src={WpSLogo}
            alt="Warpaint Sound logo"
          />
          <p>
            This application is only a hobby project and its purpose is to
            provide some information about musical instruments and to make joy.
          </p>
          <div className={styles['with-icon-line']}>
            <img className={styles.icon} src={NewSoundRecordIcon} />
            <span>
              You can upload sound records of your instruments at your current
              location (most accurate by phone's GPS) and browse the sounds of
              the ones uploaded by others.
            </span>
          </div>
          <div className={styles['with-icon-line']}>
            <img className={styles.icon} src={SearchIcon} />
            <span>Search instruments by name, category or subcategory.</span>
          </div>
          <div className={styles['with-icon-line']}>
            <img className={styles.icon} src={ListIcon} />
            <span>List the sound records on the visible map area.</span>
          </div>
          <div className={styles['with-icon-line']}>
            <img className={styles.icon} src={DataboundIcon} />
            <span>Set the view to see all visible sound record.</span>
          </div>
          <div className={styles['with-icon-line']}>
            <img className={styles.icon} src={DonationIcon} />
            <span>
              If you like the content, supporting my work is really appreciated.
            </span>
          </div>
          <div className={styles['with-icon-line']}>
            <img className={styles.icon} src={ScrollIcon} />
            <span>
              On mobile or smaller screen devices, you can scroll to map to have
              fullscreen view and then scroll back to menu.
            </span>
          </div>
          <p>
            No personal information is stored, however by uploading a sound
            record you must accept the{' '}
            <span className={styles.checkcontent}>
              <Link to="/map/terms">Terms and Conditions</Link>
            </span>
          </p>
          <p>Good listening and have fun!</p>
          <div className={styles['new-sound-record-recaptcha-badge']}>
            This site is protected by reCAPTCHA and the Google{' '}
            <a href="https://policies.google.com/privacy">Privacy Policy</a> and{' '}
            <a href="https://policies.google.com/terms">Terms of Service</a>{' '}
            apply.
          </div>
        </div>
      </>
    </Modal>
  );
};

export default Information;
