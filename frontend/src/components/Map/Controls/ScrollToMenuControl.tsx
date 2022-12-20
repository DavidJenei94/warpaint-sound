import ControlButton from './ControlButton';

import scrollToMenuIcon from '../../../assets/map-assets/scroll-to-menu-icon.png';
import scrollToMapIcon from '../../../assets/map-assets/scroll-to-map-icon.png';
import { useState } from 'react';

const ScrollToMenuControl = () => {
  const [onBottomOfPage, setOnBottomOfPage] = useState<boolean>(false);

  const scrollTo = () => {
    if (onBottomOfPage) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });

      setOnBottomOfPage(false);
    } else {
      window.scrollTo({
        top: document.body.scrollHeight,
        left: 0,
        behavior: 'smooth',
      });

      setOnBottomOfPage(true);
    }
  };

  return (
    <ControlButton
      position="topleft"
      title={onBottomOfPage ? 'Scroll To Menu' : 'Scroll To Map'}
    >
      <img
        src={onBottomOfPage ? scrollToMenuIcon : scrollToMapIcon}
        width={30}
        onClick={scrollTo}
        alt="Scroll to map or menu icon"
      />
    </ControlButton>
  );
};

export default ScrollToMenuControl;
