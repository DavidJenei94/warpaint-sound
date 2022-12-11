import React, { Dispatch, SetStateAction } from 'react';
import Button from './Button';

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
        <div className={styles.close}>
          <Button type="button" onClick={onOutsideClick}>
            <p>X</p>
          </Button>
        </div>
        {children}
      </form>
    </ModalRoot>
  );
};

export default MapForm;
