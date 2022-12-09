import React, { Dispatch, SetStateAction } from 'react';

import styles from './SearchForm.module.scss';

interface SearchFormProps {
  toggleSearch: Dispatch<SetStateAction<boolean>>;
}

const SearchForm = ({ toggleSearch }: SearchFormProps) => {
  const handleSearchFormButtonClick = () => {
    toggleSearch(false);
  };

  return (
    <div className={styles["form-container"]} onClick={handleSearchFormButtonClick}>
      <div onClick={(e) => e.stopPropagation()}>
        <h1>Here will be the SearchForm</h1>
      </div>
    </div>
  );
};

export default SearchForm;
