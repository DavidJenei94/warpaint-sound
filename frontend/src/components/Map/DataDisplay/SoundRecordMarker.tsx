import { useEffect, useRef } from 'react';
import L, { LatLng } from 'leaflet';
import { Marker, useMap } from 'react-leaflet';
import { SoundRecord } from '../../../models/soundrecord.model';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { mapActions } from '../../../store/map-redux';

import SoundRecordPopup from './SoundRecordPopup';

import woodwindsPinIcon from '../../../assets/map-assets/pin-woodwind-icon.png';
import brassPinIcon from '../../../assets/map-assets/pin-brass-icon.png';
import percussionPinIcon from '../../../assets/map-assets/pin-percussion-icon.png';
import stringPinIcon from '../../../assets/map-assets/pin-string-icon.png';
import keyboardPinIcon from '../../../assets/map-assets/pin-keyboard-icon.png';

interface SoundRecordMarkerProps {
  record: SoundRecord;
  isActive: boolean;
}

const SoundRecordMarker = ({ record, isActive }: SoundRecordMarkerProps) => {
  const dispatch = useAppDispatch();
  const activedtedByList: boolean = useAppSelector(
    (state) => state.activatedByList
  );

  const markerRef = useRef<any>(null);
  const map = useMap();

  useEffect(() => {}, [isActive]);

  // Trigger panTo and openpopup when selected from list (like search)
  // Send other popups back (popupclose is not triggered on markers rendered after the current marker)
  useEffect(() => {
    if (isActive) {
      map.panTo(new LatLng(record.latitude, record.longitude));

      const marker = markerRef.current;
      marker && marker.openPopup();
    }
    if (!isActive) {
      markerRef.current.setZIndexOffset(500);
    }
  }, [isActive]);

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
      autoPan={true}
      ref={markerRef}
      eventHandlers={{
        popupclose: (e) => {
          if (!activedtedByList) {
            dispatch(mapActions.setActiveSoundRecord(null));
          }
        },
        popupopen: (e) => {
          markerRef.current.setZIndexOffset(1000);
        },
        click: (e) => {
          dispatch(mapActions.setActivatedByList(false));
          dispatch(mapActions.setActiveSoundRecord(record));
        },
      }}
    >
      <SoundRecordPopup soundRecord={record} />
    </Marker>
  );
};

export default SoundRecordMarker;
