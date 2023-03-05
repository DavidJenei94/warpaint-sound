import { Outlet } from 'react-router-dom';
import useFeedbackHider from '../../hooks/useFeedbackHider';

import SoundMap from './SoundMap';

import styles from './Map.module.scss';

const Map = () => {
  useFeedbackHider();

  return (
    <div className={styles.map}>
      <SoundMap />

      <Outlet />
    </div>
  );
};

export default Map;
