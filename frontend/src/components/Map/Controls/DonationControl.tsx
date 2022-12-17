import { Dispatch, SetStateAction } from 'react';

import ControlButton from './ControlButton';

import donationIcon from '../../../assets/map-assets/donation-icon.png';

interface DonationControlProps {
  showDonation: Dispatch<SetStateAction<boolean>>;
}

const DonationControl = ({ showDonation }: DonationControlProps) => {
  const showDonationHandler = () => {
    showDonation((prevValue) => !prevValue);
  };

  return (
    <ControlButton position="topleft" title={'Donation'}>
      <img src={donationIcon} width={30} onClick={showDonationHandler} />
    </ControlButton>
  );
};

export default DonationControl;
