import BuyMeACoffee from '../../UI/BuyMeACoffee';

import styles from './Donation.module.scss';

const Donation = () => {
  return (
    <>
      <div className={styles.title}>
        <p>Donation</p>
      </div>
      <div className={styles.list}>
        <p>
          All features on Warpaint Sound are free however you can support me so
          I can provide the best service and create new projects.
        </p>
        <p>
          By donating you can choose a Sound Record (write me the "soundId" from
          the url in the donation comment), which will get a premium appearance:
        </p>
        <ul>
          <li>One-time: chromium look</li>
          <li>Subscription: universe look</li>
        </ul>
        <BuyMeACoffee />
      </div>
    </>
  );
};

export default Donation;
