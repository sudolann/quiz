/* eslint-disable no-undef */
import { Action, configureStore } from '@reduxjs/toolkit';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { RootState, rootReducer } from './rootReducer';
import { QuizState } from './quiz/reducer';
export interface StateProps extends RootState {
  quiz: QuizState;
  points: Array<0 | 1>;
}

const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({ reducer: persistedReducer });
export const persistor = persistStore(store);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export type AppThunkDispatch = ThunkDispatch<RootState, null, Action<string>>;
