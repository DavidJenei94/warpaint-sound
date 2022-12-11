import React, { Dispatch, SetStateAction } from 'react';

import styles from './SearchForm.module.scss';

interface SearchFormProps {
  showSearch: Dispatch<SetStateAction<boolean>>;
}

const SearchForm = ({ showSearch }: SearchFormProps) => {
  const handlOutsideClick = () => {
    showSearch(false);
  };

  return (
    <div className={styles["form-container"]} onClick={handlOutsideClick}>
      <form onClick={(e) => e.stopPropagation()}>
        <h1>Here will be the SearchForm</h1>
      </form>
    </div>
  );
};

export default SearchForm;
