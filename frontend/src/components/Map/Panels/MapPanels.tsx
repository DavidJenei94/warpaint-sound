import { LatLngBounds } from 'leaflet';
import { Dispatch, SetStateAction, useState } from 'react';
import { Categories } from '../../../models/category.model';
import {
  SoundRecord,
  SoundRecordFilter,
} from '../../../models/soundrecord.model';

import MapControls from '../Controls/MapControls';
import Donation from './Donation';
import NewSoundForm from './NewSoundForm';
import SearchForm from './SearchForm';
import SoundRecordList from './SoundRecordList';

interface MapPanelsProps {
  setSoundRecords: Dispatch<SetStateAction<SoundRecord[]>>;
  categories: Categories;
  filteredSoundRecords: SoundRecord[];
  setSoundRecordFilters: Dispatch<SetStateAction<SoundRecordFilter>>;
  activeMarker: SoundRecord | null;
  setActiveMarker: Dispatch<SetStateAction<SoundRecord | null>>;
  setIsTriggeredByList: Dispatch<SetStateAction<boolean>>;
  dataBounds: LatLngBounds;
}

const MapPanels = ({
  setSoundRecords,
  categories,
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
  const [isDonationShown, setIsDonationShown] = useState<boolean>(false);

  return (
    <>
      <MapControls
        showNewSoundForm={setIsNewSoundFormShown}
        showSearchForm={setIsSearchFormShown}
        showSoundRecordList={setIsSoundRecordListShown}
        showDonation={setIsDonationShown}
        dataBounds={dataBounds}
      />

      {isSearchFormShown && (
        <SearchForm
          categories={categories}
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
          categories={categories}
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
      {isDonationShown && <Donation showDonation={setIsDonationShown} />}
    </>
  );
};

export default MapPanels;
