import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { userSlice } from './reducers/userSlice';
import { lensSlice } from './reducers/lensSlice';

const rootReducer = combineSlices(userSlice, lensSlice);

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: true,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];
