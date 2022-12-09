import React, { Dispatch, SetStateAction } from 'react';

import styles from './SoundForm.module.scss';

interface SoundFormProps {
  toggleSoundForm: Dispatch<SetStateAction<boolean>>;
}

const SoundForm = ({ toggleSoundForm }: SoundFormProps) => {
  const handleSoundFormButtonClick = () => {
    toggleSoundForm(false);
  };

  return (
    <div className={styles["form-container"]} onClick={handleSoundFormButtonClick}>
      <div onClick={(e) => e.stopPropagation()}>
        <h1>Here will be the Sound</h1>
      </div>
    </div>
  );
};

export default SoundForm;
