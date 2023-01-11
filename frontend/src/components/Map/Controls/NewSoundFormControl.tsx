import React, { Dispatch, SetStateAction } from 'react';
import ControlButton from './ControlButton';

import addSoundIcon from '../../../assets/map-assets/add-sound-icon.png';
import Control from 'react-leaflet-custom-control';

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
    <Control position={'bottomleft'}>
      <ControlButton title={'Add Sound Record'}>
        <img
          src={addSoundIcon}
          width={30}
          onClick={toggleMenuHandler}
          alt="Add sound record icon"
        />
      </ControlButton>
    </Control>
  );
};

export default NewSoundFormControl;
