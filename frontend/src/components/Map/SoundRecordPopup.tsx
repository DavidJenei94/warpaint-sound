import { useEffect, useState } from 'react';
import { Popup, useMap } from 'react-leaflet';
import { SoundRecord } from '../../models/soundrecord.model';

import Button from '../UI/Button';
import Modal from '../UI/Modal/Modal';

import styles from './SoundRecordPopup.module.scss';

interface SoundRecordPopupProps {
  soundRecordId: number;
}

const SoundRecordPopup = ({ soundRecordId }: SoundRecordPopupProps) => {
  const [soundRecord, setSoundRecord] = useState<SoundRecord | null>(null);

  const [isReportShown, setIsReportShown] = useState<boolean>(false);

  const map = useMap();

  useEffect(() => {
    const fetchSoundRecord = async () => {
      const response = await fetch(
        `http://localhost:8002/api/soundRecord/${soundRecordId}`
      );
      const data = await response.json();

      setSoundRecord(data.soundRecord);
    };

    fetchSoundRecord();
  }, []);

  const closeReportContent = () => {
    setIsReportShown(false);
  };

  const reportContent = () => {
    alert('Content reported');
    setIsReportShown(false);
  };

  return (
    <div>
      {isReportShown && (
        <Modal onClose={closeReportContent}>
          <>
            <p>Do you want to report this Sound Record as inappropriate?</p>
            <div className={styles.actions}>
              <Button onClick={reportContent}>
                <p>Yes</p>
              </Button>
              <Button onClick={closeReportContent}>
                <p>No</p>
              </Button>
            </div>
          </>
        </Modal>
      )}
      <Popup className={styles.popup} minWidth={30} maxWidth={500}>
        {soundRecord && (
          <div className={styles['popup-content']}>
            <div className={styles['report-button']}>
              <Button
                title="Report inappropriate content"
                onClick={(e) => {
                  setIsReportShown(true);
                  // map.closePopup();
                }}
              >
                <p>!</p>
              </Button>
            </div>
            <h3>{soundRecord.instrument}</h3>
            <div className={styles['main-content']}>
              <div className={styles.left}>
                <p>{soundRecord.category}</p>
                <p>{soundRecord.subCategory}</p>
                <p>{soundRecord.description}</p>
              </div>
              <div className={styles.right}>
                <img
                  src={'http://localhost:8002/api/' + soundRecord.imagePath}
                />
              </div>
            </div>
            <audio
              src={'http://localhost:8002/api/' + soundRecord.soundPath}
              controls
            />
          </div>
        )}
      </Popup>
    </div>
  );
};

export default SoundRecordPopup;
