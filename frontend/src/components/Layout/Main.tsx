import React, { Dispatch, SetStateAction } from 'react';

import styles from './Main.module.scss';

interface MainProps {
  children: React.ReactNode;
}

const Main = ({ children }: MainProps) => {
  return <div className={styles.main}>{children}</div>;
};

export default Main;
