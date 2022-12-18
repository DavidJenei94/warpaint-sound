import { useNavigate } from 'react-router-dom';

import Button from '../Button';

import styles from './NotFound.module.scss';

const NotFound = () => {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/', { replace: true });
  };

  return (
    <div className={styles.container}>
      <p>This page does not exists.</p>
      <Button onClick={navigateToHome}><p>Home page</p></Button>
    </div>
  );
};

export default NotFound;
