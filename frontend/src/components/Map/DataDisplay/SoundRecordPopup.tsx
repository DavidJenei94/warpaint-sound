import React, { useCallback, useContext, useEffect } from 'react';
import { useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { Popup, useMap } from 'react-leaflet';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import useRecaptchaVerify from '../../../hooks/useRecaptchaVerify';
import { SoundRecord } from '../../../models/soundrecord.model';
import { reportSoundRecord } from '../../../service/soundRecord-api';
import FeedbackContext from '../../../store/feedback-context';
import { mapActions } from '../../../store/map-redux';
import { backendUrl, frontendUrl } from '../../../utils/general.utils';
import { getLevelBackgroundClass } from '../../../utils/level.style.utils';

import Button from '../../UI/Button';
import CloseButton from '../../UI/CloseButton';
import Input from '../../UI/Input';
import Modal from '../../UI/Modal/Modal';
import LoadingModal from '../../UI/Loading/LoadingModal';

import styles from './SoundRecordPopup.module.scss';
import popupBackgroundStyles from './PopupBackground.module.scss';

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

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const activatedByList: boolean = useAppSelector(
    (state) => state.activatedByList
  );

  const activeSoundRecord: SoundRecord | null = useAppSelector(
    (state) => state.activeSoundRecord
  );

  const feedbackCtx = useContext(FeedbackContext);

  const map = useMap();

  const { executeRecaptcha } = useGoogleReCaptcha();
  const handleReCaptchaVerify = useRecaptchaVerify(executeRecaptcha);

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

  // To record play count statistics
  const playSoundHandler = async () => {
    try {
      const response = await fetch(`${backendUrl}/statistics/playCount`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ soundRecordId: soundRecord.id }),
      });
      await response.json();
    } catch (error: any) {}
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReportText(event.target.value);
  };

  const closeReportContent = () => {
    setIsReportShown(false);
  };

  const reportContent = async () => {
    setIsLoading(true);

    try {
      const formData = new FormData(); // preparing to send to the server
      formData.append('reportMessage', reportText);

      const reCaptchaToken = await handleReCaptchaVerify();
      formData.append('reCaptchaToken', reCaptchaToken ? reCaptchaToken : '');

      const data = await reportSoundRecord(soundRecord.id, formData);

      feedbackCtx.showMessage(data.message, 2000);
    } catch (error: any) {
      feedbackCtx.showMessage(error.message, 3000);
    }

    setIsLoading(false);
    setIsReportShown(false);
  };

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(
      `${frontendUrl}/map?soundId=${soundRecord.id}`
    );
  };

  const levelClass = getLevelBackgroundClass(soundRecord.level);

  return (
    <div>
      {isLoading && <LoadingModal />}

      {isImageHovered && (
        <Modal
          className={styles['image-modal']}
          backdrop={true}
          overlay={true}
          onClose={() => setIsImageHovered(false)}
        >
          <img
            className={styles.zoomin}
            src={`${backendUrl}/uploads/${soundRecord!.imagePath}`}
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
        className={`${styles.popup} ${popupBackgroundStyles[levelClass]}`}
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
            <h3
              className={styles.instrument}
              title={`Copy link to clipboard for this SoundRecord`}
              onClick={copyToClipBoard}
            >
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
                  src={`${backendUrl}/uploads/${soundRecord!.imagePath}`}
                  onClick={() => setIsImageHovered(true)}
                  alt="Image of instrument of the Sound Record"
                />
              </div>
            </div>
            <div className={styles['audio-container']}>
              <audio
                src={`${backendUrl}/uploads/${soundRecord.soundPath}`}
                controls
                onPlay={playSoundHandler}
              />
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
};
export default SoundRecordPopup;
