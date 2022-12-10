import React from 'react';
import ReactDOM from 'react-dom';

import Backdrop from './Backdrop';

import styles from './Modal.module.scss';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const portalElement: HTMLElement = document.getElementById('overlays')!;

const Modal = ({ children, onClose }: ModalProps) => {
  return (
    <>
      {ReactDOM.createPortal(
        <>
          <Backdrop onClose={onClose} />
          <div className={styles.modal}>
            <div className={styles.content}>{children} </div>
          </div>
        </>,
        portalElement
      )}
    </>
  );
};

export default Modal;
