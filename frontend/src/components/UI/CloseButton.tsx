import Button from './Button';
import styles from './CloseButton.module.scss';

interface CloseButtonProps {
  onClose: () => void;
  float?: boolean;
}

const CloseButton = ({ onClose, float = false }: CloseButtonProps) => {
  const className = float ? styles["float-close"] : styles.close
  
  return (
    <div className={className}>
      <Button type="button" onClick={onClose}>
        <p>X</p>
      </Button>
    </div>
  );
};

export default CloseButton;
