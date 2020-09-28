import quiz, { initialState, QuestionsProps } from './index';
import * as types from '../constants';
const payload: QuestionsProps[] = [
  {
    category: 'General Knowledge',
    question: 'Nutella is produced by the German company Ferrero.',
    correct_answer: 'False',
  },
  { category: 'General Knowledge', question: 'Romanian belongs to the Romance language family, shared with French, Spanish, Portuguese and Italian. ', correct_answer: 'True' },
];
describe('quiz reducer', () => {
  it('should reset to initial state when calling reset action', () => {
    expect(quiz(undefined, { type: types.FETCH_QUIZ.RESET })).toEqual(initialState);
  });
  it('should correctly return state when calling success action', () => {
    expect(quiz(undefined, { type: types.FETCH_QUIZ.SUCCESS, payload })).toEqual({
      list: payload,
      loading: false,
      error: null,
    });
  });
  it('should return state correctly when calling pending action', () => {
    expect(quiz(undefined, { type: types.FETCH_QUIZ.PENDING })).toEqual({
      list: [],
      loading: true,
      error: null,
    });
  });
  it('should correctly return state when calling failure action', () => {
    const payload = 'test';
    expect(quiz(undefined, { type: types.FETCH_QUIZ.FAILURE, payload })).toEqual({
      list: [],
      loading: false,
      error: payload,
    });
  });
});
