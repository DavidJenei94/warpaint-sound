import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import useRecorder from '../../../hooks/useRecorder';
import {
  defaultSoundRecord,
  SoundRecord,
} from '../../../models/soundrecord.model';

import Button from '../../UI/Button';
import Input from '../../UI/Input';
import MapForm from '../../UI/Map/MapForm';
import Select from '../../UI/Select';

import styles from './NewSoundForm.module.scss';

interface NewSoundFormProps {
  showNewSoundForm: Dispatch<SetStateAction<boolean>>;
  addSoundRecord: Dispatch<SetStateAction<SoundRecord[]>>;
}

const NewSoundForm = ({
  showNewSoundForm,
  addSoundRecord,
}: NewSoundFormProps) => {
  const [soundRecord, setSoundRecord] =
    useState<SoundRecord>(defaultSoundRecord);
  const [soundFile, setSoundFile] = useState<Blob | null>(null);
  const [imageFile, setImageFile] = useState<Blob | null>(null);

  const [instrumentImageSrc, setInstrumentImageSrc] = useState(''); // For the preview image
  const { audioURL, isRecording, startRecording, stopRecording } =
    useRecorder();

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
      setSoundFile(audioFile);
    };

    fetchAudioUrl();
  }, [audioURL]);

  const handlOutsideClick = () => {
    showNewSoundForm(false);
  };

  const handleTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setSoundRecord((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const submitNewSoundHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    if (
      !soundRecord.instrument ||
      !soundRecord.category ||
      !soundRecord.subCategory ||
      !soundRecord.latitude ||
      !soundRecord.longitude ||
      !soundFile ||
      !imageFile
    ) {
      alert("Not all required fields are filled.")
      return;
    }

    const formData = new FormData(); // preparing to send to the server
    formData.append('instrument', soundRecord.instrument);
    formData.append('category', soundRecord.category);
    formData.append('subCategory', soundRecord.subCategory);
    formData.append('description', soundRecord.description);
    formData.append('latitude', soundRecord.latitude.toString());
    formData.append('longitude', soundRecord.longitude.toString());
    formData.append('soundFile', soundFile!);
    formData.append('imageFile', imageFile!);

    const requestOptions = {
      method: 'POST',
      body: formData,
    };
    const response = await fetch(
      'http://localhost:8002/api/soundRecord',
      requestOptions
    );
    const data = await response.json();

    addSoundRecord((prevState) => prevState.concat(data.soundRecord));

    showNewSoundForm(false);
  };

  const uploadImageHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = event.target;
    if (!input) {
      alert('The browser does not does not support file input.');
      return;
    }
    if (!input.files) {
      alert('The browser does not does not support this file input.');
      return;
    }
    if (!input.files![0]) {
      alert('The file did not loaded properly.');
      return;
    }

    const file = input.files![0];
    setImageFile(file);

    // For the preview image
    const src = URL.createObjectURL(file);
    setInstrumentImageSrc(src);
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
            />
          </div>
          <div>
            <label htmlFor="category">Category:</label>
            <br />
            <Select
              id="category"
              name="category"
              value={soundRecord.category}
              onChange={handleTextChange}
              optionList={[
                { value: '0', text: '-' },
                { value: '1', text: 'Woodwinds' },
                { value: '2', text: 'Brass' },
              ]}
              required
            />
          </div>
          <div>
            <label htmlFor="subCategory">Sub Category:</label>
            <br />
            <Select
              id="subCategory"
              name="subCategory"
              value={soundRecord.subCategory}
              onChange={handleTextChange}
              optionList={[
                { value: '0', text: '-' },
                { value: '1', text: 'Ocarina' },
                { value: '2', text: 'Flute' },
              ]}
              required
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <br />
            <Input
              id="description"
              name="description"
              value={soundRecord.description}
              type="text"
              placeholder="Any useful information worth sharing."
              onChange={handleTextChange}
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
            <label htmlFor="instrument-image">Image:</label>
            <br />
            <Input
              type="file"
              id="instrument-image"
              accept="image/*"
              onChange={uploadImageHandler}
              required
            />
            <br />
            <img
              id="instrument-image-preview"
              src={instrumentImageSrc}
              width={100}
            />
          </div>
          <div>
            <label htmlFor="instrument-sound">Record Sound:</label>
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
      <div className={styles['submit-button']}>
        <Button type="submit">
          <p>Add Sound</p>
        </Button>
      </div>
    </MapForm>
  );
};

export default NewSoundForm;
