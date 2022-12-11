import { ComponentProps } from 'react';
import ReactDOM from 'react-dom';

import styles from './Modal.module.scss';

interface RootModalProps extends ComponentProps<'div'> {
  children: React.ReactNode;
  onClose: () => void;
}

const portalElement: HTMLElement = document.getElementById('overlays')!;

const ModalOverlays = ({
  children,
  onClose,
  ...otherProps
}: RootModalProps) => {
  return (
    <>
      {ReactDOM.createPortal(
        <div className={styles.backdrop} onClick={onClose}>
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
            {...otherProps}
          >
            {children}
          </div>
        </div>,
        portalElement
      )}
    </>
  );
};

export default ModalOverlays;
