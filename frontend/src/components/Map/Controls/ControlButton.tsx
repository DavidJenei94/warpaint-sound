import { ControlPosition } from 'leaflet';
import Control from 'react-leaflet-custom-control';

import styles from './ControlButton.module.scss';

interface ControlButtonProps {
  children: React.ReactNode;
  position: ControlPosition;
  title: string;
}

const ControlButton = ({ children, position, title }: ControlButtonProps) => {
  return (
    <Control position={position}>
      <div className={styles['button-container']} title={title}>
        {children}
      </div>
    </Control>
  );
};

export default ControlButton;
