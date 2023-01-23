import universeIcon from '../assets/premium-assets/universe-icon.png';
import chromiumIcon from '../assets/premium-assets/chromium-icon.png';

export const getLevelIcon = (level: string) => {
  switch (level) {
    case 'universe':
      return universeIcon;
    case 'chromium':
      return chromiumIcon;
    default:
      return '';
  }
};

export const getLevelBackgroundClass = (level: string) => {
  switch (level) {
    case 'universe':
      return 'popup-universe';
    case 'chromium':
      return 'popup-chromium';
    default:
      return 'popup-basic';
  }
};
