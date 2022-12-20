import { useNavigate } from 'react-router-dom';

import ControlButton from './ControlButton';

import informationIcon from '../../../assets/map-assets/information-icon.png';

const InformationControl = () => {
  const navigate = useNavigate();

  const showInformationHandler = () => {
    navigate('information');
  };

  return (
    <ControlButton position="topleft" title={'Information'}>
      <img
        src={informationIcon}
        width={30}
        onClick={showInformationHandler}
        alt="Information control icon"
      />
    </ControlButton>
  );
};

export default InformationControl;
