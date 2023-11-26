import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { Item } from './nbaApi';
import type { ApiResponse } from './nbaApi';

interface DataState {
  players: ApiResponse | null;
  player: Item | null;
}

const initialState: DataState = {
  players: null,
  player: null,
};

const dataSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setPlayers: (state, action: PayloadAction<ApiResponse>) => {
      state.players = action.payload;
    },
    setPlayer: (state, action: PayloadAction<Item>) => {
      state.player = action.payload;
    },
  },
});

export const { setPlayers, setPlayer } = dataSlice.actions;
export default dataSlice.reducer;
