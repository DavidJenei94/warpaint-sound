import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  defaultSoundRecord,
  SoundRecord,
} from '../../models/soundrecord.model';
import {
  deleteSoundRecord,
  editSoundRecord,
} from '../../service/soundRecord-api';
import AuthContext from '../../store/auth-context';
import FeedbackContext from '../../store/feedback-context';

import Button from '../UI/Button';
import Input from '../UI/Input';

import styles from './EditForm.module.scss';
interface EditFormProps {
  soundRecord: SoundRecord;
  onChangeSoundRecord: Dispatch<SetStateAction<boolean>>;
}

const EditForm = ({ soundRecord, onChangeSoundRecord }: EditFormProps) => {
  const authCtx = useContext(AuthContext);
  const feedbackCtx = useContext(FeedbackContext);

  const [record, setRecord] = useState<SoundRecord>(defaultSoundRecord);

  useEffect(() => {
    setRecord(soundRecord);
  }, [soundRecord]);

  const textChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRecord((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  };

  const editHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const data = await editSoundRecord(record, authCtx.token);
      feedbackCtx.showMessage(data.message, 3000);

      onChangeSoundRecord(true);
    } catch (error: any) {
      feedbackCtx.showMessage(error, 3000);
    }
  };

  const deleteHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const data = await deleteSoundRecord(soundRecord.id, authCtx.token);
      feedbackCtx.showMessage(data.message, 3000);

      onChangeSoundRecord(true);
    } catch (error: any) {
      feedbackCtx.showMessage(error, 3000);
    }
  };

  return (
    <div className={styles.element}>
      <p className={styles.id}>{record.id}</p>
      <Input
        name="instrument"
        title="instrument"
        value={record.instrument}
        onChange={textChangeHandler}
      />
      <Input
        name="subCategoryId"
        title="subCategoryId"
        value={record.subCategoryId}
        onChange={textChangeHandler}
      />
      <Input
        name="description"
        title="description"
        value={record.description}
        onChange={textChangeHandler}
      />
      <Input
        name="latitude"
        title="latitude"
        value={record.latitude}
        onChange={textChangeHandler}
      />
      <Input
        name="longitude"
        title="longitude"
        value={record.longitude}
        onChange={textChangeHandler}
      />
      <Input
        name="imagePath"
        title="imagePath"
        value={record.imagePath}
        onChange={textChangeHandler}
      />
      <Input
        name="soundPath"
        title="soundPath"
        value={record.soundPath}
        onChange={textChangeHandler}
      />
      <Input
        name="level"
        title="level"
        value={record.level}
        onChange={textChangeHandler}
      />
      <div className={styles.actions}>
        <Button onClick={editHandler}>
          <p>Update</p>
        </Button>
        <Button onClick={deleteHandler}>
          <p>Delete</p>
        </Button>
      </div>
    </div>
  );
};

export default EditForm;
