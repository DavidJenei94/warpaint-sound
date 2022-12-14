import { Layer } from 'leaflet';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import { SoundRecord, SoundRecordFilter } from '../../../models/soundrecord.model';
import CloseButton from '../../UI/CloseButton';
import Modal from '../../UI/Modal/Modal';

import styles from './SearchForm.module.scss';

interface SearchFormProps {
  showSearchForm: Dispatch<SetStateAction<boolean>>;
  soundRecords: SoundRecord[];
  soundRecordFilters: SoundRecordFilter;
  setSoundRecordFilters: Dispatch<SetStateAction<SoundRecordFilter>>;
  setActiveMarker: Dispatch<SetStateAction<SoundRecord | null>>;
}

let waitTypingTimeout: NodeJS.Timeout;

const SearchForm = ({
  showSearchForm,
  soundRecords,
  soundRecordFilters,
  setSoundRecordFilters,
  setActiveMarker,
}: SearchFormProps) => {
  const [searchText, setSearchText] = useState<string>('');

  const map = useMap();

  useEffect(() => {
    waitTypingTimeout = setTimeout(() => {
      setSoundRecordFilters((prevValue) => ({...prevValue, name: searchText }))
    }, 400);

    return () => {
      waitTypingTimeout && clearTimeout(waitTypingTimeout);
    };
  }, [searchText]);

  // const fetchSearch = async () => {
  //   const response = await fetch(
  //     `http://localhost:8002/api/soundRecord?searchText=${searchText}`
  //   );
  //   const data = await response.json();

  //   console.log(data);
  //   filterSoundRecords(data);
  // };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleClose = () => {
    showSearchForm(false);
  };

  const showMarkerPopup = (soundRecord: SoundRecord) => {
    setActiveMarker(soundRecord);
  };

  const filteredSoundRecords = soundRecords.filter((soundRecord) => {
    const instrument = soundRecord.instrument.toLowerCase();
    const nameFilter = soundRecordFilters.name.toLowerCase();

    return instrument.includes(nameFilter);
  });

  return (
    <Modal
      backdrop={false}
      overlay={false}
      onClose={handleClose}
      className={styles['search-modal']}
    >
      <CloseButton onClose={handleClose} />
      <div className={styles['search-fields']}>
        <p>Search Instrument</p>
        <input
          type="text"
          name="search"
          id="search"
          value={searchText}
          onChange={handleTextChange}
          placeholder="Search by name."
        />
        <div>
          <label htmlFor="category">Category:</label>
          <br />
          <select
            id="category"
            name="category"
            required
            // onChange={handleTextChange}
          >
            <option>Product1 : Electronics </option>
            <option>Product2 : Sports </option>
          </select>
        </div>
        <div>
          <label htmlFor="subCategory">Sub Category:</label>
          <br />
          <select
            id="subCategory"
            name="subCategory"
            required
            // onChange={handleTextChange}
          >
            <option>Product1 : Electronics </option>
            <option>Product2 : Sports </option>
          </select>
        </div>
      </div>
      <div className={styles['search-list']}>
        {filteredSoundRecords[0] &&
          filteredSoundRecords.map((record) => (
            <p
              key={record.id}
              onClick={() => showMarkerPopup(record)}
            >{`${record.instrument} (${record.subCategory})`}</p>
          ))}
      </div>
    </Modal>
  );
};

export default SearchForm;
