import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux-hooks';
import useTokenCheck from '../../hooks/useTokenCheck';
import { fetchSoundRecordsAndCategories } from '../../service/soundRecord-api';
import AuthContext from '../../store/auth-context';
import FeedbackContext from '../../store/feedback-context';
import { mapActions } from '../../store/map-redux';

import AdminList from './AdminList';
import Input from '../UI/Input';
import LoadingIcon from '../UI/Loading/LoadingIcon';

import styles from './Admin.module.scss';

const Admin = () => {
  const dispatch = useAppDispatch();
  const authCtx = useContext(AuthContext);
  const feedbackCtx = useContext(FeedbackContext);
  const isTokenChecked = useTokenCheck();

  const [isLoading, setIsloading] = useState<boolean>(true);
  const [idFilter, setIdFilter] = useState<number>(0);
  const [nameFilter, setNameFilter] = useState<string>('');

  // Fetch sound records from server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSoundRecordsAndCategories();

        dispatch(mapActions.setSoundRecords(data.soundRecords));
        dispatch(mapActions.setCategories(data.categories));

        setIsloading(false);
      } catch (error: any) {
        feedbackCtx.showMessage('Error while loading Sound Records.', 4000);
      }
    };

    if (isLoading) {
      fetchData();
    }
  }, [isLoading]);

  if (!isTokenChecked) {
    return <LoadingIcon />;
  }

  if (!authCtx.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.filter}>
        <Input
          placeholder="id"
          title="id"
          type="number"
          value={idFilter}
          onChange={(event) => setIdFilter(Number(event.target.value))}
        />
        <Input
          placeholder="name"
          title="name"
          type="text"
          value={nameFilter}
          onChange={(event) => setNameFilter(event.target.value)}
        />
      </div>
      {isLoading && <LoadingIcon />}
      {!isLoading && (
        <AdminList
          filters={{ id: Number(idFilter), name: nameFilter }}
          onChangeSoundRecord={setIsloading}
        />
      )}
    </div>
  );
};

export default Admin;
