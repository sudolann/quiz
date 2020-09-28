import quiz, { initialState } from './index';
import * as types from '../constants';
const payload: Array<0 | 1> = [0, 1];
describe('points reducer', () => {
  it('should reset to initial state when calling reset action', () => {
    expect(quiz(undefined, { type: types.SCORE.RESET })).toEqual(initialState);
  });
  it('should correctly return state when calling set action', () => {
    expect(quiz(undefined, { type: types.SCORE.SET, payload })).toEqual([payload]);
  });
});
