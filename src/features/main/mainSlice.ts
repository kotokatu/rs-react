import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  DEFAULT_ITEMS_PER_PAGE,
  DEFAULT_PAGE_NUMBER,
} from '../../constants/constants';

interface MainState {
  searchValue: string;
  perPage: number;
  page: number;
  mainLoading: boolean;
}

const initialState: MainState = {
  searchValue: '',
  perPage: DEFAULT_ITEMS_PER_PAGE,
  page: DEFAULT_PAGE_NUMBER,
  mainLoading: false,
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    updateSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setMainLoading: (state, action: PayloadAction<boolean>) => {
      state.mainLoading = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setPerPage: (state, action: PayloadAction<number>) => {
      state.perPage = action.payload;
    },
  },
});

export const { updateSearchValue, setMainLoading, setPage, setPerPage } =
  mainSlice.actions;
export default mainSlice.reducer;
