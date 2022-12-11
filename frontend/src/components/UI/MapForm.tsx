import React, { Dispatch, SetStateAction } from 'react';
import Button from './Button';
import CloseButton from './CloseButton';

import styles from './MapForm.module.scss';
import ModalRoot from './Modal/ModalRoot';

interface MapFormProps {
  children: React.ReactNode;
  onOutsideClick: () => void;
  onSubmit: (event: React.FormEvent) => void;
}

const MapForm = ({ children, onOutsideClick, onSubmit }: MapFormProps) => {
  return (
    <ModalRoot onClose={onOutsideClick} style={{width: "80%"}}>
      <form
        className={styles.form}
        onClick={(e) => e.stopPropagation()}
        onSubmit={onSubmit}
      >
        <CloseButton onClose={onOutsideClick} />
        {children}
      </form>
    </ModalRoot>
  );
};

export default MapForm;
