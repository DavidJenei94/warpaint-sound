import { useEffect, useState } from 'react';
import { SoundRecord } from '../../models/soundrecord.model';

import SoundMap from './SoundMap';
import SearchForm from './SearchForm';
import SoundForm from './SoundForm';
import Information from './Information/Information';

import styles from './Map.module.scss';

const Map = () => {
  const [isSearchFormShown, setIsSearchFormShown] = useState<boolean>(false);
  const [isSoundFormShown, setIsSoundFormShown] = useState<boolean>(false);
  const [isInformationShown, setIsInformationShown] = useState<boolean>(false);

  const [soundRecords, setSoundRecords] = useState<SoundRecord[]>([]);

  
  useEffect(() => {
    const fetchSoundRecord = async () => {
      const response = await fetch(
        `http://localhost:8002/api/soundRecord`
      );
      const data = await response.json();

      setSoundRecords(data);
    };

    fetchSoundRecord();
  }, []);

  return (
    <div className={styles.map}>
      <SoundMap
        showSearchForm={setIsSearchFormShown}
        showSoundForm={setIsSoundFormShown}
        showInformation={setIsInformationShown}
        soundRecords={soundRecords}
      />
      {isSearchFormShown && <SearchForm showSearch={setIsSearchFormShown} />}
      {isSoundFormShown && <SoundForm showSoundForm={setIsSoundFormShown} addSoundRecord={setSoundRecords}/>}
      {isInformationShown && <Information showInformation={setIsInformationShown} />}
    </div>
  );
};

export default Map;
