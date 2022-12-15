import { Dispatch, SetStateAction, useEffect, useState, useRef } from 'react';
import {
  FeatureGroup,
  LayersControl,
  MapContainer,
  Marker,
  ScaleControl,
  TileLayer,
} from 'react-leaflet';
import { SoundRecord, SoundRecordFilter } from '../../models/soundrecord.model';
import L, { LatLng } from 'leaflet';
import { useSearchParams } from 'react-router-dom';

import Recenter from './Utils/Recenter';
import CurrentPosition from './Utils/CurrentPosition';
import SoundRecordMarker from './DataDisplay/SoundRecordMarker';

import styles from './SoundMap.module.scss';
import 'leaflet/dist/leaflet.css';
import MapPanels from './Panels/MapPanels';
import { MapQueryParams } from '../../models/map.model';
import { getQueryParams } from '../../utils/general.utils';

const SoundMap = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const mapRef = useRef<any>(null);

  const [isSearchParamsLoaded, setIssearchParamsLoaded] =
    useState<boolean>(false);

  const [activeMarker, setActiveMarker] = useState<SoundRecord | null>(null);

  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(9);

  const [soundRecords, setSoundRecords] = useState<SoundRecord[]>([]);
  const [soundRecordFilters, setSoundRecordFilters] =
    useState<SoundRecordFilter>({
      name: '',
      category: 0,
      subCategory: 0,
    });

  // Fetch sound records from server
  useEffect(() => {
    const fetchSoundRecord = async () => {
      const response = await fetch(`http://localhost:8002/api/soundRecord`);
      const data = await response.json();

      setSoundRecords(data);
    };

    fetchSoundRecord();
  }, []);

  // Refresh soundId of activemarker in query params when it is selected or loaded
  useEffect(() => {
    if (isSearchParamsLoaded && soundRecords[0]) {
      setSearchParams((prevValue) => {
        const params: MapQueryParams = getQueryParams(prevValue);

        if (activeMarker === null) {
          delete params.soundId;

          return { ...params };
        }

        return { ...params, soundId: activeMarker.id.toString() };
      });
    }
  }, [activeMarker, isSearchParamsLoaded, soundRecords]);

  // Set query params on initialization
  useEffect(() => {
    try {
      setLatitude(Number(searchParams.get('lat')));
      setLongitude(Number(searchParams.get('lng')));
      Number(searchParams.get('z')) && setZoom(Number(searchParams.get('z')));

      // Open popup if soundId is defined
      const soundId = searchParams.get('soundId');
      if (soundId && soundRecords[0]) {
        const soundRecord = soundRecords.find(
          (record) => record.id.toString() === soundId
        );

        soundRecord && setActiveMarker(soundRecord);
      }

      // get filter params
      const searchName = searchParams.get('sInst');
      if (searchName) {
        setSoundRecordFilters((prevValue) => ({
          name: searchName,
          category: 0,
          subCategory: 0,
        }));
      }

      setIssearchParamsLoaded(true);
    } catch (error) {
      console.log(error);
    }
  }, [soundRecords]);

  // If search param is not defined, fetch and go to the user's location
  useEffect(() => {
    if (isSearchParamsLoaded && !latitude && !longitude) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          console.log(zoom);
        });
      }
    }
  }, [isSearchParamsLoaded]);

  const center = new LatLng(latitude, longitude);

  const filteredSoundRecords = soundRecords.filter((soundRecord) => {
    const instrument = soundRecord.instrument.toLowerCase();
    const nameFilter = soundRecordFilters.name.toLowerCase();

    return instrument.includes(nameFilter);
  });

  return (
    <div className={styles.soundmap}>
      <MapContainer
        center={center}
        zoomControl={false}
        scrollWheelZoom={true}
        zoom={zoom}
        ref={mapRef}
      >
        {/* <FitBoundsControl dataBounds={dataBounds} /> */}

        {isSearchParamsLoaded && (
          <>
            {latitude && longitude && (
              <Recenter lat={latitude} lng={longitude} z={zoom} />
            )}
            <CurrentPosition />
          </>
        )}

        {/* Panels and Controls */}
        <MapPanels
          setSoundRecords={setSoundRecords}
          filteredSoundRecords={filteredSoundRecords}
          setSoundRecordFilters={setSoundRecordFilters}
          activeMarker={activeMarker}
          setActiveMarker={setActiveMarker}
        />

        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OSM Streets">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='Data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              maxZoom={19}
              keepBuffer={10}
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        <FeatureGroup>
          {filteredSoundRecords[0] &&
            filteredSoundRecords.map((record) => {
              return (
                <SoundRecordMarker
                  key={record.id}
                  record={record}
                  isActive={
                    activeMarker ? record.id === activeMarker.id : false
                  }
                  setActiveMarker={setActiveMarker}
                />
              );
            })}
        </FeatureGroup>
      </MapContainer>
    </div>
  );
};

export default SoundMap;
