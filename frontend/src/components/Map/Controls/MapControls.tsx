import { Dispatch, SetStateAction } from 'react';
import { ScaleControl } from 'react-leaflet';

import InformationControl from './InformationControl';
import ScrollToMenuControl from './ScrollToMenuControl';
import SearchFormControl from './SearchFormControl';
import NewSoundFormControl from './NewSoundFormControl';

interface MapControlsProps {
  showSearchForm: Dispatch<SetStateAction<boolean>>;
  showNewSoundForm: Dispatch<SetStateAction<boolean>>;
}

const MapControls = ({
  showSearchForm,
  showNewSoundForm,
}: MapControlsProps) => {
  return (
    <>
      <ScrollToMenuControl />
      <InformationControl />
      <SearchFormControl showSearchForm={showSearchForm} />
      <NewSoundFormControl showNewSoundForm={showNewSoundForm} />
      <ScaleControl position="bottomright" />
    </>
  );
};

export default MapControls;
