import { LatLngBounds } from 'leaflet';
import { Dispatch, SetStateAction, useState } from 'react';
import { Categories } from '../../../models/category.model';
import {
  SoundRecord,
  SoundRecordFilter,
} from '../../../models/soundrecord.model';
import ListPanel from '../../UI/Map/ListPanel';

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
  const [isNewSoundFormShown, setIsNewSoundFormShown] =
    useState<boolean>(false);
  const [isSearchFormShown, setIsSearchFormShown] = useState<boolean>(false);
  const [isSoundRecordListShown, setIsSoundRecordListShown] =
    useState<boolean>(false);
  const [isDonationShown, setIsDonationShown] = useState<boolean>(false);

  const handleListPanelClose = (panelException: string) => {
    switch (panelException) {
      case 'SearchForm':
        setIsSoundRecordListShown(false);
        setIsDonationShown(false);
        break;
      case 'SoundRecordList':
        setIsSearchFormShown(false);
        setIsDonationShown(false);
        break;
      case 'Donation':
        setIsSearchFormShown(false);
        setIsSoundRecordListShown(false);
        break;
      default:
        setIsSearchFormShown(false);
        setIsSoundRecordListShown(false);
        setIsDonationShown(false);
        break;
    }
  };

  let listPanelContent: JSX.Element | null = null;
  if (isSearchFormShown) {
    listPanelContent = (
      <SearchForm
        categories={categories}
        filteredSoundRecords={filteredSoundRecords}
        setSoundRecordFilters={setSoundRecordFilters}
        activeMarker={activeMarker}
        setActiveMarker={setActiveMarker}
        setIsTriggeredByList={setIsTriggeredByList}
      />
    );
  } else if (isSoundRecordListShown) {
    listPanelContent = (
      <SoundRecordList
        filteredSoundRecords={filteredSoundRecords}
        activeMarker={activeMarker}
        setActiveMarker={setActiveMarker}
        setIsTriggeredByList={setIsTriggeredByList}
      />
    );
  } else if (isDonationShown) {
    listPanelContent = <Donation/>;
  }

  return (
    <>
      <MapControls
        showNewSoundForm={setIsNewSoundFormShown}
        showSearchForm={setIsSearchFormShown}
        showSoundRecordList={setIsSoundRecordListShown}
        showDonation={setIsDonationShown}
        dataBounds={dataBounds}
        handleListPanelClose={handleListPanelClose}
      />

      {listPanelContent && (
        <ListPanel onClose={() => handleListPanelClose('')}>
          {listPanelContent}
        </ListPanel>
      )}

      {isNewSoundFormShown && (
        <NewSoundForm
          categories={categories}
          showNewSoundForm={setIsNewSoundFormShown}
          addSoundRecord={setSoundRecords}
          setActiveMarker={setActiveMarker}
        />
      )}
    </>
  );
};

export default MapPanels;
