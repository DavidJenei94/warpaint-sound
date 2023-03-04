import { useState } from 'react';

import BuyMeACoffee from '../../UI/BuyMeACoffee';

import styles from './Donation.module.scss';
import universeImage from '../../../assets/premium-assets/universe-dark-small.jpg';
import chromiumImage from '../../../assets/premium-assets/chromium-dark-small.jpg';

const Donation = () => {
  const [premiumSample, setPremiumSample] = useState<string>('');

  const showPremiumLook = (level: string) => {
    switch (level) {
      case 'chromium':
        setPremiumSample(chromiumImage);
        break;
      case 'universe':
        setPremiumSample(universeImage);
        break;
    }
  };

  const hidePremiumLook = () => {
    setPremiumSample('');
  };

  return (
    <>
      <div className={styles.title}>
        <p>Donation</p>
      </div>
      <div className={styles.list}>
        <p>
          All features on Warpaint Sound are free. However, you can support me
          so I can provide the best service and create new projects.
        </p>
        <p>
          By donating, you can choose a sound record (write me the "soundId"
          from the url in the donation comment), which will get a premium
          appearance:
        </p>
        <ul>
          <li
            onClick={() => {
              showPremiumLook('chromium');
            }}
          >
            {`One-time (> 5€): chromium look`}
          </li>
          <li
            onClick={() => {
              showPremiumLook('universe');
            }}
          >
            Subscription: universe look
          </li>
        </ul>
        {premiumSample && (
          <img
            className={styles['premium-image']}
            src={premiumSample}
            onClick={hidePremiumLook}
            alt="Premium Sound Record Layout sample look"
          />
        )}
        <BuyMeACoffee />
      </div>
    </>
  );
};

export default Donation;
