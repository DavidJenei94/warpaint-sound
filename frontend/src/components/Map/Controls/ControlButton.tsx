import { ControlPosition } from 'leaflet';
import Control from 'react-leaflet-custom-control';

import styles from './ControlButton.module.scss';

interface ControlButtonProps {
  children: React.ReactNode;
  title: string;
}

const ControlButton = ({ children, title }: ControlButtonProps) => {
  return (
      <div className={styles['button-container']} title={title}>
        {children}
      </div>
  );
};

export default ControlButton;
