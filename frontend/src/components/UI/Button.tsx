import { ComponentProps } from 'react';

import styles from './Button.module.scss';

const Button = ({ children, ...otherProps }: ComponentProps<'button'>) => {
  return <button className={styles.button} {...otherProps}>{children}</button>;
};

export default Button;
