import { LatLngBounds } from 'leaflet';
import { Dispatch, SetStateAction, useState } from 'react';
import {
  SoundRecord,
  SoundRecordFilter,
} from '../../../models/soundrecord.model';
import ListPanel from '../../UI/Map/ListPanel';

import MapControls from '../Controls/MapControls';
import Donation from './Donation';
import NewSoundForm from './NewSoundForm';
import SearchForm from './SearchForm';
import SoundRecordList from './SoundRecordOnScreen';

interface MapPanelsProps {
  filteredSoundRecords: SoundRecord[];
  setSoundRecordFilters: Dispatch<SetStateAction<SoundRecordFilter>>;
  dataBounds: LatLngBounds;
}

const MapPanels = ({
  filteredSoundRecords,
  setSoundRecordFilters,
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
        filteredSoundRecords={filteredSoundRecords}
        setSoundRecordFilters={setSoundRecordFilters}
      />
    );
  } else if (isSoundRecordListShown) {
    listPanelContent = (
      <SoundRecordList filteredSoundRecords={filteredSoundRecords} />
    );
  } else if (isDonationShown) {
    listPanelContent = <Donation />;
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
        <NewSoundForm showNewSoundForm={setIsNewSoundFormShown} />
      )}
    </>
  );
};

export default MapPanels;
