import { Dispatch, SetStateAction } from 'react';
import { SoundRecord } from '../../models/soundrecord.model';

import styles from './ListElement.module.scss';

interface ListElementProps {
  soundRecord: SoundRecord;
  onSelectRecord: Dispatch<SetStateAction<SoundRecord | null>>;
}
const ListElement = ({ soundRecord, onSelectRecord }: ListElementProps) => {
  const editHandler = () => {
    onSelectRecord(soundRecord);
  };

  return (
    <div className={styles.container}>
      <div className={styles.element} onClick={editHandler}>
        <p className={styles.id}>{soundRecord.id}</p>
        <p className={styles.name}>{soundRecord.instrument}</p>
      </div>
    </div>
  );
};

export default ListElement;
