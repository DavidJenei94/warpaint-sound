import { ComponentProps } from 'react';

import styles from './Select.module.scss';

interface Option {
  value: string;
  text: string;
}

interface SelectProps extends ComponentProps<'select'> {
  optionList: Option[] | null;
}

const Select = ({ optionList, ...otherProps }: SelectProps) => {
  return (
    <select
      {...otherProps}
      data-testid="select"
      className={styles.select}
    >
      {optionList &&
        optionList.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
    </select>
  );
};

export default Select;
