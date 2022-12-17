import { Dispatch, SetStateAction } from 'react';
import { ScaleControl } from 'react-leaflet';
import { LatLngBounds } from 'leaflet';

import InformationControl from './InformationControl';
import ScrollToMenuControl from './ScrollToMenuControl';
import SearchFormControl from './SearchFormControl';
import NewSoundFormControl from './NewSoundFormControl';
import SoundRecordListControl from './SoundRecordListControl';
import FitBoundsControl from './FitBoundsControl';
import DonationControl from './DonationControl';

interface MapControlsProps {
  showSearchForm: Dispatch<SetStateAction<boolean>>;
  showNewSoundForm: Dispatch<SetStateAction<boolean>>;
  showSoundRecordList: Dispatch<SetStateAction<boolean>>;
  showDonation: Dispatch<SetStateAction<boolean>>;
  dataBounds: LatLngBounds;
  handleListPanelClose: (panelException: string) => void;
}

const MapControls = ({
  showSearchForm,
  showNewSoundForm,
  showSoundRecordList,
  showDonation,
  dataBounds,
  handleListPanelClose,
}: MapControlsProps) => {
  return (
    <>
      <InformationControl />
      <NewSoundFormControl showNewSoundForm={showNewSoundForm} />
      <SearchFormControl
        showSearchForm={showSearchForm}
        handleListPanelClose={handleListPanelClose}
      />
      <SoundRecordListControl
        showSoundRecordList={showSoundRecordList}
        handleListPanelClose={handleListPanelClose}
      />
      <FitBoundsControl dataBounds={dataBounds} />
      <DonationControl
        showDonation={showDonation}
        handleListPanelClose={handleListPanelClose}
      />
      <ScrollToMenuControl />
      <ScaleControl position="bottomright" />
    </>
  );
};

export default MapControls;
