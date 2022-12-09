import { useState } from 'react';
import { SoundRecord } from '../../models/soundrecord.model';

import SoundMap from './SoundMap';
import SearchForm from './SearchForm';
import SoundForm from './SoundForm';

import styles from './Map.module.scss';

const Map = () => {
  const [isSearchFormShown, setIsSearchFormShown] = useState<boolean>(false);
  const [isSoundFormShown, setIsSoundFormShown] = useState<boolean>(false);

  const [soundRecords, setSoundRecords] = useState<SoundRecord[]>([]);

  return (
    <div className={styles.map}>
      <SoundMap
        toggleSearchForm={setIsSearchFormShown}
        toggleSoundForm={setIsSoundFormShown}
        soundRecords={soundRecords}
      />
      {isSearchFormShown && <SearchForm toggleSearch={setIsSearchFormShown} />}
      {isSoundFormShown && <SoundForm toggleSoundForm={setIsSoundFormShown} addSoundRecord={setSoundRecords}/>}
    </div>
  );
};

export default Map;
