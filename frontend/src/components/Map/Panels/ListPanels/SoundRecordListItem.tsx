import { useAppDispatch, useAppSelector } from '../../../../hooks/redux-hooks';
import { mapActions } from '../../../../store/map-redux';
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
}

const SoundRecordsListItem = ({ record }: SoundRecordsListItemProps) => {
  const dispatch = useAppDispatch();
  const activeSoundRecord = useAppSelector((state) => state.activeSoundRecord);

  const showMarkerPopup = (soundRecord: SoundRecord) => {
    dispatch(mapActions.setActivatedByList(true));
    dispatch(mapActions.setActiveSoundRecord(soundRecord));
  };

  return (
    <>
      <p
        key={record.id}
        onClick={() => showMarkerPopup(record)}
        className={
          activeSoundRecord && activeSoundRecord.id === record.id
            ? styles.active
            : ''
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
