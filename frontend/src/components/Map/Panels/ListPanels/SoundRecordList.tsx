import { useRef } from 'react';
import { FixedSizeList as List } from 'react-window';
import { useElementDimensions } from '../../../../hooks/useDimensions';
import { SoundRecord } from '../../../../models/soundrecord.model';

import SoundRecordsListItem from './SoundRecordListItem';

import styles from './SoundRecordList.module.scss';

interface SoundRecordListProps {
  records: SoundRecord[];
}

const SoundRecordList = ({ records }: SoundRecordListProps) => {
  const listRef = useRef<any>(null);

  const { width: listWidth, height: listHeight } = useElementDimensions(listRef);

  return (
    <div className={styles.list} ref={listRef}>
      <List
        width={listWidth - 1} // -1 to prevent horizontal scrollbar appearance on resizing
        height={listHeight}
        itemCount={records.length}
        itemSize={35}
      >
        {(props): any => (
          <div style={props.style}>
            <SoundRecordsListItem
              key={records[props.index].id}
              record={records[props.index]}
            />
          </div>
        )}
      </List>
    </div>
  );
};

export default SoundRecordList;
