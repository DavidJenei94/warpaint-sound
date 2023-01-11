import React, { useEffect } from 'react';
import { useState } from 'react';
import { Popup, useMap } from 'react-leaflet';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { SoundRecord } from '../../../models/soundrecord.model';
import { mapActions } from '../../../store/map-redux';

import Button from '../../UI/Button';
import CloseButton from '../../UI/CloseButton';
import Input from '../../UI/Input';
import Modal from '../../UI/Modal/Modal';

import styles from './SoundRecordPopup.module.scss';

interface SoundRecordPopupProps {
  soundRecord: SoundRecord;
  openPopup: () => void;
}

const SoundRecordPopup = ({
  soundRecord,
  openPopup,
}: SoundRecordPopupProps) => {
  const [isReportShown, setIsReportShown] = useState<boolean>(false);
  const [reportText, setReportText] = useState<string>('');
  const [isImageHovered, setIsImageHovered] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const activatedByList: boolean = useAppSelector(
    (state) => state.activatedByList
  );

  const activeSoundRecord: SoundRecord | null = useAppSelector(
    (state) => state.activeSoundRecord
  );

  const map = useMap();

  // Trigger panTo and openpopup when selected from list (like search)
  useEffect(() => {
    const isActive = activeSoundRecord
      ? soundRecord.id === activeSoundRecord.id
      : false;

    if (isActive && activatedByList) {
      // If clicked from list, change the zoom level to 0
      // It will prevent the move event and will show the popup
      // It will reload the map tiles on that zoom
      // (with move event with state plus rerendering happens which does not open popup)
      if (map.getZoom() > 5 && map.getZoom() !== 18) {
        map.setZoom(0);
      }

      map.setView([soundRecord.latitude, soundRecord.longitude], 18);
      openPopup();

      dispatch(mapActions.setActivatedByList(false));
    }
  }, [activeSoundRecord, activatedByList]);

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

  let levelClass: string = '';
  switch (soundRecord.level) {
    case 'universe':
      levelClass = 'popup-universe';
      break;
    case 'chromium':
      levelClass = 'popup-chromium';
      break;
    default:
      levelClass = 'popup-basic';
      break;
  }

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
            alt="Poped up Image of instrument of the Sound Record"
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
      <Popup
        className={`${styles.popup} ${styles[levelClass]}`}
        minWidth={30}
        maxWidth={500}
        autoPan={false}
        keepInView={false}
      >
        {soundRecord && (
          <div className={styles['popup-content']}>
            <div className={styles['report-button']}>
              <Button
                title="Report inappropriate content"
                onClick={(e) => {
                  setIsReportShown(true);
                }}
              >
                <p>!</p>
              </Button>
            </div>
            <h3 className={styles.instrument} title={`id: ${soundRecord.id}`}>
              {soundRecord.instrument}
            </h3>
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
                  alt="Image of instrument of the Sound Record"
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
