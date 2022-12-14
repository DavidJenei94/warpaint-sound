import React from 'react';
import CloseButton from './CloseButton';

import styles from './MapForm.module.scss';
import Modal from './Modal/Modal';

interface MapFormProps {
  children: React.ReactNode;
  onOutsideClick: () => void;
  onSubmit: (event: React.FormEvent) => void;
}

const MapForm = ({ children, onOutsideClick, onSubmit }: MapFormProps) => {
  return (
    <Modal
      backdrop={true}
      overlay={true}
      onClose={onOutsideClick}
      style={{ width: '80%' }} // in the ...otherProps
    >
      <form
        className={styles.form}
        onClick={(e) => e.stopPropagation()}
        onSubmit={onSubmit}
      >
        <CloseButton onClose={onOutsideClick} />
        {children}
      </form>
    </Modal>
  );
};

export default MapForm;
