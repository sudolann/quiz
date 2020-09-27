import { AppThunk } from '../../store';
import { FETCH_QUIZ } from '../constants';
import { createAction } from '@reduxjs/toolkit';
import { QuestionsProps } from '../reducer';
import { DifficultyLevel } from '../../../components/quizForm/QuizForm';

export const actionFetchQuizPending = createAction(FETCH_QUIZ.PENDING);

export const actionFetchQuizSuccess = createAction(FETCH_QUIZ.SUCCESS, (data: QuestionsProps[]) => ({
  payload: data,
}));
export const actionFetchQuizFailure = createAction(FETCH_QUIZ.FAILURE, (message: string) => ({
  payload: message,
}));

export function fetchQuestions(difficulty: DifficultyLevel, amount: number): AppThunk {
  console.log(amount, difficulty);
  return async (dispatch: (arg0: { payload: QuestionsProps[] | string; type: string }) => void): Promise<void> => {
    const request = fetch(`https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=boolean`);
    dispatch(actionFetchQuizPending());

    try {
      const data = await (await request).json();
      console.log(data.response_code);
      if (data.response_code !== 0) {
        dispatch(actionFetchQuizFailure('Problem with fetch questions, please try later'));
      } else {
        const results = data.results.reduce((acc: QuestionsProps[], item: QuestionsProps) => {
          const { category, question, correct_answer } = item;
          return [...acc, { category, question, correct_answer }];
        }, []);
        dispatch(actionFetchQuizSuccess(results));
      }
    } catch (error) {
      dispatch(actionFetchQuizFailure(error || 'Problem with fetch questions'));
    }
  };
}
