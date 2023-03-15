import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux-hooks';
import useTokenCheck from '../../hooks/useTokenCheck';
import { fetchSoundRecordsAndCategories } from '../../service/soundRecord-api';
import AuthContext from '../../store/auth-context';
import FeedbackContext from '../../store/feedback-context';
import { mapActions } from '../../store/map-redux';
import { backendUrl } from '../../utils/general.utils';
import { triggerBrowserDownload } from '../../utils/export.utils';
import Papa from 'papaparse';

import AdminList from './AdminList';
import Input from '../UI/Input';
import LoadingIcon from '../UI/Loading/LoadingIcon';
import Button from '../UI/Button';

import styles from './Admin.module.scss';

const Admin = () => {
  const dispatch = useAppDispatch();
  const authCtx = useContext(AuthContext);
  const feedbackCtx = useContext(FeedbackContext);
  const isTokenChecked = useTokenCheck();

  const [isLoading, setIsloading] = useState<boolean>(true);
  const [idFilter, setIdFilter] = useState<number>(0);
  const [nameFilter, setNameFilter] = useState<string>('');

  const [fileInput, setFileInput] = useState<string>('');

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

    if (isLoading && isTokenChecked && authCtx.isAuthenticated) {
      fetchData();
    }
  }, [isLoading, isTokenChecked, authCtx.isAuthenticated]);

  if (!isTokenChecked) {
    return <LoadingIcon />;
  }

  if (!authCtx.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const exportHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonName = event.currentTarget.name;

    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': authCtx.token,
        },
      };
      const response = await fetch(
        `${backendUrl}/export/${buttonName}`,
        requestOptions
      );
      const data = await response.blob();

      const url = URL.createObjectURL(data);

      triggerBrowserDownload(url, `${buttonName}.csv`);
    } catch (error: any) {
      feedbackCtx.showMessage(error.message, 4000);
    }
  };

  const importHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files[0]) {
      // keeps the main part of filename - it should be soundrecords or soundrecordplaylogs
      const inputName = files[0].name
        .substring(0, files[0].name.indexOf('.'))
        .substring(0, files[0].name.indexOf(' '));

      Papa.parse(files[0], {
        complete: async (results) => {
          // Change the structure of json to be able to upload to DB
          const jsonArray: any[] = [];
          const headerRow = results.data[0] as any[];

          results.data.forEach((row: any, rowIndex) => {
            if (rowIndex === 0) return;

            const rowObj: any = {};
            headerRow.forEach((header, headerIndex) => {
              rowObj[header] = row[headerIndex];
            });
            jsonArray.push(rowObj);
          });

          const finalJsonObj = {
            [inputName]: jsonArray,
          };

          // Send json data to backend
          try {
            const requestOptions = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'x-access-token': authCtx.token,
              },
              body: JSON.stringify(finalJsonObj),
            };
            const response = await fetch(
              `${backendUrl}/import/${inputName}`,
              requestOptions
            );
            const data = await response.json();

            feedbackCtx.showMessage(data.message, 4000);
          } catch (error: any) {
            feedbackCtx.showMessage(error.message, 4000);
          }

          setFileInput('');
        },
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.filter}>
        <Button name="soundrecords" onClick={exportHandler}>
          <p>Export sound records</p>
        </Button>
        <Button name="soundrecordplaylogs" onClick={exportHandler}>
          <p>Export play logs</p>
        </Button>
        <p className={styles['import-p']}>Import files:</p>
        <Input
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={importHandler}
          value={fileInput}
        />
        <br />
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
          onChangeSoundRecord={() => setIsloading(true)}
        />
      )}
    </div>
  );
};

export default Admin;
