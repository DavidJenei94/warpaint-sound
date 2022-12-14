import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

interface Recenter {
  lat: number;
  lng: number;
  z: number;
}

const Recenter = ({ lat, lng, z }: Recenter) => {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lng], z);
  }, [lat, lng, z]);

  return null;
};

export default Recenter;
