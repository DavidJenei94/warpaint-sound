import { useAppDispatch, useAppSelector } from '../../../../hooks/redux-hooks';
import { mapActions } from '../../../../store/map-redux';
import { SoundRecord } from '../../../../models/soundrecord.model';

import styles from './SoundRecordListItem.module.scss';
import { MapQueryParams } from '../../../../models/map.model';
import { getQueryParams } from '../../../../utils/general.utils';
import { useSearchParams } from 'react-router-dom';
import { getLevelIcon } from '../../../../utils/level.style.utils';

interface SoundRecordsListItemProps {
  record: SoundRecord;
}

const SoundRecordsListItem = ({ record }: SoundRecordsListItemProps) => {
  const dispatch = useAppDispatch();
  const activeSoundRecord = useAppSelector((state) => state.activeSoundRecord);

  const [, setSearchParams] = useSearchParams();

  // Activated by list is handled differently
  // (Zoom is changed in Popup component)
  const showMarkerPopup = (soundRecord: SoundRecord) => {
    dispatch(mapActions.setActivatedByList(true));
    dispatch(mapActions.setActiveSoundRecord(soundRecord));

    setSearchParams((prevValue) => {
      const params: MapQueryParams = getQueryParams(prevValue);

      if (soundRecord === null) {
        delete params.soundId;

        return { ...params };
      }

      return { ...params, soundId: soundRecord.id.toString() };
    });
  };

  const itemText = `${record.instrument} (${record.subCategory})`;
  const itemBaseClass =
    itemText.length > 50 ? `${styles.item} ${styles.mini}` : `${styles.item}`;

  return (
    <>
      <p
        key={record.id}
        onClick={() => showMarkerPopup(record)}
        className={
          activeSoundRecord && activeSoundRecord.id === record.id
            ? `${itemBaseClass} ${styles.active}`
            : `${itemBaseClass}`
        }
        title={itemText}
      >
        {itemText}
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
