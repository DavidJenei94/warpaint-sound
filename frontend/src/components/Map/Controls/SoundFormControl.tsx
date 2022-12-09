import React, { Dispatch, SetStateAction } from 'react';
import ControlButton from './ControlButton';

import addSoundIcon from '../../../assets/map-assets/add-sound-icon.png';

interface SoundFormControlProps {
  showSoundForm: Dispatch<SetStateAction<boolean>>;
}

const SoundFormControl = ({
  showSoundForm,
}: SoundFormControlProps) => {
  const toggleMenuHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    showSoundForm(true);
  };

  return (
    <ControlButton
      position="bottomleft"
      title={"Add Sound"}
    >
      <img
        src={addSoundIcon}
        width={30}
        onClick={toggleMenuHandler}
      />
    </ControlButton>
  );
};

export default SoundFormControl;
