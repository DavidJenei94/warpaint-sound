import { Dispatch, SetStateAction } from 'react';

import ControlButton from './ControlButton';

import donationIcon from '../../../assets/map-assets/donation-icon.png';

interface DonationControlProps {
  showDonation: Dispatch<SetStateAction<boolean>>;
  handleListPanelClose: (panelException: string) => void;
}

const DonationControl = ({
  showDonation,
  handleListPanelClose,
}: DonationControlProps) => {
  const showDonationHandler = () => {
    handleListPanelClose('Donation');
    showDonation((prevValue) => !prevValue);
  };

  return (
    <ControlButton title={'Donation'}>
      <img
        src={donationIcon}
        width={30}
        onClick={showDonationHandler}
        alt="Donation Control Icon"
      />
    </ControlButton>
  );
};

export default DonationControl;
