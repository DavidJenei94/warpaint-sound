import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import useRecorder from '../../hooks/useRecorder';
import {
  defaultSoundRecord,
  SoundRecord,
} from '../../models/soundrecord.model';

import Button from '../UI/Button';
import MapForm from '../UI/MapForm';

import styles from './SoundForm.module.scss';

interface SoundFormProps {
  toggleSoundForm: Dispatch<SetStateAction<boolean>>;
  addSoundRecord: Dispatch<SetStateAction<SoundRecord[]>>;
}

const SoundForm = ({ toggleSoundForm, addSoundRecord }: SoundFormProps) => {
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

  const handlOutsideFormButtonClick = () => {
    toggleSoundForm(false);
  };

  const handleTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setSoundRecord((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const submitNewSoundHandler = async (event: React.FormEvent) => {
    event.preventDefault();

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

    toggleSoundForm(false);
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
      onOutsideClick={handlOutsideFormButtonClick}
      onSubmit={submitNewSoundHandler}
    >
      <h1>Add a new Sound Record</h1>
      <div className={styles['form-container']}>
        <div>
          <div>
            <label htmlFor="instrument">Instrument name:</label>
            <br />
            <input
              id="instrument"
              name="instrument"
              type="text"
              placeholder="eg. Yamaha P-45, Gibson 1952 J-185..."
              required
              onChange={handleTextChange}
            />
          </div>
          <div>
            <label htmlFor="category">Category:</label>
            <br />
            <select
              id="category"
              name="category"
              required
              onChange={handleTextChange}
            >
              <option>Product1 : Electronics </option>
              <option>Product2 : Sports </option>
            </select>
          </div>
          <div>
            <label htmlFor="subCategory">Sub Category:</label>
            <br />
            <select
              id="subCategory"
              name="subCategory"
              required
              onChange={handleTextChange}
            >
              <option>Product1 : Electronics </option>
              <option>Product2 : Sports </option>
            </select>
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <br />
            <input
              id="description"
              name="description"
              type="text"
              placeholder="Any useful information worth sharing."
              onChange={handleTextChange}
            />
          </div>
          <div className={styles.coordinates}>
            <label>Coordinates:</label>
            {soundRecord.latitude ? (
              <div>
                <p>Lat: {soundRecord.latitude}</p>
                <p>Lng: {soundRecord.longitude}</p>
              </div>
            ) : (
              <p>Missing! Enable Location data in order to upload sound.</p>
            )}
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="instrument-image">Image:</label>
            <br />
            <input
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

export default SoundForm;
