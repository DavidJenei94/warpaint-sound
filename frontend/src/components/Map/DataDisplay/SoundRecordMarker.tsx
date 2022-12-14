import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import L, { LatLng } from 'leaflet';
import { Marker, useMap } from 'react-leaflet';
import { SoundRecord } from '../../../models/soundrecord.model';

import SoundRecordPopup from './SoundRecordPopup';

import soundRecordPinIcon from '../../../assets/map-assets/pin-small-icon.png';

interface SoundRecordMarkerProps {
  record: SoundRecord;
  isActive: boolean;
  setActiveMarker: Dispatch<SetStateAction<SoundRecord | null>>;
}

const SoundRecordMarker = ({
  record,
  isActive,
  setActiveMarker,
}: SoundRecordMarkerProps) => {
  const map = useMap();
  const markerRef = useRef<any>(null);

  // Trigger panto and openpopup when selected from list (like search)
  useEffect(() => {
    if (isActive) {
      map.panTo(new LatLng(record.latitude, record.longitude));

      const marker = markerRef.current;
      marker && marker.openPopup();
    }
  }, [isActive]);

  return (
    <Marker
      key={record.id}
      position={new LatLng(record.latitude, record.longitude)}
      icon={
        new L.Icon({
          iconUrl: soundRecordPinIcon,
          iconAnchor: new L.Point(20, 40),
          iconSize: new L.Point(40, 40),
          popupAnchor: [0, -35],
        })
      }
      draggable={false}
      autoPan={true}
      ref={markerRef}
      eventHandlers={{
        popupclose: (e) => {
          setActiveMarker(null);
        },
        click: (e) => {
          setActiveMarker(record);
        },
      }}
    >
      <SoundRecordPopup soundRecordId={record.id} />
    </Marker>
  );
};

export default SoundRecordMarker;
