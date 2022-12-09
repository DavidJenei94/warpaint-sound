import React, { Dispatch, SetStateAction } from 'react';
import Button from './Button';

import styles from './MapForm.module.scss';

interface MapFormProps {
  children: React.ReactNode;
  onOutsideClick: () => void;
  onSubmit: (event: React.FormEvent) => void;
}

const MapForm = ({ children, onOutsideClick, onSubmit }: MapFormProps) => {
  return (
    <div className={styles['form-container']} onClick={onOutsideClick}>
      <form onClick={(e) => e.stopPropagation()} onSubmit={onSubmit}>
        <div className={styles.close}>
          <Button type="button" onClick={onOutsideClick}>
            <p>X</p>
          </Button>
        </div>
        {children}
      </form>
    </div>
  );
};

export default MapForm;
