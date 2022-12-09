import styles from './NavBar.module.scss';
import NavItem from './NavItem';

import wpvLogo from '../../assets/WpV-logo.png';

const NavBar = () => {
  return (
    <div className={styles.navbar}>
      <div>
        <img
          src={wpvLogo}
          alt="Warpaint Sound logo"
          title="Warpaint Sound"
          width={40}
        />
        <p>Warpaint Sound</p>
      </div>
      <NavItem to="/map">Sound Map</NavItem>
      <NavItem to="/statistics">Statistics</NavItem>
      <NavItem to="/donation">Donation</NavItem>
    </div>
  );
};

export default NavBar;
