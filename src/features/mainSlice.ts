import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { COUNTRIES_LIST } from './countriesSlice';

export type FormFields = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  tc: boolean;
  gender: string | undefined;
  image: string | ArrayBuffer | null;
  country: string;
} | null;

type MainState = {
  history: FormFields[];
  countries: string[];
};

const initialState: MainState = {
  history: [null],
  countries: COUNTRIES_LIST,
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    updateHistory: (state, action: PayloadAction<FormFields>) => {
      state.history.unshift(action.payload);
    },
  },
});

export const { updateHistory } = mainSlice.actions;
export default mainSlice.reducer;
