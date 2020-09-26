import { createReducer } from '@reduxjs/toolkit';
import { actionFetchQuizPending, actionFetchQuizFailure, actionFetchQuizSuccess } from '../actions';

export interface QuestionsProps {
  category: string;
  question: string;
  correct_answer: 'True' | 'False';
}
export interface QuizState {
  list: QuestionsProps[] | [];
  loading: boolean;
  error: string | null;
}
export const quiz = createReducer<QuizState>(
  {
    list: [],
    loading: false,
    error: null,
  },
  {
    [actionFetchQuizSuccess.type]: (state, action) => {
      if (actionFetchQuizSuccess.match(action)) {
        return {
          list: action.payload,
          loading: false,
          error: null,
        };
      }
      return state;
    },
    [actionFetchQuizPending.type]: (state, action) => {
      return {
        ...state,
        error: null,
        loading: true,
      };
    },
    [actionFetchQuizFailure.type]: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
  }
);

export default quiz;
