import { ComponentProps } from 'react';

import Input from './Input';

import styles from './CheckBox.module.scss';

interface CheckBoxProps extends ComponentProps<'input'> {
  id: string;
  checked: boolean;

}

const CheckBox = ({
  id,
  children,
  checked,
  ...otherProps
}: CheckBoxProps) => {
  const emptyTextClass: string = !children ? styles.empty : '';

  console.log(checked);
  

  return (
    <div className={styles['container']}>
      <Input type="checkbox" checked={checked} id={id} {...otherProps} />
      <label htmlFor={id}>
        {!checked && (
          <span className={`${emptyTextClass}`}></span>
        )}
        {checked && (
          <span className={`${emptyTextClass}`}></span>
        )}
        <span className={styles.text}>{children}</span>
      </label>
    </div>
  );
};

export default CheckBox;
