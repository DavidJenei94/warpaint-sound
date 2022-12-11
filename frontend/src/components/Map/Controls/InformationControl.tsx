import React, { Dispatch, SetStateAction } from 'react';
import ControlButton from './ControlButton';

import informationIcon from '../../../assets/map-assets/information-icon.png';

interface InformationControlProps {
  showInformation: Dispatch<SetStateAction<boolean>>;
}

const InformationControl = ({
  showInformation,
}: InformationControlProps) => {
  const toggleInformationHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    showInformation(true);
  };

  return (
    <ControlButton
      position="topleft"
      title={"Information"}
    >
      <img
        src={informationIcon}
        width={30}
        onClick={toggleInformationHandler}
      />
    </ControlButton>
  );
};

export default InformationControl;
