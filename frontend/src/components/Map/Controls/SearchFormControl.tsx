import React, { Dispatch, SetStateAction } from 'react';
import { useSearchParams } from 'react-router-dom';

import ControlButton from './ControlButton';

import searchIcon from '../../../assets/map-assets/search-icon.png';
import searchIconActive from '../../../assets/map-assets/search-icon-active.png';

interface SearchFormControlProps {
  showSearchForm: Dispatch<SetStateAction<boolean>>;
  handleListPanelClose: (panelException: string) => void;
}

const SearchFormControl = ({
  showSearchForm,
  handleListPanelClose,
}: SearchFormControlProps) => {
  const [searchParams] = useSearchParams();

  const toggleMenuHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    handleListPanelClose('SearchForm');
    showSearchForm((prevValue) => !prevValue);
  };

  // If any of the search params are truthy (show searchIconActive)
  const searchText = searchParams.get('sInst');
  const searchCategory = searchParams.get('sCat');
  const searchSubCategory = searchParams.get('sSubCat');
  const searchChecks = searchText || searchCategory || searchSubCategory;

  return (
    <ControlButton title={'Search'}>
      <div onClick={toggleMenuHandler}>
        <img
          src={searchChecks ? searchIconActive : searchIcon}
          width={30}
          alt="Search Sound Record control icon"
        />
      </div>
    </ControlButton>
  );
};

export default SearchFormControl;
