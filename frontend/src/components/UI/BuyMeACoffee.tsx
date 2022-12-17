import styles from './BuyMeACoffee.module.scss';
import buyMeACoffeeIcon from "../../assets/map-assets/buy-me-a-coffee-icon.png"

const BuyMeACoffee = () => {
  return (
    <a
      className={styles.button}
      target="_blank"
      href="https://www.buymeacoffee.com/warpaintvision"
    >
      <img
        className={styles.image}
        src={buyMeACoffeeIcon}
        alt="Buy me a coffee"
      />
      <span className={styles.text}>Support My Work</span>
    </a>
  );
};

export default BuyMeACoffee;
