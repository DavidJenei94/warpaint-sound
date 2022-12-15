import React from 'react';

import Modal from '../../UI/Modal/Modal';
import CloseButton from '../../UI/CloseButton';

import styles from './ListPanel.module.scss';

interface ListPanelProps {
  children: React.ReactNode;
  onClose: () => void;
}

const ListPanel = ({ children, onClose }: ListPanelProps) => {
  return (
    <Modal
      backdrop={false}
      overlay={true}
      onClose={onClose}
      className={styles['list-panel-modal']}
    >
      <CloseButton onClose={onClose} />
      {children}
    </Modal>
  );
};

export default ListPanel;
