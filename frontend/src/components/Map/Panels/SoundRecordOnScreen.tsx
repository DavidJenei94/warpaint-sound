import { LatLng } from 'leaflet';
import { useEffect, useState } from 'react';
import { useMapEvents } from 'react-leaflet';
import { SoundRecord } from '../../../models/soundrecord.model';

import styles from './SoundRecordOnScreen.module.scss';

import SoundRecordList from './ListPanels/SoundRecordList';

interface SoundRecordOnScreenProps {
  filteredSoundRecords: SoundRecord[];
}

const SoundRecordOnScreen = ({
  filteredSoundRecords,
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
      <SoundRecordList records={soundRecordsOnScreen} />
    </>
  );
};

export default SoundRecordOnScreen;
