import { AppThunk } from '../../store';
import { SCORE } from '../constants';
import { createAction } from '@reduxjs/toolkit';

export const actionSetScore = createAction(SCORE.SET, (score: 0 | 1) => ({
  payload: score,
}));

export const actionResetScore = createAction(SCORE.RESET);

export function setScore(score: 0 | 1): AppThunk {
  return async (dispatch: (arg0: { payload: 0 | 1; type: string }) => void): Promise<void> => {
    dispatch(actionSetScore(score));
  };
}

export function resetScore(): AppThunk {
  return (dispatch): void => {
    dispatch(actionResetScore());
  };
}
