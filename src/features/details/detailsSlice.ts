import { createSlice } from '@reduxjs/toolkit';

interface DetailsState {
  detailsLoading: boolean;
}

const initialState: DetailsState = {
  detailsLoading: false,
};

const detailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    setDetailsLoading: (state, action) => {
      state.detailsLoading = action.payload;
    },
  },
});

export const { setDetailsLoading } = detailsSlice.actions;

export default detailsSlice.reducer;
