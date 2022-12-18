import BuyMeACoffee from '../UI/BuyMeACoffee';

import styles from './About.module.scss';

const About = () => {
  return (
    <div className={styles['about-container']}>
      <h1>Warpaint Sound</h1>
      <p>
        My mission is to collect and make available for everyone to enjoy the
        sounds of different musical instruments around the world.
      </p>
      <p>
        My name is David Jenei. I'm a developer who creates some fun projects in
        my free time under the name of Warpaint Vision. Besides programming I
        really like playing musical instruments, doing any kind of sports, wild
        camping in the forests and playing board games.
      </p>
      <p>
        Before Warpaint Sound I developed some{' '}
        <a
          className={styles['garmin-link']}
          href="https://apps.garmin.com/en-US/developer/2771e077-a0d7-4cd4-8e3e-b6057c853dc9/apps"
          target="_blank"
        >
          watch faces and applications
        </a>{' '}
        for Garmin watches, but This is my first published web application. As
        created only as a hobby project, you can use all of its features
        absolutely free, but any amount of donation is welcomed so I can provide
        the best service and create new projects.
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
      <p>
        If you have any questions or ideas, feel free to contact me on the
        following email address: warpaintvision@gmail.com
      </p>
    </div>
  );
};

export default About;
