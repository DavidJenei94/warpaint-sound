import React, { Dispatch, SetStateAction } from 'react';
import ControlButton from './ControlButton';

import searchIcon from '../../../assets/map-assets/search-icon.png';

interface SearchFormControlProps {
  showSearchForm: Dispatch<SetStateAction<boolean>>;
}

const SearchFormControl = ({
  showSearchForm,
}: SearchFormControlProps) => {
  const toggleMenuHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    showSearchForm(true);
  };

  return (
    <ControlButton
      position="topleft"
      title={"Search"}
    >
      <img
        src={searchIcon}
        width={30}
        onClick={toggleMenuHandler}
      />
    </ControlButton>
  );
};

export default SearchFormControl;
