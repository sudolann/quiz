import { createReducer } from '@reduxjs/toolkit';
import { actionSetScore } from '../actions';

export const points = createReducer<Array<0 | 1>>([], {
  [actionSetScore.type]: (state, action) => {
    if (actionSetScore.match(action)) {
      return [...state, action.payload];
    }
    return state;
  },
});

export default points;
