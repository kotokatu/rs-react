import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface MainState {
  name: string;
  age: string;
  email: string;
  password: string;
  confirmPassword: string;
  tc: boolean;
  gender: string;
  image: string;
  country: string;
}

const initialState: MainState = {
  name: '',
  age: '',
  email: '',
  password: '',
  confirmPassword: '',
  tc: false,
  gender: '',
  image: '',
  country: '',
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    updateValues: (_, action: PayloadAction<MainState>) => {
      return { ...action.payload };
    },
  },
});

export const { updateValues } = mainSlice.actions;
export default mainSlice.reducer;
