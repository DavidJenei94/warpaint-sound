import 'leaflet/dist/leaflet.css';
import { FeatureGroup, MapContainer, TileLayer } from 'react-leaflet';
import MapPanels from './Panels/MapPanels';
import { useContext, useEffect, useRef, useState } from 'react';
import {
  defaultSoundRecordFilter,
  SoundRecord,
  SoundRecordFilter,
} from '../../models/soundrecord.model';
import { LatLng, LatLngBounds } from 'leaflet';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import FeedbackContext from '../../store/feedback-context';
import { mapActions } from '../../store/map-redux';
import { fetchSoundRecordsAndCategories } from '../../service/soundRecord-api';
import MarkerClusterGroup from 'react-leaflet-cluster';

import LoadingIcon from '../UI/LoadingIcon';
import SoundRecordMarker from './DataDisplay/SoundRecordMarker';
import QueryParamsRecenter from './Utils/QueryParamsRecenter';
import MoveAndClick from './Utils/MoveAndClick';

import styles from './SoundMap.module.scss';

const SoundMap = () => {
  const feedbackCtx = useContext(FeedbackContext);
  const dispatch = useAppDispatch();

  const soundRecords: SoundRecord[] = useAppSelector(
    (state) => state.soundRecords
  );

  const [soundRecordFilters, setSoundRecordFilters] =
    useState<SoundRecordFilter>(defaultSoundRecordFilter);
  const [isLoading, setIsloading] = useState<boolean>(true);

  const dataRef = useRef<any>(null);
  const [dataBounds, setDataBounds] = useState<LatLngBounds>(
    new LatLngBounds(new LatLng(-180, -90), new LatLng(180, 90))
  );

  // Fetch sound records from server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSoundRecordsAndCategories();

        dispatch(mapActions.setSoundRecords(data.soundRecords));
        dispatch(mapActions.setCategories(data.categories));

        setIsloading(false);
      } catch (error: any) {
        feedbackCtx.showMessage('Error while loading Sound Records.', 4000);
      }
    };

    fetchData();
  }, []);

  // refresh databounds to fit
  useEffect(() => {
    dataRef.current && setDataBounds(dataRef.current.getBounds());
  }, [soundRecords, soundRecordFilters]);

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
    return <LoadingIcon />;
  }

  return (
    <div className={styles.soundmap}>
      <MapContainer
        center={[0, 0]}
        zoomControl={false}
        scrollWheelZoom={true}
        zoom={2}
        maxZoom={19}
      >
        {/* Handle moves and clicks for query params */}
        <MoveAndClick />
        {/* Read query params and Recenter map after init */}
        <QueryParamsRecenter
          soundRecords={soundRecords}
          isLoading={isLoading}
          setSoundRecordFilters={setSoundRecordFilters}
        />

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
          keepBuffer={8}
        />

        <FeatureGroup ref={dataRef}>
          <MarkerClusterGroup
            chunkedLoading
            disableClusteringAtZoom={18}
            removeOutsideVisibleBounds={true}
            showCoverageOnHover={false}
          >
            {filteredSoundRecords[0] &&
              filteredSoundRecords.map((record) => {
                return <SoundRecordMarker key={record.id} record={record} />;
              })}
          </MarkerClusterGroup>
        </FeatureGroup>
      </MapContainer>
    </div>
  );
};

export default SoundMap;
