import { Dispatch, SetStateAction } from 'react';

import { SoundRecord } from '../../../../models/soundrecord.model';

import styles from './SoundRecordListItem.module.scss';
import universeIcon from '../../../../assets/premium-assets/universe-icon.png';
import chromiumIcon from '../../../../assets/premium-assets/chromium-icon.png';

const getLevelIcon = (level: string) => {
  switch (level) {
    case 'universe':
      return universeIcon;
    case 'chromium':
      return chromiumIcon;
    default:
      return '';
  }
};

interface SoundRecordsListItemProps {
  record: SoundRecord;
  activeMarker: SoundRecord | null;
  setActiveMarker: Dispatch<SetStateAction<SoundRecord | null>>;
  setIsTriggeredByList: Dispatch<SetStateAction<boolean>>;
}

const SoundRecordsListItem = ({
  record,
  activeMarker,
  setActiveMarker,
  setIsTriggeredByList,
}: SoundRecordsListItemProps) => {
  const showMarkerPopup = (soundRecord: SoundRecord) => {
    setIsTriggeredByList(true);
    setActiveMarker(soundRecord);
  };

  return (
    <>
      <p
        key={record.id}
        onClick={() => showMarkerPopup(record)}
        className={
          activeMarker && activeMarker.id === record.id ? styles.active : ''
        }
      >
        {`${record.instrument} (${record.subCategory})`}
        <span>
          {getLevelIcon(record.level) && (
            <img
              className={styles['level-icon']}
              key={record.id}
              src={getLevelIcon(record.level)}
              alt="Icon for a premium Sound Record"
            />
          )}
        </span>
      </p>
    </>
  );
};

export default SoundRecordsListItem;
