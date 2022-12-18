import { Link, useNavigate } from 'react-router-dom';

import CloseButton from '../../UI/CloseButton';

import styles from './Information.module.scss';
import Modal from '../../UI/Modal/Modal';

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
          <p>
            This application is only a hobby project and its purpose is to
            provide some information about different musical instruments and to make
            joy.
          </p>
          <p>
            You can upload Sound Records of your instruments at your current
            location (most accurate by phone's GPS) and browse the sounds of the
            ones uploaded by others.
          </p>
          <p>
            You are able to search by name or category and list the sound
            records on current view.
          </p>
          <p>
            No personal information is stored however by uploading a Sound
            Record You must accept the{' '}
            <span className={styles.checkcontent}>
              <Link to="/map/terms">Terms and Conditions</Link>
            </span>
          </p>
          <p>Good browsing and have fun!</p>
        </div>
      </>
    </Modal>
  );
};

export default Information;
