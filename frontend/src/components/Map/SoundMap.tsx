import { useEffect, useState, useRef, useContext } from 'react';
import { FeatureGroup, MapContainer, TileLayer } from 'react-leaflet';
import {
  defaultSoundRecordFilter,
  SoundRecord,
  SoundRecordFilter,
} from '../../models/soundrecord.model';
import { LatLng, LatLngBounds } from 'leaflet';
import { useSearchParams } from 'react-router-dom';
import { MapQueryParams } from '../../models/map.model';
import { getQueryParams } from '../../utils/general.utils';
import FeedbackContext from '../../store/feedback-context';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { mapActions } from '../../store/map-redux';
import { fetchSoundRecordsAndCategories } from '../../service/soundRecord-api';

import Recenter from './Utils/Recenter';
import CurrentPosition from './Utils/CurrentPosition';
import SoundRecordMarker from './DataDisplay/SoundRecordMarker';
import MapPanels from './Panels/MapPanels';
import LoadingIcon from '../UI/LoadingIcon';
import MapClicker from './Utils/MapClicker';

import styles from './SoundMap.module.scss';
import 'leaflet/dist/leaflet.css';

const SoundMap = () => {
  const ctx = useContext(FeedbackContext);
  const dispatch = useAppDispatch();
  const activeSoundRecord: SoundRecord | null = useAppSelector(
    (state) => state.activeSoundRecord
  );
  const soundRecords: SoundRecord[] = useAppSelector(
    (state) => state.soundRecords
  );

  const [searchParams, setSearchParams] = useSearchParams();

  const mapRef = useRef<any>(null);
  const dataRef = useRef<any>(null);
  const [dataBounds, setDataBounds] = useState<LatLngBounds>(
    new LatLngBounds(new LatLng(-180, -90), new LatLng(180, 90))
  );

  const [isSearchParamsLoaded, setIssearchParamsLoaded] =
    useState<boolean>(false);

  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(9);

  const [soundRecordFilters, setSoundRecordFilters] =
    useState<SoundRecordFilter>(defaultSoundRecordFilter);
  const [isLoading, setIsloading] = useState<boolean>(true);

  // Fetch sound records from server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSoundRecordsAndCategories();

        dispatch(mapActions.setSoundRecords(data.soundRecords));
        dispatch(mapActions.setCategories(data.categories));

        setIsloading(false);
      } catch (error: any) {
        ctx.showMessage('Error while loading Sound Records.', 4000);
      }
    };

    fetchData();
  }, []);

  // Refresh soundId of activeSOundRecord in query params when it is selected or loaded
  useEffect(() => {
    if (isSearchParamsLoaded && soundRecords[0]) {
      setSearchParams((prevValue) => {
        const params: MapQueryParams = getQueryParams(prevValue);

        if (activeSoundRecord === null) {
          delete params.soundId;

          return { ...params };
        }

        return { ...params, soundId: activeSoundRecord.id.toString() };
      });
    }
  }, [activeSoundRecord, isSearchParamsLoaded, soundRecords]);

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

        soundRecord && dispatch(mapActions.setActiveSoundRecord(soundRecord));
      }

      // get filter params
      const searchName = searchParams.get('sInst')
        ? searchParams.get('sInst')!
        : defaultSoundRecordFilter.name;
      const searchCategory = searchParams.get('sCat')
        ? Number(searchParams.get('sCat'))!
        : defaultSoundRecordFilter.categoryId;
      const searchSubCategory = searchParams.get('sSubCat')
        ? Number(searchParams.get('sSubCat'))!
        : defaultSoundRecordFilter.subCategoryId;
      setSoundRecordFilters(() => ({
        name: searchName,
        categoryId: searchCategory,
        subCategoryId: searchSubCategory,
      }));

      setIssearchParamsLoaded(true);
    } catch (error: any) {
      ctx.showMessage('Error while reading the query params.', 4000);
    }
  }, [soundRecords]);

  // If search param is not defined, fetch and go to the user's location
  useEffect(() => {
    if (isSearchParamsLoaded && !latitude && !longitude) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        });
      }
    }
  }, [isSearchParamsLoaded]);

  // refresh databounds to fit
  useEffect(() => {
    dataRef.current && setDataBounds(dataRef.current.getBounds());
  }, [soundRecords, soundRecordFilters]);

  const center = new LatLng(latitude, longitude);

  const filteredSoundRecords = soundRecords.filter((soundRecord) => {
    const instrument = soundRecord.instrument.toLowerCase();
    const nameFilter = soundRecordFilters.name.toLowerCase();

    const nameCheck = instrument.includes(nameFilter);
    const categoryCheck =
      soundRecordFilters.categoryId !== 0
        ? soundRecordFilters.categoryId === soundRecord.categoryId
        : true;
    const subCategoryCheck =
      soundRecordFilters.subCategoryId !== 0
        ? soundRecordFilters.subCategoryId === soundRecord.subCategoryId
        : true;

    return nameCheck && categoryCheck && subCategoryCheck;
  });

  if (isLoading) {
    <LoadingIcon />;
  }

  return (
    <div className={styles.soundmap}>
      <MapContainer
        center={center}
        zoomControl={false}
        scrollWheelZoom={true}
        zoom={zoom}
        ref={mapRef}
      >
        {isSearchParamsLoaded && (
          <>
            <MapClicker />
            {latitude && longitude && (
              <Recenter lat={latitude} lng={longitude} z={zoom} />
            )}
            <CurrentPosition />
          </>
        )}

        {/* Panels and Controls */}
        <MapPanels
          filteredSoundRecords={filteredSoundRecords}
          setSoundRecordFilters={setSoundRecordFilters}
          dataBounds={dataBounds}
        />

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='Data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          maxZoom={19}
          keepBuffer={10}
        />

        <FeatureGroup ref={dataRef}>
          {filteredSoundRecords[0] &&
            filteredSoundRecords.map((record) => {
              return (
                <SoundRecordMarker
                  key={record.id}
                  record={record}
                  isActive={
                    activeSoundRecord
                      ? record.id === activeSoundRecord.id
                      : false
                  }
                />
              );
            })}
        </FeatureGroup>
      </MapContainer>
    </div>
  );
};

export default SoundMap;
