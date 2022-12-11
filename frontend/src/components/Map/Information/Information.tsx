import { Dispatch, SetStateAction } from 'react';
import CloseButton from '../../UI/CloseButton';

import ModalRoot from '../../UI/Modal/ModalRoot';

import styles from './Information.module.scss';

interface InformationProps {
  showInformation: Dispatch<SetStateAction<boolean>>;
}

const Information = ({ showInformation }: InformationProps) => {
  const handlOutsideClick = () => {
    showInformation(false);
  };

  return (
    <ModalRoot
      onClose={handlOutsideClick}
      style={{ width: '80%', height: '80%' }}
    >
      <>
        <CloseButton onClose={handlOutsideClick} />
        <div className={styles.container}>
          <h1>Warpaint Sound</h1>
          <p>This page is only a hobby project...</p>
          <p>
            Where you can upload and browse the sounds of different instruments
            uploaded by others...
          </p>
          <p>No personal information is stored...</p>
        </div>
      </>
    </ModalRoot>
  );
};

export default Information;
