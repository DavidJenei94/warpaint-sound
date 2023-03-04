import Modal from '../Modal/Modal';
import LoadingIcon from './LoadingIcon';

import styles from './LoadingModal.module.scss';

const LoadingModal = () => {
  return (
    <Modal
      backdrop={true}
      onClose={() => {}}
      overlay={true}
      className={styles['loading-icon-modal']}
    >
      <LoadingIcon />
    </Modal>
  );
};

export default LoadingModal;
