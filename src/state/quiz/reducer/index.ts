import { createReducer } from '@reduxjs/toolkit';
import { actionFetchQuizPending, actionFetchQuizFailure, actionFetchQuizSuccess, actionResetQuiz } from '../actions';

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

export const initialState: QuizState = {
  list: [],
  loading: false,
  error: null,
};

export const quiz = createReducer<QuizState>(initialState, {
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
      list: [],
      error: null,
      loading: true,
    };
  },
  [actionFetchQuizFailure.type]: (state, action) => {
    return {
      list: [],
      loading: false,
      error: action.payload,
    };
  },
  [actionResetQuiz.type]: () => initialState,
});

export default quiz;
