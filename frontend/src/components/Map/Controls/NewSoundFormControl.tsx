import React, { Dispatch, SetStateAction } from 'react';
import ControlButton from './ControlButton';

import addSoundIcon from '../../../assets/map-assets/add-sound-icon.png';

interface NewSoundFormControlProps {
  showNewSoundForm: Dispatch<SetStateAction<boolean>>;
}

const NewSoundFormControl = ({
  showNewSoundForm,
}: NewSoundFormControlProps) => {
  const toggleMenuHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    showNewSoundForm(true);
  };

  return (
    <ControlButton position="bottomleft" title={'Add Sound'}>
      <img src={addSoundIcon} width={30} onClick={toggleMenuHandler} />
    </ControlButton>
  );
};

export default NewSoundFormControl;
