import { useState } from 'react';

import SoundMap from './SoundMap';
import SearchForm from './SearchForm';
import SoundForm from './SoundForm';

import styles from './Map.module.scss';

const Map = () => {
  const [isSearchFormShown, setIsSearchFormShown] = useState<boolean>(false);
  const [isSoundFormShown, setIsSoundFormShown] = useState<boolean>(false);

  return (
    <div className={styles.map}>
      <SoundMap
        toggleSearchForm={setIsSearchFormShown}
        toggleSoundForm={setIsSoundFormShown}
      />
      {isSearchFormShown && <SearchForm toggleSearch={setIsSearchFormShown} />}
      {isSoundFormShown && <SoundForm toggleSoundForm={setIsSoundFormShown} />}
    </div>
  );
};

export default Map;
