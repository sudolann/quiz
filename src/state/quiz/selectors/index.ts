import { AppState } from '../../store';
import { QuizState } from '../reducer';

export function getQuizData(state: AppState): QuizState {
  return state.quiz;
}
