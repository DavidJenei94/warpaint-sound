import { useMapEvents } from 'react-leaflet';
import { useAppDispatch } from '../../../hooks/redux-hooks';
import { mapActions } from '../../../store/map-redux';

const MapClicker = () => {
  const dispatch = useAppDispatch();

  const map = useMapEvents({
    click: () => {
      dispatch(mapActions.setActiveSoundRecord(null));
    },
  });

  return null;
};

export default MapClicker;
