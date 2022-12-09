import { Dispatch, SetStateAction } from 'react';
import {
  LayersControl,
  MapContainer,
  ScaleControl,
  TileLayer,
} from 'react-leaflet';

import styles from './SoundMap.module.scss';
import 'leaflet/dist/leaflet.css';
import SearchForm from './SearchForm';
import ScrollToMenuControl from './Controls/ScrollToMenuControl';
import SearchFormControl from './Controls/SearchFormControl';
import SoundFormControl from './Controls/SoundFormControl';

interface SoundMapProps {
  toggleSearchForm: Dispatch<SetStateAction<boolean>>;
  toggleSoundForm: Dispatch<SetStateAction<boolean>>;
}

const SoundMap = ({ toggleSearchForm, toggleSoundForm }: SoundMapProps) => {
  return (
    <div className={styles.soundmap}>
      <MapContainer
        center={[46.22406960789375, 20.672510248317746]}
        zoom={9}
        scrollWheelZoom={true}
      >
        {/* <FitBoundsControl dataBounds={dataBounds} /> */}

        <SearchFormControl showSearchForm={toggleSearchForm} />
        <ScrollToMenuControl />
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
      </MapContainer>
    </div>
  );
};

export default SoundMap;
