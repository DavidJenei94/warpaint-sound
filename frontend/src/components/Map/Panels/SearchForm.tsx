import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapQueryParams } from '../../../models/map.model';
import {
  SoundRecord,
  SoundRecordFilter,
} from '../../../models/soundrecord.model';
import { getQueryParams } from '../../../utils/general.utils';
import Button from '../../UI/Button';

import Input from '../../UI/Input';
import ListPanel from '../../UI/Map/ListPanel';
import Select from '../../UI/Select';

import styles from './SearchForm.module.scss';

interface SearchFormProps {
  showSearchForm: Dispatch<SetStateAction<boolean>>;
  showSoundRecordList: Dispatch<SetStateAction<boolean>>;
  filteredSoundRecords: SoundRecord[];
  setSoundRecordFilters: Dispatch<SetStateAction<SoundRecordFilter>>;
  setActiveMarker: Dispatch<SetStateAction<SoundRecord | null>>;
}

let waitTypingTimeout: NodeJS.Timeout;

const SearchForm = ({
  showSearchForm,
  showSoundRecordList,
  filteredSoundRecords,
  setSoundRecordFilters,
  setActiveMarker,
}: SearchFormProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchText, setSearchText] = useState<string>(
    searchParams.get('sInst') === null ? '' : searchParams.get('sInst')!
  );

  useEffect(() => {
    showSoundRecordList(false);
  }, []);

  useEffect(() => {
    waitTypingTimeout = setTimeout(() => {
      setSoundRecordFilters((prevValue) => ({
        ...prevValue,
        name: searchText,
      }));

      setSearchParams((prevValue) => {
        const params: MapQueryParams = getQueryParams(prevValue);

        if (searchText === '') {
          delete params.sInst;
          return { ...params };
        }

        return { ...params, sInst: searchText };
      });
    }, 350);

    return () => {
      waitTypingTimeout && clearTimeout(waitTypingTimeout);
    };
  }, [searchText]);

  const clearSearchFieldsHandler = () => {
    setSearchText('');
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleClose = () => {
    showSearchForm(false);
  };

  const showMarkerPopup = (soundRecord: SoundRecord) => {
    setActiveMarker(soundRecord);
  };

  // const filteredSoundRecords = soundRecords.filter((soundRecord) => {
  //   const instrument = soundRecord.instrument.toLowerCase();
  //   const nameFilter = soundRecordFilters.name.toLowerCase();

  //   return instrument.includes(nameFilter);
  // });

  return (
    <ListPanel onClose={handleClose}>
      <div className={styles['search-fields']}>
        <p>Search Instrument</p>
        <br />
        <Input
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
          <Select
            id="category"
            name="category"
            optionList={[
              { value: '0', text: '-' },
              { value: '1', text: 'Woodwinds' },
              { value: '2', text: 'Brass' },
            ]}
            required
            // onChange={handleTextChange}
          />
        </div>
        <div>
          <label htmlFor="subCategory">Sub Category:</label>
          <br />
          <Select
            id="subCategory"
            name="subCategory"
            optionList={[
              { value: '0', text: '-' },
              { value: '1', text: 'Ocarina' },
              { value: '2', text: 'Flute' },
            ]}
            required
            // onChange={handleTextChange}
          />
        </div>
        <div>
          <Button onClick={clearSearchFieldsHandler}>Clear</Button>
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
    </ListPanel>
  );
};

export default SearchForm;
