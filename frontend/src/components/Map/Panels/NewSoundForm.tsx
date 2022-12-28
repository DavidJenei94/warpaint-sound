import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import useRecorder from '../../../hooks/useRecorder';
import {
  defaultSoundRecord,
  SoundRecord,
} from '../../../models/soundrecord.model';
import FeedbackContext from '../../../store/feedback-context';
import { mapActions } from '../../../store/map-redux';
import { backendUrl } from '../../../utils/general.utils';

import Button from '../../UI/Button';
import CheckBox from '../../UI/CheckBox';
import Input from '../../UI/Input';
import CategorySelect from '../../UI/Map/CategorySelect';
import MapForm from '../../UI/Map/MapForm';
import SubCategorySelect from '../../UI/Map/SubCategorySelect';

import styles from './NewSoundForm.module.scss';

interface NewSoundFormProps {
  showNewSoundForm: Dispatch<SetStateAction<boolean>>;
}

const NewSoundForm = ({ showNewSoundForm }: NewSoundFormProps) => {
  const ctx = useContext(FeedbackContext);
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories);

  const [soundRecord, setSoundRecord] =
    useState<SoundRecord>(defaultSoundRecord);
  const [soundFile, setSoundFile] = useState<Blob | null>(null);
  const [imageFile, setImageFile] = useState<Blob | null>(null);

  const [instrumentImageSrc, setInstrumentImageSrc] = useState(''); // For the preview image
  const { audioURL, isRecording, startRecording, stopRecording } =
    useRecorder();

  const [termAccepted, setTermsAccepted] = useState<boolean>(false);

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
      const audioFile = new File([audioBlob], 'sound.wav', {
        type: 'audio/wav',
      });
      if (audioFile.size / 1000 > 1000) {
        ctx.showMessage('Audio file size is greater then 1 MB!', 3000);
        return;
      }

      setSoundFile(audioFile);
    };

    fetchAudioUrl();
  }, [audioURL]);

  const handleTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    const adjValue =
      name === 'categoryId' || name === 'subCategoryId' ? Number(value) : value;

    setSoundRecord((prevValue) => ({ ...prevValue, [name]: adjValue }));
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

    const file = input.files![0];

    if (file.size / 1000 > 3000) {
      ctx.showMessage('Image file size is greater then 3 MB!', 3000);
      return;
    }
    setImageFile(file);

    // For the preview image
    const src = URL.createObjectURL(file);
    setInstrumentImageSrc(src);
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

    const formData = new FormData(); // preparing to send to the server
    formData.append('instrument', soundRecord.instrument);
    formData.append('subCategoryId', soundRecord.subCategoryId.toString());
    formData.append('description', soundRecord.description);
    formData.append('latitude', soundRecord.latitude.toString());
    formData.append('longitude', soundRecord.longitude.toString());
    formData.append('soundFile', soundFile!);
    formData.append('imageFile', imageFile!);

    try {
      const requestOptions = {
        method: 'POST',
        body: formData,
      };
      const response = await fetch(
        `${backendUrl}/api/soundRecord`,
        requestOptions
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      const newSoundRecord = data.soundRecord;

      dispatch(mapActions.addSoundRecord(newSoundRecord));

      showNewSoundForm(false);
      dispatch(mapActions.setActiveSoundRecord(newSoundRecord));

      ctx.showMessage('New Sound Record added.', 2000);
    } catch (error: any) {
      ctx.showMessage(error.message, 3000);
    }
  };

  return (
    <MapForm
      onOutsideClick={handlOutsideClick}
      onSubmit={submitNewSoundHandler}
    >
      <h1 className={styles.header}>Add a new Sound Record</h1>
      <div className={styles['form-container']}>
        <div>
          <div>
            <label htmlFor="instrument">Instrument name:</label>
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
            <label htmlFor="categoryId">Category:</label>
            <br />
            <CategorySelect
              categoryId={soundRecord.categoryId}
              onChange={handleTextChange}
            />
          </div>
          <div>
            <label htmlFor="subCategoryId">Sub Category:</label>
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
        <div>
          <div>
            <label htmlFor="instrument-image">Image (Max 3 MB):</label>
            <br />
            <Input
              type="file"
              id="instrument-image"
              accept="image/*"
              onChange={uploadImageHandler}
              required
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
          <div>
            <label htmlFor="instrument-sound">
              Record Sound (Max 5 MB ~ 30 sec):
            </label>
            <br />
            <audio src={audioURL} id="instrument-sound" controls />
            <br />
            <div className={styles['recorder-buttons']}>
              {!isRecording ? (
                <Button
                  onClick={startRecording}
                  disabled={isRecording}
                  type="button"
                >
                  <p>Start</p>
                </Button>
              ) : (
                <Button
                  onClick={stopRecording}
                  disabled={!isRecording}
                  type="button"
                >
                  <p>Stop</p>
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
      </div>
    </MapForm>
  );
};

export default NewSoundForm;
