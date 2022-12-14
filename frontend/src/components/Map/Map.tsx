import { Outlet } from 'react-router-dom';

import SoundMap from './SoundMap';

import styles from './Map.module.scss';

const Map = () => {
  return (
    <div className={styles.map}>
      <SoundMap />

      <Outlet />
    </div>
  );
};

export default Map;
