import { LatLngBounds } from 'leaflet';
import { Dispatch, SetStateAction, useState } from 'react';
import {
  SoundRecord,
  SoundRecordFilter,
} from '../../../models/soundrecord.model';
import MapControls from '../Controls/MapControls';

import NewSoundForm from './NewSoundForm';
import SearchForm from './SearchForm';
import SoundRecordList from './SoundRecordList';

interface MapPanelsProps {
  setSoundRecords: Dispatch<SetStateAction<SoundRecord[]>>;
  filteredSoundRecords: SoundRecord[];
  setSoundRecordFilters: Dispatch<SetStateAction<SoundRecordFilter>>;
  activeMarker: SoundRecord | null;
  setActiveMarker: Dispatch<SetStateAction<SoundRecord | null>>;
  setIsTriggeredByList: Dispatch<SetStateAction<boolean>>;
  dataBounds: LatLngBounds;
}

const MapPanels = ({
  setSoundRecords,
  filteredSoundRecords,
  setSoundRecordFilters,
  activeMarker,
  setActiveMarker,
  setIsTriggeredByList,
  dataBounds,
}: MapPanelsProps) => {
  const [isSearchFormShown, setIsSearchFormShown] = useState<boolean>(false);
  const [isNewSoundFormShown, setIsNewSoundFormShown] =
    useState<boolean>(false);
  const [isSoundRecordListShown, setIsSoundRecordListShown] =
    useState<boolean>(false);

  return (
    <>
      <MapControls
        showNewSoundForm={setIsNewSoundFormShown}
        showSearchForm={setIsSearchFormShown}
        showSoundRecordList={setIsSoundRecordListShown}
        dataBounds={dataBounds}
      />

      {isSearchFormShown && (
        <SearchForm
          showSearchForm={setIsSearchFormShown}
          showSoundRecordList={setIsSoundRecordListShown}
          filteredSoundRecords={filteredSoundRecords}
          setSoundRecordFilters={setSoundRecordFilters}
          activeMarker={activeMarker}
          setActiveMarker={setActiveMarker}
          setIsTriggeredByList={setIsTriggeredByList}
        />
      )}
      {isNewSoundFormShown && (
        <NewSoundForm
          showNewSoundForm={setIsNewSoundFormShown}
          addSoundRecord={setSoundRecords}
          setActiveMarker={setActiveMarker}
        />
      )}
      {isSoundRecordListShown && (
        <SoundRecordList
          showSoundRecordList={setIsSoundRecordListShown}
          showSearchForm={setIsSearchFormShown}
          filteredSoundRecords={filteredSoundRecords}
          activeMarker={activeMarker}
          setActiveMarker={setActiveMarker}
          setIsTriggeredByList={setIsTriggeredByList}
        />
      )}
    </>
  );
};

export default MapPanels;
