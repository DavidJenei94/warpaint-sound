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
import { backendUrl, getQueryParams } from '../../utils/general.utils';
import FeedbackContext from '../../store/feedback-context';
import { Categories } from '../../models/category.model';

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
  const [searchParams, setSearchParams] = useSearchParams();

  const mapRef = useRef<any>(null);
  const dataRef = useRef<any>(null);
  const [dataBounds, setDataBounds] = useState<LatLngBounds>(
    new LatLngBounds(new LatLng(-180, -90), new LatLng(180, 90))
  );

  const [isSearchParamsLoaded, setIssearchParamsLoaded] =
    useState<boolean>(false);

  const [activeMarker, setActiveMarker] = useState<SoundRecord | null>(null);
  const [isTriggeredByList, setIsTriggeredByList] = useState<boolean>(false);

  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(9);

  const [soundRecords, setSoundRecords] = useState<SoundRecord[]>([]);
  const [soundRecordFilters, setSoundRecordFilters] =
    useState<SoundRecordFilter>(defaultSoundRecordFilter);
  const [categories, setCategories] = useState<Categories>({
    categories: [],
    subCategories: [],
  });
  const [isLoading, setIsloading] = useState<boolean>(true);

  // Fetch sound records from server
  useEffect(() => {
    const fetchSoundRecordAndCategories = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/soundRecord`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setSoundRecords(data);

        const categoryResponse = await fetch(`${backendUrl}/api/category`);
        const categoryData = await categoryResponse.json();

        if (!response.ok) {
          throw new Error(categoryData.message);
        }

        setCategories(categoryData);

        setIsloading(false);
      } catch (error) {
        ctx.showMessage('Error while loading Sound Records.', 4000);
      }
    };

    fetchSoundRecordAndCategories();
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
            <MapClicker setActiveMarker={setActiveMarker} />
            {latitude && longitude && (
              <Recenter lat={latitude} lng={longitude} z={zoom} />
            )}
            <CurrentPosition />
          </>
        )}

        {/* Panels and Controls */}
        <MapPanels
          setSoundRecords={setSoundRecords}
          categories={categories}
          filteredSoundRecords={filteredSoundRecords}
          setSoundRecordFilters={setSoundRecordFilters}
          activeMarker={activeMarker}
          setActiveMarker={setActiveMarker}
          setIsTriggeredByList={setIsTriggeredByList}
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
                    activeMarker ? record.id === activeMarker.id : false
                  }
                  setActiveMarker={setActiveMarker}
                  isTriggeredByList={isTriggeredByList}
                  setIsTriggeredByList={setIsTriggeredByList}
                />
              );
            })}
        </FeatureGroup>
      </MapContainer>
    </div>
  );
};

export default SoundMap;
