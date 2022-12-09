import React, { Dispatch, SetStateAction } from 'react';

import styles from './SearchForm.module.scss';

interface SearchFormProps {
  toggleSearch: Dispatch<SetStateAction<boolean>>;
}

const SearchForm = ({ toggleSearch }: SearchFormProps) => {
  const handlOutsideFormButtonClick = () => {
    toggleSearch(false);
  };

  return (
    <div className={styles["form-container"]} onClick={handlOutsideFormButtonClick}>
      <form onClick={(e) => e.stopPropagation()}>
        <h1>Here will be the SearchForm</h1>
      </form>
    </div>
  );
};

export default SearchForm;
