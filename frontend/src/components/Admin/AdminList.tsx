import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { FixedSizeList as List } from 'react-window';
import { useAppSelector } from '../../hooks/redux-hooks';
import { useElementDimensions } from '../../hooks/useDimensions';
import { SoundRecord } from '../../models/soundrecord.model';

import EditForm from './EditForm';
import ListElement from './ListElement';

import styles from './AdminList.module.scss';

interface AdminListProps {
  filters: { id: number; name: string };
  onChangeSoundRecord: Dispatch<SetStateAction<boolean>>;
}

const AdminList = ({ filters, onChangeSoundRecord }: AdminListProps) => {
  const soundRecords: SoundRecord[] = useAppSelector(
    (state) => state.soundRecords
  );

  const [selectedSoundRecord, setSelectedSoundRecord] =
    useState<SoundRecord | null>(null);

  const listRef = useRef<any>(null);

  const { width: listWidth, height: listHeight } =
    useElementDimensions(listRef);

  let filteredSoundRecords: SoundRecord[] = [];
  if (filters.id === 0 && filters.name === '') {
    filteredSoundRecords = soundRecords;
  } else if (filters.id !== 0) {
    filteredSoundRecords = soundRecords.filter(
      (soundRecord) => soundRecord.id === filters.id
    );
  } else if (filters.name !== '') {
    filteredSoundRecords = soundRecords.filter((soundRecord) => {
      const instrument = soundRecord.instrument.toLowerCase();
      const nameFilter = filters.name.toLowerCase();

      return instrument.includes(nameFilter);
    });
  }

  return (
    <>
      <div className={styles.list} ref={listRef}>
        {
          <List
            width={listWidth - 1} // -1 to prevent horizontal scrollbar appearance on resizing
            height={listHeight}
            itemCount={filteredSoundRecords.length}
            itemSize={35}
          >
            {(props): any => (
              <div style={props.style}>
                <ListElement
                  key={filteredSoundRecords[props.index].id}
                  soundRecord={filteredSoundRecords[props.index]}
                  onSelectRecord={setSelectedSoundRecord}
                />
              </div>
            )}
          </List>
        }
      </div>
      {selectedSoundRecord && (
        <EditForm
          soundRecord={selectedSoundRecord}
          onChangeSoundRecord={onChangeSoundRecord}
        />
      )}
    </>
  );
};

export default AdminList;
