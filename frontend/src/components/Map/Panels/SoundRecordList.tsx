import { LatLng } from 'leaflet';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useMapEvents } from 'react-leaflet';
import { SoundRecord } from '../../../models/soundrecord.model';

import styles from './SoundRecordList.module.scss';

interface SoundRecordListProps {
  filteredSoundRecords: SoundRecord[];
  activeMarker: SoundRecord | null;
  setActiveMarker: Dispatch<SetStateAction<SoundRecord | null>>;
  setIsTriggeredByList: Dispatch<SetStateAction<boolean>>;
}

const SoundRecordList = ({
  filteredSoundRecords,
  activeMarker,
  setActiveMarker,
  setIsTriggeredByList,
}: SoundRecordListProps) => {
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

  const showMarkerPopup = (soundRecord: SoundRecord) => {
    setIsTriggeredByList(true);
    setActiveMarker(soundRecord);
  };

  return (
    <>
      <div className={styles.title}>
        <p>Sound Records</p>
        <br />
        <p> on current screen</p>
      </div>
      <div className={styles.list}>
        {soundRecordsOnScreen[0] &&
          soundRecordsOnScreen.map((record) => (
            <p
              key={record.id}
              onClick={() => showMarkerPopup(record)}
              className={
                activeMarker && activeMarker.id === record.id
                  ? styles.active
                  : ''
              }
            >{`${record.instrument} (${record.subCategory})`}</p>
          ))}
      </div>
    </>
  );
};

export default SoundRecordList;
