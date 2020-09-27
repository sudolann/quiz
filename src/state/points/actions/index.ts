import { AppThunk } from '../../store';
import { SET_SCORE } from '../constants';
import { createAction } from '@reduxjs/toolkit';


export const actionSetScore = createAction(SET_SCORE, (score: 0 | 1) => ({
  payload: score,
}));

export function setScore(score: 0 | 1): AppThunk {
  return async (dispatch: (arg0: { payload: 0 | 1; type: string }) => void): Promise<void> => {
    dispatch(actionSetScore(score));
  };
}
