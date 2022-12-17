import React, { Dispatch, SetStateAction } from 'react';

import ControlButton from './ControlButton';

import soundRecordsListIcon from '../../../assets/map-assets/list-icon.png';

interface SoundRecordListControlProps {
  showSoundRecordList: Dispatch<SetStateAction<boolean>>;
  handleListPanelClose: (panelException: string) => void;
}

const SoundRecordListControl = ({
  showSoundRecordList,
  handleListPanelClose,
}: SoundRecordListControlProps) => {
  const toggleMenuHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    handleListPanelClose('SoundRecordList');
    showSoundRecordList((prevValue) => !prevValue);
  };

  return (
    <ControlButton position="topleft" title={'List visible Sound Records'}>
      <img src={soundRecordsListIcon} width={30} onClick={toggleMenuHandler} />
    </ControlButton>
  );
};

export default SoundRecordListControl;
