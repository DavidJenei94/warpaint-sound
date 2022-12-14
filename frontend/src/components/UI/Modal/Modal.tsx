import { ComponentProps } from 'react';
import ReactDOM from 'react-dom';
import Backdrop from './Backdrop';

import styles from './Modal.module.scss';

interface ModalProps extends ComponentProps<'div'> {
  children: React.ReactNode;
  backdrop: boolean;
  overlay: boolean;
  onClose: () => void;
}

const portalElement: HTMLElement = document.getElementById('overlays')!;

const Modal = ({
  children,
  backdrop,
  overlay,
  onClose,
  ...otherProps
}: ModalProps) => {
  const returnElement = overlay ? (
    <>
      {ReactDOM.createPortal(
        <>
          {backdrop && <Backdrop onClose={onClose} />}
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
            {...otherProps}
          >
            {children}
          </div>
        </>,
        portalElement
      )}
    </>
  ) : (
    <>
      {backdrop && <Backdrop onClose={onClose} />}
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        {...otherProps}
      >
        {children}
      </div>
    </>
  );

  return returnElement;
};

export default Modal;
