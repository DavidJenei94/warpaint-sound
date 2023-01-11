import { useRef } from 'react';
import L, { LatLng } from 'leaflet';
import { Marker, useMap } from 'react-leaflet';
import { SoundRecord } from '../../../models/soundrecord.model';
import { useAppDispatch } from '../../../hooks/redux-hooks';
import { mapActions } from '../../../store/map-redux';

import SoundRecordPopup from './SoundRecordPopup';

import woodwindsPinIcon from '../../../assets/map-assets/pin-woodwind-icon.png';
import brassPinIcon from '../../../assets/map-assets/pin-brass-icon.png';
import percussionPinIcon from '../../../assets/map-assets/pin-percussion-icon.png';
import stringPinIcon from '../../../assets/map-assets/pin-string-icon.png';
import keyboardPinIcon from '../../../assets/map-assets/pin-keyboard-icon.png';

interface SoundRecordMarkerProps {
  record: SoundRecord;
}

const SoundRecordMarker = ({ record }: SoundRecordMarkerProps) => {
  const dispatch = useAppDispatch();

  const markerRef = useRef<any>(null);
  const map = useMap();

  let pinIcon: string = '';
  switch (record.categoryId) {
    case 1:
      pinIcon = woodwindsPinIcon;
      break;
    case 2:
      pinIcon = brassPinIcon;
      break;
    case 3:
      pinIcon = percussionPinIcon;
      break;
    case 4:
      pinIcon = stringPinIcon;
      break;
    case 5:
      pinIcon = keyboardPinIcon;
      break;
  }

  const openMarkerPopup = () => {
    markerRef && markerRef.current.openPopup();
  };

  return (
    <Marker
      key={record.id}
      position={new LatLng(record.latitude, record.longitude)}
      icon={
        new L.Icon({
          iconUrl: pinIcon,
          iconAnchor: new L.Point(22, 44),
          iconSize: new L.Point(44, 44),
          popupAnchor: [0, -40],
        })
      }
      draggable={false}
      autoPan={false}
      autoPanOnFocus={false}
      ref={markerRef}
      eventHandlers={{
        popupclose: (e) => {
          dispatch(mapActions.setActivatedByList(false));
          dispatch(mapActions.setActiveSoundRecord(null));

          markerRef.current && markerRef.current.setZIndexOffset(500);
        },
        popupopen: (e) => {
          dispatch(mapActions.setActiveSoundRecord(record));

          markerRef.current && markerRef.current.setZIndexOffset(1000);
          map.panTo(new LatLng(record.latitude, record.longitude));
        },
        click: (e) => {
          dispatch(mapActions.setActivatedByList(false));
          dispatch(mapActions.setActiveSoundRecord(record));
        },
      }}
    >
      <SoundRecordPopup soundRecord={record} openPopup={openMarkerPopup} />
    </Marker>
  );
};

export default SoundRecordMarker;
