import { useState } from 'react';
import { Helmet } from 'react-helmet';

import BuyMeACoffee from '../UI/BuyMeACoffee';

import styles from './About.module.scss';
import profilePicture from '../../assets/info-assets/profile-picture.jpg';
import universeImage from '../../assets/premium-assets/universe-dark-small.jpg';
import chromiumImage from '../../assets/premium-assets/chromium-dark-small.jpg';

const About = () => {
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
      <Helmet>
        <title>About - WpS</title>
        <meta
          name="description"
          content="About the creator of Warpaint Sound"
        />
        <meta
          name="keywords"
          content="Warpaint Sound, Warpaint Vision, About me"
        />
      </Helmet>
      <div className={styles['about-container']}>
        <h1>Warpaint Sound</h1>
        <p className={styles.mission}>
          My mission is to collect and make available for everyone to enjoy the
          sounds of different musical instruments around the world.
        </p>
        {profilePicture && (
          <img
            className={styles['profile-picture']}
            src={profilePicture}
            alt="Profile picture of developer"
          />
        )}
        <div className={styles['main-text']}>
          <div className={styles.profile}>
            <p>
              My name is David Jenei. I'm a developer who creates some fun
              projects in my free time under the name of Warpaint Vision.
              Besides programming, I really like playing musical instruments,
              doing sports, wild camping in the forests and playing board games.
            </p>
            <p>
              Before Warpaint Sound, I developed some{' '}
              <a
                className={styles['garmin-link']}
                href="https://apps.garmin.com/en-US/developer/2771e077-a0d7-4cd4-8e3e-b6057c853dc9/apps"
                target="_blank"
              >
                watch faces and applications
              </a>{' '}
              for Garmin watches, but this is my first published web
              application. As created only as a hobby project, you can use all
              of its features absolutely free, but any amount of donation is
              welcomed so I can provide the best service and create new
              projects.
            </p>
            <p>
              By donating, you can choose a sound record (write me the "soundId"
              from the url in the donation comment), which will get a premium
              appearance:
            </p>
            <div className={styles.donation}>
              <ul>
                <li>
                  <span
                    onClick={() => showPremiumLook('chromium')}
                    title={'Show chromium sample background.'}
                  >
                    {`One-time: (> 5€) chromium look`}
                  </span>
                </li>
                <li>
                  <span
                    onClick={() => showPremiumLook('universe')}
                    title={'Show universe sample background.'}
                  >
                    Subscription: universe look
                  </span>
                </li>
              </ul>
              {premiumSample && (
                <img
                  className={styles['premium-image']}
                  src={premiumSample}
                  onClick={hidePremiumLook}
                  alt="Premium image background"
                />
              )}

              <BuyMeACoffee />
              <p>
                If you have any questions or ideas, feel free to contact me on
                the following email address: warpaintvision@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
