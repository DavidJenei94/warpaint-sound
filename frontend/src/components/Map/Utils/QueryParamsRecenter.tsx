import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useMap } from 'react-leaflet';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/redux-hooks';
import {
  defaultSoundRecordFilter,
  SoundRecord,
  SoundRecordFilter,
} from '../../../models/soundrecord.model';
import FeedbackContext from '../../../store/feedback-context';
import { mapActions } from '../../../store/map-redux';

interface QueryParamsRecenterProps {
  soundRecords: SoundRecord[];
  setSoundRecordFilters: Dispatch<SetStateAction<SoundRecordFilter>>;
  isLoading: boolean;
}

// Recenter the map from URL query params
// Used once after initialization
const QueryParamsRecenter = ({
  soundRecords,
  setSoundRecordFilters,
  isLoading,
}: QueryParamsRecenterProps) => {
  const dispatch = useAppDispatch();
  const feedbackCtx = useContext(FeedbackContext);

  const [searchParams] = useSearchParams();

  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(2);

  const map = useMap();

  // Set query params on initialization after sound records are fetched
  useEffect(() => {
    if (!isLoading) {
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
          soundRecord && dispatch(mapActions.setActivatedByList(true));
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
      } catch (error: any) {
        feedbackCtx.showMessage('Error while reading the query params.', 4000);
      }
    }
  }, [soundRecords, isLoading]);

  useEffect(() => {
    if (latitude && longitude) {
      map.setView([latitude, longitude], zoom);
    }
  }, [latitude, longitude, zoom]);

  return null;
};

export default QueryParamsRecenter;
