import { Dispatch, SetStateAction, useState } from 'react';
import {
  SoundRecord,
  SoundRecordFilter,
} from '../../../models/soundrecord.model';
import MapControls from '../Controls/MapControls';

import NewSoundForm from './NewSoundForm';
import SearchForm from './SearchForm';

interface MapPanelsProps {
  soundRecords: SoundRecord[];
  setSoundRecords: Dispatch<SetStateAction<SoundRecord[]>>;
  soundRecordFilters: SoundRecordFilter;
  setSoundRecordFilters: Dispatch<SetStateAction<SoundRecordFilter>>;
  setActiveMarker: Dispatch<SetStateAction<SoundRecord | null>>;
}

const MapPanels = ({
  soundRecords,
  setSoundRecords,
  soundRecordFilters,
  setSoundRecordFilters,
  setActiveMarker,
}: MapPanelsProps) => {
  const [isSearchFormShown, setIsSearchFormShown] = useState<boolean>(false);
  const [isNewSoundFormShown, setIsNewSoundFormShown] =
    useState<boolean>(false);

  return (
    <>
      <MapControls
        showNewSoundForm={setIsNewSoundFormShown}
        showSearchForm={setIsSearchFormShown}
      />

      {isSearchFormShown && (
        <SearchForm
          showSearchForm={setIsSearchFormShown}
          soundRecords={soundRecords}
          soundRecordFilters={soundRecordFilters}
          setSoundRecordFilters={setSoundRecordFilters}
          setActiveMarker={setActiveMarker}
        />
      )}
      {isNewSoundFormShown && (
        <NewSoundForm
          showNewSoundForm={setIsNewSoundFormShown}
          addSoundRecord={setSoundRecords}
        />
      )}
    </>
  );
};

export default MapPanels;
