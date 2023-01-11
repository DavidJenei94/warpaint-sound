import { LatLngBounds } from 'leaflet';
import { useMap } from 'react-leaflet';
import ControlButton from './ControlButton';

import boundDataIcon from '../../../assets/map-assets/databound-icon.png';

interface FitBoundsControlProps {
  dataBounds: LatLngBounds;
}

const FitBoundsControl = ({ dataBounds }: FitBoundsControlProps) => {
  const map = useMap();

  const fitDataToBounds = () => {
    if (dataBounds.isValid()) map.fitBounds(dataBounds);
  };

  return (
    <ControlButton title="Fit Map to Sound Records">
      <img
        src={boundDataIcon}
        width={30}
        onClick={fitDataToBounds}
        alt="Fit map to sound records icon"
      />
    </ControlButton>
  );
};

export default FitBoundsControl;
