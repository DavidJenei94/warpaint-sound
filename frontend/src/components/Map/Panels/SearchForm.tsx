import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Categories } from '../../../models/category.model';
import { MapQueryParams } from '../../../models/map.model';
import {
  SoundRecord,
  SoundRecordFilter,
} from '../../../models/soundrecord.model';
import { getQueryParams } from '../../../utils/general.utils';
import Button from '../../UI/Button';

import Input from '../../UI/Input';
import ListPanel from '../../UI/Map/ListPanel';
import CategorySelect from '../../UI/Map/CategorySelect';
import SubCategorySelect from '../../UI/Map/SubCategorySelect';

import styles from './SearchForm.module.scss';

interface SearchFormProps {
  showSearchForm: Dispatch<SetStateAction<boolean>>;
  showSoundRecordList: Dispatch<SetStateAction<boolean>>;
  filteredSoundRecords: SoundRecord[];
  setSoundRecordFilters: Dispatch<SetStateAction<SoundRecordFilter>>;
  activeMarker: SoundRecord | null;
  setActiveMarker: Dispatch<SetStateAction<SoundRecord | null>>;
  setIsTriggeredByList: Dispatch<SetStateAction<boolean>>;
}

let waitTypingTimeout: NodeJS.Timeout;

const SearchForm = ({
  showSearchForm,
  showSoundRecordList,
  filteredSoundRecords,
  setSoundRecordFilters,
  activeMarker,
  setActiveMarker,
  setIsTriggeredByList,
}: SearchFormProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [categories, setCategories] = useState<Categories>({
    categories: [],
    subCategories: [],
  });

  const [searchText, setSearchText] = useState<string>(
    searchParams.get('sInst') === null ? '' : searchParams.get('sInst')!
  );
  const [searchCategoryId, setSearchCategoryId] = useState<number>(0);
  const [searchSubCategoryId, setSearchSubCategoryId] = useState<number>(0);

  // close sound record list
  useEffect(() => {
    showSoundRecordList(false);
  }, []);

  // Get categories and subcategories
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(`http://localhost:8002/api/category`);
      const data = await response.json();

      setCategories(data);
    };

    fetchCategories();
  }, []);

  // Check search text change and update query params after a delay
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

  // Check change in categories and update query params
  useEffect(() => {
    setSoundRecordFilters((prevValue) => ({
      ...prevValue,
      categoryId: searchCategoryId,
      subCategoryId: searchSubCategoryId,
    }));

    setSearchParams((prevValue) => {
      const params: MapQueryParams = getQueryParams(prevValue);

      if (searchCategoryId === 0) {
        delete params.sCat;
        delete params.sSubCat;
        return { ...params };
      }

      if (searchSubCategoryId === 0) {
        delete params.sSubCat;
        return { ...params, sCat: searchCategoryId.toString() };
      }

      return {
        ...params,
        sCat: searchCategoryId.toString(),
        sSubCat: searchSubCategoryId.toString(),
      };
    });
  }, [searchCategoryId, searchSubCategoryId]);

  const clearSearchFieldsHandler = () => {
    setSearchParams((prevValue) => {
      const params: MapQueryParams = getQueryParams(prevValue);
      delete params.sInst;
      delete params.sCat;
      delete params.sSubCat;
      return { ...params };
    });

    setSearchText('');
    setSearchCategoryId(0);
    setSearchSubCategoryId(0);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    if (name === 'categoryId') {
      setSearchCategoryId(Number(value));
      setSearchSubCategoryId(0);
    } else if (name === 'subCategoryId') {
      setSearchSubCategoryId(Number(value));
    }
  };

  const handleClose = () => {
    showSearchForm(false);
  };

  const showMarkerPopup = (soundRecord: SoundRecord) => {
    setIsTriggeredByList(true);
    setActiveMarker(soundRecord);
  };

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
          <label htmlFor="categoryId">Category:</label>
          <br />
          <CategorySelect
            categoryId={searchCategoryId}
            onChange={handleCategoryChange}
            categories={categories}
          />
        </div>
        <div>
          <label htmlFor="subCategoryId">Sub Category:</label>
          <br />
          <SubCategorySelect
            subCategoryId={searchSubCategoryId}
            onChange={handleCategoryChange}
            categories={categories}
            categoryId={searchCategoryId}
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
              className={
                activeMarker && activeMarker.id === record.id
                  ? styles.active
                  : ''
              }
            >{`${record.instrument} (${record.subCategory})`}</p>
          ))}
      </div>
    </ListPanel>
  );
};

export default SearchForm;
