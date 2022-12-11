import Button from './Button';
import styles from './CloseButton.module.scss';

interface CloseButtonProps {
  onClose: () => void;
}

const CloseButton = ({ onClose }: CloseButtonProps) => {
  return (
    <div className={styles.close}>
      <Button type="button" onClick={onClose}>
        <p>X</p>
      </Button>
    </div>
  );
};

export default CloseButton;
