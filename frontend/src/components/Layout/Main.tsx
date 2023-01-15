import React from 'react';

import styles from './Main.module.scss';

interface MainProps {
  children: React.ReactNode;
}

const Main = ({ children }: MainProps) => {
  return (
    <div className={styles.main}>
      {children}
      <div className={styles["reCaptcha-badge"]} id={'reCaptcha-badge'}></div>
    </div>
  );
};

export default Main;
