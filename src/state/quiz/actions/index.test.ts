import { QuestionsProps } from '../reducer';
import * as actions from '../actions';
import * as types from '../constants';

describe('Quiz', () => {
  describe('actions', () => {
    it('should create an action FetchQuizFailure', () => {
      const payload = 'Error';
      const expectedAction = {
        type: types.FETCH_QUIZ.FAILURE,
        payload,
      };
      expect(actions.actionFetchQuizFailure(payload)).toEqual(expectedAction);
    });
    it('should create an action FetchQuizPending', () => {
      const expectedAction = {
        type: types.FETCH_QUIZ.PENDING,
      };
      expect(actions.actionFetchQuizPending()).toEqual(expectedAction);
    });
    it('should create an action FetchQuizSuccess', () => {
      const payload: QuestionsProps[] = [
        {
          category: 'General Knowledge',
          question: 'Nutella is produced by the German company Ferrero.',
          correct_answer: 'False',
        },
        { category: 'General Knowledge', question: 'Romanian belongs to the Romance language family, shared with French, Spanish, Portuguese and Italian. ', correct_answer: 'True' },
      ];
      const expectedAction = {
        type: types.FETCH_QUIZ.SUCCESS,
        payload,
      };

      expect(actions.actionFetchQuizSuccess(payload)).toEqual(expectedAction);
    });

    it('should create an action FetchQuizReset', () => {
      const expectedAction = {
        type: types.FETCH_QUIZ.RESET,
      };

      expect(actions.actionResetQuiz()).toEqual(expectedAction);
    });
  });
});
