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
import CategorySelect from '../../UI/Map/CategorySelect';
import SubCategorySelect from '../../UI/Map/SubCategorySelect';
import SoundRecordList from './ListPanels/SoundRecordList';

import styles from './SearchForm.module.scss';

interface SearchFormProps {
  filteredSoundRecords: SoundRecord[];
  setSoundRecordFilters: Dispatch<SetStateAction<SoundRecordFilter>>;
}

let waitTypingTimeout: NodeJS.Timeout;

const SearchForm = ({
  filteredSoundRecords,
  setSoundRecordFilters,
}: SearchFormProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchText, setSearchText] = useState<string>(
    searchParams.get('sInst') === null ? '' : searchParams.get('sInst')!
  );
  const [searchCategoryId, setSearchCategoryId] = useState<number>(
    searchParams.get('sCat') === null ? 0 : Number(searchParams.get('sCat')!)
  );
  const [searchSubCategoryId, setSearchSubCategoryId] = useState<number>(
    searchParams.get('sSubCat') === null
      ? 0
      : Number(searchParams.get('sSubCat')!)
  );

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

  return (
    <>
      <div className={styles['search-fields']}>
        <p>Search instrument</p>
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
          />
        </div>
        <div>
          <label htmlFor="subCategoryId">Subcategory:</label>
          <br />
          <SubCategorySelect
            subCategoryId={searchSubCategoryId}
            onChange={handleCategoryChange}
            categoryId={searchCategoryId}
          />
        </div>
        <div>
          <Button onClick={clearSearchFieldsHandler}>Clear filters</Button>
        </div>
      </div>
      <SoundRecordList records={filteredSoundRecords} />
    </>
  );
};

export default SearchForm;
