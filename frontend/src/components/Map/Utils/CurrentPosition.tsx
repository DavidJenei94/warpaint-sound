import { Dispatch, SetStateAction, useEffect } from 'react';
import { useMap, useMapEvents } from 'react-leaflet';
import { useSearchParams } from 'react-router-dom';
import { getQueryParams } from '../../../utils/general.utils';
import ScrollToMenuControl from '../Controls/ScrollToMenuControl';

const CurrentPosition = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const map = useMapEvents({
    moveend: () => {
      const coordinates = map.getCenter();
      const zoom = map.getZoom();

      setSearchParams((prevValue) => {
        const params = getQueryParams(prevValue);
        return {
          ...params,
          lat: coordinates.lat.toString(),
          lng: coordinates.lng.toString(),
          z: zoom.toString(),
        };
      });
    },
  });

  return null;
};

export default CurrentPosition;
