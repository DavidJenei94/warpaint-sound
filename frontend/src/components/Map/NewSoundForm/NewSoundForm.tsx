import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/redux-hooks';
import useRecorder from '../../../hooks/useRecorder';
import {
  defaultSoundRecord,
  SoundRecord,
} from '../../../models/soundrecord.model';
import { addSoundRecord } from '../../../service/soundRecord-api';
import FeedbackContext from '../../../store/feedback-context';
import { mapActions } from '../../../store/map-redux';
import getBlobDuration from 'get-blob-duration';
import { downgradeImage, getBase64 } from '../../../utils/media.utils';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import useRecaptchaVerify from '../../../hooks/useRecaptchaVerify';

import Button from '../../UI/Button';
import CheckBox from '../../UI/CheckBox';
import Input from '../../UI/Input';
import CategorySelect from '../../UI/Map/CategorySelect';
import MapForm from './MapForm';
import SubCategorySelect from '../../UI/Map/SubCategorySelect';
import RequiredAsterisk from '../../UI/RequiredAsterisk';
import LoadingModal from '../../UI/Loading/LoadingModal';

import styles from './NewSoundForm.module.scss';

interface NewSoundFormProps {
  showNewSoundForm: Dispatch<SetStateAction<boolean>>;
}

const NewSoundForm = ({ showNewSoundForm }: NewSoundFormProps) => {
  const ctx = useContext(FeedbackContext);
  const dispatch = useAppDispatch();

  const { executeRecaptcha } = useGoogleReCaptcha();
  const handleReCaptchaVerify = useRecaptchaVerify(executeRecaptcha);

  const [soundRecord, setSoundRecord] =
    useState<SoundRecord>(defaultSoundRecord);
  const [soundFile, setSoundFile] = useState<Blob | null>(null);
  const [imageFile, setImageFile] = useState<Blob | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const [soundRecordAdded, setSoundRecordAdded] = useState<boolean>(false);

  const [instrumentImageSrc, setInstrumentImageSrc] = useState(''); // For the preview image
  const { audioURL, setAudioURL, isRecording, startRecording, stopRecording } =
    useRecorder();

  const [termAccepted, setTermsAccepted] = useState<boolean>(false);

  // get the form values from localstorage if they exist
  useEffect(() => {
    const fetchImageUrl = async (imageSrc: string) => {
      const res: Response = await fetch(imageSrc);
      const blob: Blob = await res.blob();
      setImageFile(new File([blob], 'image.jpg', { type: 'image/jpg' }));

      setInstrumentImageSrc(imageSrc);
    };

    const fetchAudioUrl = async (audioSrc: string) => {
      const res: Response = await fetch(audioSrc);
      const blob: Blob = await res.blob();
      setSoundFile(new File([blob], 'audio.mp3', { type: 'audio/mpeg' }));

      setAudioURL(audioSrc);
    };

    const audioBase64 = localStorage.getItem('audioFile');
    const imageBase64 = localStorage.getItem('imageFile');
    const instrument = localStorage.getItem('instrument');
    const categoryId = localStorage.getItem('categoryId');
    const subCategoryId = localStorage.getItem('subCategoryId');
    const description = localStorage.getItem('description');

    if (audioBase64) {
      fetchAudioUrl(audioBase64);
    }
    if (imageBase64) {
      fetchImageUrl(imageBase64);
    }

    instrument &&
      setSoundRecord((prevValue) => ({ ...prevValue, instrument: instrument }));
    categoryId &&
      setSoundRecord((prevValue) => ({
        ...prevValue,
        categoryId: Number(categoryId),
      }));
    subCategoryId &&
      setSoundRecord((prevValue) => ({
        ...prevValue,
        subCategoryId: Number(subCategoryId),
      }));
    description &&
      setSoundRecord((prevValue) => ({
        ...prevValue,
        description: description,
      }));
  }, []);

  // change map position when new SOund record is added
  useEffect(() => {
    if (soundRecordAdded) {
      // To set the zoom level to 0 first and make sure it zooms to the marker
      // Otherwise it wouldn't show if it is part of a cluster
      dispatch(mapActions.setActivatedByList(true));
      dispatch(mapActions.setActiveSoundRecord(soundRecord));

      showNewSoundForm(false);
    }
  }, [soundRecordAdded, soundRecord]);

  // Get position when form is opened
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setSoundRecord((prevValue) => ({
            ...prevValue,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }));
        },
        null,
        { maximumAge: 600000, timeout: 5000, enableHighAccuracy: true }
      );
    }
  }, []);

  // Add recorded sound to soundRecord when it is changed
  useEffect(() => {
    const fetchAudioUrl = async () => {
      const audioBlob = await fetch(audioURL).then((response) =>
        response.blob()
      );
      const audioFile = new File([audioBlob], 'sound.mp3', {
        type: 'audio/mpeg',
      });

      if (audioFile.size / 1000 > 10000) {
        ctx.showMessage('Audio file size is greater than 10 MB!', 3000);
        return;
      }

      // Blob default value is text/html
      if (audioBlob.type !== 'text/html') {
        const duration = await getBlobDuration(audioBlob);
        if (duration > 60) {
          ctx.showMessage(
            'Audio file duration is longer than 60 seconds!',
            3000
          );
          return;
        }
      }

      setSoundFile(audioFile);

      // Save audioFile to localstorage
      try {
        const imageBase64 = (await getBase64(audioFile)) as string;
        localStorage.setItem('audioFile', imageBase64);
      } catch (error) {
        console.log(error);
      }
    };

    audioURL && fetchAudioUrl();
  }, [audioURL]);

  const handleTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    const adjValue =
      name === 'categoryId' || name === 'subCategoryId' ? Number(value) : value;

    setSoundRecord((prevValue) => ({ ...prevValue, [name]: adjValue }));

    localStorage.setItem(name, value);
  };

  const termsCheckHandler = () => {
    setTermsAccepted((prevState) => !prevState);
  };

  const uploadImageHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = event.target;
    if (!input || !input.files || !input.files![0]) {
      ctx.showMessage('Error while uploading file.', 3000);
      return;
    }

    let file: File | null = input.files![0];
    if (file.size / 1000 > 10000) {
      ctx.showMessage('Image file size is greater then 10 MB!', 3000);
      return;
    }

    // downgrade larger images
    if (file.size / 1000 > 2000) {
      file = await downgradeImage(file);
    }

    if (file) {
      setImageFile(file);

      // Save imageFile to localstorage
      try {
        const imageBase64 = (await getBase64(file)) as string;
        localStorage.setItem('imageFile', imageBase64);
      } catch (error) {
        console.log(error);
      }
    }

    // For the preview image
    if (file) {
      const src = URL.createObjectURL(file);
      setInstrumentImageSrc(src);
    }
  };

  const handlOutsideClick = () => {
    showNewSoundForm(false);
  };

  const submitNewSoundHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    if (
      !termAccepted ||
      !soundRecord.instrument ||
      soundRecord.subCategoryId === 0 ||
      !soundRecord.latitude ||
      !soundRecord.longitude ||
      !soundFile ||
      !imageFile
    ) {
      ctx.showMessage('Not all required fields are filled.', 3000);
      return;
    }

    if (
      soundRecord.instrument.length > 127 ||
      soundRecord.description.length > 255
    ) {
      ctx.showMessage(
        'Length of instrument name or description is too long.',
        3000
      );
      return;
    }

    setIsUploading(true);

    const formData = new FormData(); // preparing to send to the server
    formData.append('instrument', soundRecord.instrument);
    formData.append('subCategoryId', soundRecord.subCategoryId.toString());
    formData.append('description', soundRecord.description);
    formData.append('latitude', soundRecord.latitude.toString());
    formData.append('longitude', soundRecord.longitude.toString());
    formData.append('soundFile', soundFile!);
    formData.append('imageFile', imageFile!);

    const reCaptchaToken = await handleReCaptchaVerify();
    formData.append('reCaptchaToken', reCaptchaToken ? reCaptchaToken : '');

    try {
      const newSoundRecord = await addSoundRecord(formData);

      dispatch(mapActions.addSoundRecord(newSoundRecord));

      setSoundRecord(newSoundRecord);
      setSoundRecordAdded(true);

      localStorage.removeItem('audioFile');
      localStorage.removeItem('imageFile');
      localStorage.removeItem('instrument');
      localStorage.removeItem('categoryId');
      localStorage.removeItem('subCategoryId');
      localStorage.removeItem('description');

      ctx.showMessage('New Sound Record added.', 3000);
    } catch (error: any) {
      ctx.showMessage(error.message, 4000);
    }

    setIsUploading(false);
  };

  return (
    <>
      {isUploading && <LoadingModal />}

      <MapForm
        onOutsideClick={handlOutsideClick}
        onSubmit={submitNewSoundHandler}
      >
        <h1 className={styles.header}>Add a new Sound Record</h1>
        <div className={styles['form-container']}>
          <div>
            <div>
              <label htmlFor="instrument">
                Instrument name:
                <RequiredAsterisk />
              </label>
              <br />
              <Input
                id="instrument"
                name="instrument"
                value={soundRecord.instrument}
                type="text"
                placeholder="eg. Yamaha P-45, Gibson 1952 J-185..."
                onChange={handleTextChange}
                required
                maxLength={127}
              />
            </div>
            <div>
              <label htmlFor="categoryId">
                Category:
                <RequiredAsterisk />
              </label>
              <br />
              <CategorySelect
                categoryId={soundRecord.categoryId}
                onChange={handleTextChange}
              />
            </div>
            <div>
              <label htmlFor="subCategoryId">
                Sub Category:
                <RequiredAsterisk />
              </label>
              <br />
              <SubCategorySelect
                subCategoryId={soundRecord.subCategoryId}
                onChange={handleTextChange}
                categoryId={soundRecord.categoryId}
              />
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <br />
              <Input
                id="description"
                name="description"
                value={soundRecord.description}
                title="(Max 255 characters)"
                type="text"
                placeholder="Any useful information worth sharing."
                onChange={handleTextChange}
                maxLength={255}
              />
            </div>
            <div className={styles.coordinates}>
              <label>Coordinates:</label>
              {soundRecord.latitude ? (
                <div>
                  <p>{`${soundRecord.latitude}, ${soundRecord.longitude}`}</p>
                </div>
              ) : (
                <div>
                  <p>Missing! Enable Location data in order to upload sound.</p>
                </div>
              )}
            </div>
          </div>
          <div className={styles['media-uploader']}>
            <div className={styles['image-uploader']}>
              <label htmlFor="instrument-image">
                Image (Max 10 MB):
                <RequiredAsterisk />
              </label>
              <br />
              <Input
                type="file"
                id="instrument-image"
                accept="image/png, image/jpg, image/jpeg"
                onChange={uploadImageHandler}
              />
              <br />
              {instrumentImageSrc && (
                <img
                  id="instrument-image-preview"
                  src={instrumentImageSrc}
                  width={100}
                  alt="Preview of Image of instrument of the Sound Record"
                />
              )}
            </div>
            <div className={styles['audio-uploader']}>
              <label htmlFor="instrument-sound">
                Record Sound (Max 10 MB or 60 sec):
                <RequiredAsterisk />
              </label>
              <br />
              <div className={styles['audio-container']}>
                <audio src={audioURL} controls />
              </div>
              <br />
              <div className={styles['recorder-buttons']}>
                {!isRecording ? (
                  <Button
                    onClick={startRecording}
                    disabled={isRecording}
                    type="button"
                  >
                    <p>Start recording</p>
                  </Button>
                ) : (
                  <Button
                    onClick={stopRecording}
                    disabled={!isRecording}
                    type="button"
                  >
                    <p>Stop recording</p>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.terms}>
          <CheckBox
            id="terms"
            checked={termAccepted}
            onChange={termsCheckHandler}
          >
            <div className={styles.checkcontent}>
              I read and accept the{' '}
              <Link to="/map/terms">terms and conditions</Link>.
            </div>
          </CheckBox>
        </div>
        <div className={styles['submit-button']}>
          <Button type="submit">
            <p>Add Sound</p>
          </Button>
          <div className={styles['new-sound-record-recaptcha-badge']}>
            This site is protected by reCAPTCHA and the Google{' '}
            <a href="https://policies.google.com/privacy">Privacy Policy</a> and{' '}
            <a href="https://policies.google.com/terms">Terms of Service</a>{' '}
            apply.
          </div>
        </div>
      </MapForm>
    </>
  );
};

export default NewSoundForm;
