import { Dispatch, SetStateAction } from 'react';

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
    <ModalRoot onClose={handlOutsideClick}>
      <div>Information Page</div>
    </ModalRoot>
  );
};

export default Information;
