import { PayloadAction, createSlice } from '@reduxjs/toolkit';

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
};

const initialState: MainState = {
  history: [null],
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
