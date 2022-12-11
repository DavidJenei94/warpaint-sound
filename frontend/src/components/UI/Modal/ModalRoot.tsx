import { ComponentProps } from 'react';

import styles from './Modal.module.scss';

interface RootModalProps extends ComponentProps<'div'> {
  children: React.ReactNode;
  onClose: () => void;
}

const ModalRoot = ({ children, onClose, ...otherProps }: RootModalProps) => {
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        {...otherProps}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalRoot;
