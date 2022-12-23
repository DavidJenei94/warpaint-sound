import { LatLng } from 'leaflet';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useMapEvents } from 'react-leaflet';
import { SoundRecord } from '../../../models/soundrecord.model';

import styles from './SoundRecordOnScreen.module.scss';

import {
  useWindowDimensions,
  useElementDimensions,
} from '../../../hooks/useDimensions';
import SoundRecordsListItem from './ListPanels/SoundRecordListItem';
import SoundRecordList from './ListPanels/SoundRecordList';

interface SoundRecordOnScreenProps {
  filteredSoundRecords: SoundRecord[];
  activeMarker: SoundRecord | null;
  setActiveMarker: Dispatch<SetStateAction<SoundRecord | null>>;
  setIsTriggeredByList: Dispatch<SetStateAction<boolean>>;
}

const SoundRecordOnScreen = ({
  filteredSoundRecords,
  activeMarker,
  setActiveMarker,
  setIsTriggeredByList,
}: SoundRecordOnScreenProps) => {
  const [soundRecordsOnScreen, setSoundRecordsOnScreen] = useState<
    SoundRecord[]
  >([]);

  const map = useMapEvents({
    moveend: () => {
      setSoundRecordsOnScreen(getVisibleSoundRecords());
    },
  });


  useEffect(() => {
    setSoundRecordsOnScreen(getVisibleSoundRecords());
  }, []);

  const getVisibleSoundRecords = (): SoundRecord[] => {
    const soundRecordsVisible = filteredSoundRecords.filter((soundRecord) => {
      return map
        .getBounds()
        .contains(new LatLng(soundRecord.latitude, soundRecord.longitude));
    });
    return soundRecordsVisible;
  };

  return (
    <>
      <div className={styles.title}>
        <p>Sound Records</p>
        <br />
        <p> on current screen</p>
      </div>
      <SoundRecordList
        records={soundRecordsOnScreen}
        activeMarker={activeMarker}
        setActiveMarker={setActiveMarker}
        setIsTriggeredByList={setIsTriggeredByList}
      />
    </>
  );
};

export default SoundRecordOnScreen;
