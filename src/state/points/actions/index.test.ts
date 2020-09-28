import * as actions from '../actions';
import * as types from '../constants';

describe('Points', () => {
  describe('actions', () => {
    it('should create an action Set Score', () => {
      const payload = 0;
      const expectedAction = {
        type: types.SCORE.SET,
        payload,
      };
      expect(actions.actionSetScore(payload)).toEqual(expectedAction);
    });
    it('should create an action Reset Score', () => {
      const expectedAction = {
        type: types.SCORE.RESET,
      };
      expect(actions.actionResetScore()).toEqual(expectedAction);
    });
  });
});
