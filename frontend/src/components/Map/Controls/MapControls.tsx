import { Dispatch, SetStateAction } from 'react';
import { ScaleControl } from 'react-leaflet';

import InformationControl from './InformationControl';
import ScrollToMenuControl from './ScrollToMenuControl';
import SearchFormControl from './SearchFormControl';
import NewSoundFormControl from './NewSoundFormControl';
import SoundRecordListControl from './SoundRecordListControl';
import FitBoundsControl from './FitBoundsControl';
import { LatLngBounds } from 'leaflet';
import DonationControl from './DonationControl';

interface MapControlsProps {
  showSearchForm: Dispatch<SetStateAction<boolean>>;
  showNewSoundForm: Dispatch<SetStateAction<boolean>>;
  showSoundRecordList: Dispatch<SetStateAction<boolean>>;
  showDonation: Dispatch<SetStateAction<boolean>>;
  dataBounds: LatLngBounds;
}

const MapControls = ({
  showSearchForm,
  showNewSoundForm,
  showSoundRecordList,
  showDonation,
  dataBounds,
}: MapControlsProps) => {
  return (
    <>
      <InformationControl />
      <SearchFormControl showSearchForm={showSearchForm} />
      <NewSoundFormControl showNewSoundForm={showNewSoundForm} />
      <SoundRecordListControl showSoundRecordList={showSoundRecordList} />
      <FitBoundsControl dataBounds={dataBounds} />
      <DonationControl showDonation={showDonation} />
      <ScrollToMenuControl />
      <ScaleControl position="bottomright" />
    </>
  );
};

export default MapControls;
