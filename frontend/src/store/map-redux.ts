import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Categories } from '../models/category.model';
import { SoundRecord } from '../models/soundrecord.model';

export interface MapState {
  soundRecords: SoundRecord[];
  categories: Categories;
  activeSoundRecord: SoundRecord | null;
  activatedByList: boolean;
}

const initialMapState: MapState = {
  soundRecords: [],
  categories: { categories: [], subCategories: [] },
  activeSoundRecord: null,
  activatedByList: false,
};

const mapSlice = createSlice({
  name: 'map',
  initialState: initialMapState,
  reducers: {
    setSoundRecords: (
      state: MapState,
      action: PayloadAction<SoundRecord[]>
    ) => {
      state.soundRecords = action.payload;
    },
    addSoundRecord: (state: MapState, action: PayloadAction<SoundRecord>) => {
      state.soundRecords = [...state.soundRecords, action.payload];
    },
    setCategories: (state: MapState, action: PayloadAction<Categories>) => {
      state.categories = action.payload;
    },
    setActiveSoundRecord: (
      state: MapState,
      action: PayloadAction<SoundRecord | null>
    ) => {
      state.activeSoundRecord = action.payload;
    },
    setActivatedByList: (state: MapState, action: PayloadAction<boolean>) => {
      state.activatedByList = action.payload;
    },
  },
});

export const mapActions = mapSlice.actions;

export default mapSlice.reducer;
