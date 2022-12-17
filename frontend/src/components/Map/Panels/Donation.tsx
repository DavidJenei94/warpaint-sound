import { Dispatch, SetStateAction } from 'react';
import BuyMeACoffee from '../../UI/BuyMeACoffee';

import ListPanel from '../../UI/Map/ListPanel';

import styles from './Donation.module.scss';

interface DonationProps {
  showDonation: Dispatch<SetStateAction<boolean>>;
}

const Donation = ({ showDonation }: DonationProps) => {
  const handleClose = () => {
    showDonation(false);
  };

  return (
    <ListPanel onClose={handleClose}>
      <>
        <div className={styles.title}>
          <p>Donation</p>
        </div>
        <div className={styles.list}>
          <p>
            All features on Warpaint Sound are free however you can
            support me so I can provide the best service and create new
            projects.
          </p>
          <p>
            By donating you can choose a Sound Record, which will get a
            premium appearance:
          </p>
          <ul>
            <li>One-time: chromium look</li>
            <li>Subscription: universe look</li>
          </ul>
          <BuyMeACoffee />
        </div>
      </>
    </ListPanel>
  );
};

export default Donation;
