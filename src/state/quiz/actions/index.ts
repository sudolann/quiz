import { AppThunk } from '../../store';
import { FETCH_QUIZ } from '../constants';
import { createAction } from '@reduxjs/toolkit';
import { QuestionsProps } from '../reducer';
import { DifficultyLevel } from '../../../components/quizForm/QuizForm';
import * as ent from 'html-entities';

export const actionFetchQuizPending = createAction(FETCH_QUIZ.PENDING);

export const actionFetchQuizSuccess = createAction(FETCH_QUIZ.SUCCESS, (data: QuestionsProps[]) => ({
  payload: data,
}));
export const actionFetchQuizFailure = createAction(FETCH_QUIZ.FAILURE, (message: string) => ({
  payload: message,
}));

export const actionResetQuiz = createAction(FETCH_QUIZ.RESET);

export function fetchQuestions(difficulty: DifficultyLevel, amount: number): AppThunk {
  return async (dispatch: (arg0: { payload: QuestionsProps[] | string; type: string }) => void): Promise<void> => {
    const request = fetch(`https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=boolean`);
    dispatch(actionFetchQuizPending());

    try {
      const data = await (await request).json();
      if (data.response_code !== 0) {
        dispatch(actionFetchQuizFailure('Problem with fetch questions, please try later'));
      } else {
        const Entities = ent.AllHtmlEntities;
        const entities = new Entities();
        const results = data.results.reduce((acc: QuestionsProps[], item: QuestionsProps) => {
          const { category, question, correct_answer } = item;
          return [...acc, { category, question: entities.decode(question), correct_answer }];
        }, []);
        console.log(results, 'red');
        dispatch(actionFetchQuizSuccess(results));
      }
    } catch (error) {
      dispatch(actionFetchQuizFailure(error || 'Problem with fetch questions'));
    }
  };
}
export function resetQuiz(): AppThunk {
  return (dispatch): void => {
    dispatch(actionResetQuiz());
  };
}
