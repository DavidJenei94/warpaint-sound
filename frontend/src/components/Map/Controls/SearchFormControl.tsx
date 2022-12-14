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
    showSearchForm(true);
  };

  const searchParam = searchParams.get('sInst');

  return (
    <ControlButton position="topleft" title={'Search'}>
      <div className={styles.container}>
        <img src={searchIcon} width={30} onClick={toggleMenuHandler} />
        {searchParam && <p className={styles.notification}>●</p>}
      </div>
    </ControlButton>
  );
};

export default SearchFormControl;
