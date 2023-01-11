import { LatLng } from 'leaflet';
import { useEffect, useState } from 'react';
import { useMapEvents } from 'react-leaflet';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { MapQueryParams } from '../../../models/map.model';
import { SoundRecord } from '../../../models/soundrecord.model';
import { mapActions } from '../../../store/map-redux';
import { getQueryParams } from '../../../utils/general.utils';

// Adjust lat, lng, z in query params
// and handles click on map and on marker for query formas
const MoveAndClick = () => {
  const dispatch = useAppDispatch();

  const activeSoundRecord: SoundRecord | null = useAppSelector(
    (state) => state.activeSoundRecord
  );

  const [, setSearchParams] = useSearchParams();

  const [moveEnded, setMoveEnded] = useState<boolean>(false);
  const [lastActiveSoundRecord, setLastActiveSoundRecord] =
    useState<SoundRecord | null>(null);

  const map = useMapEvents({
    // Set to null the active Sound record when clicked on map
    // Which closes the popup
    click: () => {
      dispatch(mapActions.setActiveSoundRecord(null));
    },
    moveend: () => {
      setMoveEnded(false);
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

      setMoveEnded(true);
    },
  });

  // Refresh soundId of activeSoundRecord in query params when it is selected or loaded
  useEffect(() => {
    if (activeSoundRecord === null) {
      // activated when clicked away from a sound record
      setSearchParams((prevValue) => {
        const params: MapQueryParams = getQueryParams(prevValue);
        delete params.soundId;

        return { ...params };
      });
    } else {
      if (moveEnded) {
        // Do not activate panTo if it was the last Sound Record
        // So it does not go back when dragging on map
        if (
          activeSoundRecord &&
          lastActiveSoundRecord &&
          activeSoundRecord.id === lastActiveSoundRecord.id
        ) {
          map.panTo(
            new LatLng(activeSoundRecord.latitude, activeSoundRecord.longitude)
          );

          setLastActiveSoundRecord(activeSoundRecord);
        }

        setSearchParams((prevValue) => {
          const params: MapQueryParams = getQueryParams(prevValue);

          return { ...params, soundId: activeSoundRecord.id.toString() };
        });
      }
    }

    setMoveEnded(false);
  }, [activeSoundRecord, moveEnded]);

  return null;
};

export default MoveAndClick;
