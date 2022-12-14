import { useNavigate } from 'react-router-dom';

import CloseButton from '../../UI/CloseButton';

import styles from './Information.module.scss';
import Modal from '../../UI/Modal/Modal';

const Information = () => {
  const navigate = useNavigate();
  
  const handlOutsideClick = () => {
    navigate("/map");
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
          <p>This page is only a hobby project...</p>
          <p>
            Where you can upload and browse the sounds of different instruments
            uploaded by others...
          </p>
          <p>No personal information is stored...</p>
        </div>
      </>
    </Modal>
  );
};

export default Information;
