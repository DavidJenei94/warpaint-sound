import React, { Dispatch, SetStateAction } from 'react';
import { useSearchParams } from 'react-router-dom';

import ControlButton from './ControlButton';

import styles from './SearchFormControl.module.scss';
import searchIcon from '../../../assets/map-assets/search-icon.png';

interface SearchFormControlProps {
  showSearchForm: Dispatch<SetStateAction<boolean>>;
}

const SearchFormControl = ({ showSearchForm }: SearchFormControlProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const toggleMenuHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    showSearchForm((prevValue) => !prevValue);
  };

  // If any of the search params are truthy
  const searchText = searchParams.get('sInst');
  const searchCategory = searchParams.get('sCat');
  const searchSubCategory = searchParams.get('sSubCat');
  const searchChecks = searchText || searchCategory || searchSubCategory;

  return (
    <ControlButton position="topleft" title={'Search'}>
      <div className={styles.container} onClick={toggleMenuHandler}>
        <img src={searchIcon} width={30} />
        {searchChecks && <p className={styles.notification}>●</p>}
      </div>
    </ControlButton>
  );
};

export default SearchFormControl;
