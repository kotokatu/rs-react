import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { nbaApi } from "./playersApi";
export const setupStore = () => {
  return configureStore({
    [nbaApi.reducerPath]: nbaApi.reducer,
    middleware: (gDM) => gDM().concat(nbaApi.middleware),
  });
};

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(setupStore, { debug: true });
