import Modal from './Modal/Modal';

import styles from './FeedbackBar.module.scss';

interface FeedbackBarProps {
  children: React.ReactNode;
}

const FeedbackBar = ({ children }: FeedbackBarProps) => {
  return (
    <Modal
      backdrop={false}
      overlay={true}
      onClose={() => {}}
      className={styles.feedback}
    >
      {children}
    </Modal>
  );
};

export default FeedbackBar;
