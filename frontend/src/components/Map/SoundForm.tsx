import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import useRecorder from '../../hooks/useRecorder';
import { SoundRecord } from '../../models/soundrecord.model';

import Button from '../UI/Button';
import MapForm from '../UI/MapForm';

import styles from './SoundForm.module.scss';

interface SoundFormProps {
  toggleSoundForm: Dispatch<SetStateAction<boolean>>;
  addSoundRecord: Dispatch<SetStateAction<SoundRecord[]>>;
}

const SoundForm = ({ toggleSoundForm, addSoundRecord }: SoundFormProps) => {
  const [instrumentImageSrc, setInstrumentImageSrc] = useState('');
  const [userLocation, setUserLocation] = useState<GeolocationPosition | null>(
    null
  );

  const { audioURL, isRecording, startRecording, stopRecording } =
    useRecorder();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation(position);
      });
    }
  }, []);

  const handlOutsideFormButtonClick = () => {
    toggleSoundForm(false);
  };

  const submitNewSoundHandler = (event: React.FormEvent) => {
    event.preventDefault();

    alert('Form submitted');

    const soundRecord: SoundRecord = {
      id: 0,
      instrument: 'instrument',
      description: 'description',
      category: 'cat',
      subCategory: 'subcat',
      imageUrl: 'image',
      soundUrl: 'sound file',
      coordinates: [
        userLocation!.coords.latitude,
        userLocation!.coords.longitude,
      ],
    };

    addSoundRecord((prevState) => prevState.concat(soundRecord));
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
    var src = URL.createObjectURL(file);
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
              type="text"
              placeholder="eg. Yamaha P-45, Gibson 1952 J-185"
              required
            />
          </div>
          <div>
            <label htmlFor="category">Category:</label>
            <br />
            <select id="category" name="Category" required>
              <option>Product1 : Electronics </option>
              <option>Product2 : Sports </option>
            </select>
          </div>
          <div>
            <label htmlFor="subcategory">Sub Category:</label>
            <br />
            <select id="subcategory" name="Subcategory" required>
              <option>Product1 : Electronics </option>
              <option>Product2 : Sports </option>
            </select>
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <br />
            <input
              id="description"
              type="text"
              placeholder="Any useful information worth sharing."
            />
          </div>
          <div className={styles.coordinates}>
            <label>Coordinates:</label>
            {userLocation ? (
              <div>
                <p>Lat: {userLocation.coords.latitude}</p>
                <p>Lng: {userLocation.coords.longitude}</p>
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
