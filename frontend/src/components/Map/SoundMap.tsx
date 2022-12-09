import { Dispatch, SetStateAction, useEffect } from 'react';
import {
  FeatureGroup,
  LayersControl,
  MapContainer,
  Marker,
  ScaleControl,
  TileLayer,
} from 'react-leaflet';
import { SoundRecord } from '../../models/soundrecord.model';
import L, { LatLng } from 'leaflet';

import ScrollToMenuControl from './Controls/ScrollToMenuControl';
import SearchFormControl from './Controls/SearchFormControl';
import SoundFormControl from './Controls/SoundFormControl';

import styles from './SoundMap.module.scss';
import 'leaflet/dist/leaflet.css';
import soundRecordIcon from '../../assets/map-assets/sound-record-icon.png';

interface SoundMapProps {
  toggleSearchForm: Dispatch<SetStateAction<boolean>>;
  toggleSoundForm: Dispatch<SetStateAction<boolean>>;
  soundRecords: SoundRecord[];
}

const SoundMap = ({
  toggleSearchForm,
  toggleSoundForm,
  soundRecords,
}: SoundMapProps) => {
  // SAVE THIS INTO VARIABLE TO MAP GO TO POSITION !!!!!!
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
      });
    }
  }, []);

  return (
    <div className={styles.soundmap}>
      <MapContainer
        center={[46.22406960789375, 20.672510248317746]}
        zoomControl={false}
        scrollWheelZoom={true}
        zoom={9}
      >
        {/* <FitBoundsControl dataBounds={dataBounds} /> */}

        <ScrollToMenuControl />
        <SearchFormControl showSearchForm={toggleSearchForm} />
        <SoundFormControl showSoundForm={toggleSoundForm} />
        <ScaleControl position="bottomright" />

        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OSM Streets">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='Data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              maxZoom={19}
              keepBuffer={50}
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        <FeatureGroup>
          {soundRecords[0] &&
            soundRecords.map((record, index) => {
              return (
                <Marker
                  // This key is enough as there can't be 2 node placed on each other
                  key={record.id}
                  position={
                    new LatLng(record.coordinates[0], record.coordinates[1])
                  }
                  icon={
                    new L.Icon({
                      iconUrl: soundRecordIcon,
                    })
                  }
                  draggable={false}
                  autoPan={true}
                ></Marker>
              );
            })}
        </FeatureGroup>
      </MapContainer>
    </div>
  );
};

export default SoundMap;
