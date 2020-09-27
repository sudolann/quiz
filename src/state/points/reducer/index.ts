import { createReducer } from '@reduxjs/toolkit';
import { actionSetScore, actionResetScore } from '../actions';
const initialState: Array<0 | 1> = [];
export const points = createReducer<Array<0 | 1>>(initialState, {
  [actionSetScore.type]: (state, action) => {
    if (actionSetScore.match(action)) {
      return [...state, action.payload];
    }
    return state;
  },
  [actionResetScore.type]: () => initialState,
});

export default points;
