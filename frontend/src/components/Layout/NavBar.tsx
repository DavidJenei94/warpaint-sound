import { useNavigate } from 'react-router-dom';

import NavItem from './NavItem';

import styles from './NavBar.module.scss';
import wpvLogo from '../../assets/WpV-logo.png';

const NavBar = () => {
  let navigate = useNavigate();

  const navigateToInformation = () => {
    navigate('/map/information');
  };

  return (
    <div className={styles.navbar}>
      <div onClick={navigateToInformation}>
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
