import ControlButton from './ControlButton';

import scrollToMenuIcon from '../../../assets/map-assets/scroll-to-menu-icon.png';

const ScrollToMenuControl = () => {
  const scrollToMenu = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <ControlButton position="topleft" title={'Scroll To Menu'}>
      <img src={scrollToMenuIcon} width={30} onClick={scrollToMenu} />
    </ControlButton>
  );
};

export default ScrollToMenuControl;
