import { Dispatch, SetStateAction } from 'react';
import { ScaleControl } from 'react-leaflet';

import InformationControl from './InformationControl';
import ScrollToMenuControl from './ScrollToMenuControl';
import SearchFormControl from './SearchFormControl';
import NewSoundFormControl from './NewSoundFormControl';
import SoundRecordListControl from './SoundRecordListControl';

interface MapControlsProps {
  showSearchForm: Dispatch<SetStateAction<boolean>>;
  showNewSoundForm: Dispatch<SetStateAction<boolean>>;
  showSoundRecordList: Dispatch<SetStateAction<boolean>>;
}

const MapControls = ({
  showSearchForm,
  showNewSoundForm,
  showSoundRecordList,
}: MapControlsProps) => {
  return (
    <>
      <ScrollToMenuControl />
      <InformationControl />
      <SearchFormControl showSearchForm={showSearchForm} />
      <NewSoundFormControl showNewSoundForm={showNewSoundForm} />
      <SoundRecordListControl showSoundRecordList={showSoundRecordList} />
      <ScaleControl position="bottomright" />
    </>
  );
};

export default MapControls;
