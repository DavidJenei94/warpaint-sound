import { useEffect, useState } from 'react';
import { Popup, useMap } from 'react-leaflet';
import { SoundRecord } from '../../../models/soundrecord.model';

import Button from '../../UI/Button';
import CloseButton from '../../UI/CloseButton';
import Input from '../../UI/Input';
import Modal from '../../UI/Modal/Modal';

import styles from './SoundRecordPopup.module.scss';

interface SoundRecordPopupProps {
  soundRecordId: number;
}

const SoundRecordPopup = ({ soundRecordId }: SoundRecordPopupProps) => {
  const [soundRecord, setSoundRecord] = useState<SoundRecord | null>(null);

  const [isReportShown, setIsReportShown] = useState<boolean>(false);
  const [reportText, setReportText] = useState<string>('');
  const [isImageHovered, setIsImageHovered] = useState<boolean>(false);

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

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReportText(event.target.value);
  };

  const closeReportContent = () => {
    setIsReportShown(false);
  };

  const reportContent = () => {
    alert('Content reported!\n' + reportText);
    setIsReportShown(false);
  };

  return (
    <div>
      {isImageHovered && (
        <Modal
          backdrop={true}
          overlay={true}
          onClose={() => setIsImageHovered(false)}
        >
          <img
            className={styles.zoomin}
            src={'http://localhost:8002/api/' + soundRecord!.imagePath}
            onClick={() => setIsImageHovered(false)}
          />
        </Modal>
      )}
      {isReportShown && (
        <Modal backdrop={true} overlay={true} onClose={closeReportContent}>
          <CloseButton onClose={closeReportContent} />
          <div className={styles['report-container']}>
            <p>
              Do you want to report this Sound Record as incorrect or
              inappropriate?
            </p>
            <div className={styles['report-comment']}>
              <Input
                type="text"
                placeholder="Any relevant comment."
                value={reportText}
                onChange={handleTextChange}
              />
            </div>
            <div className={styles.actions}>
              <Button onClick={reportContent}>
                <p>Report</p>
              </Button>
            </div>
          </div>
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
              <div>
                <p>{soundRecord.category}</p>
                <p>{soundRecord.subCategory}</p>
                <p className={styles.description}>{soundRecord.description}</p>
              </div>
              <div>
                <img
                  src={'http://localhost:8002/api/' + soundRecord.imagePath}
                  onClick={() => setIsImageHovered(true)}
                  // onMouseOut={() => setIsImageHovered(false)}
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
