import { Dispatch, SetStateAction } from 'react';
import { useMapEvents } from 'react-leaflet';
import { SoundRecord } from '../../../models/soundrecord.model';

interface MapClickerProps {
  setActiveMarker: Dispatch<SetStateAction<SoundRecord | null>>;
}
const MapClicker = ({ setActiveMarker }: MapClickerProps) => {
  const map = useMapEvents({
    click: () => {
      setActiveMarker(null);
    },
  });

  return null;
};

export default MapClicker;
