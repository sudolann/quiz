import { AppState } from '../../store';

export function getPoints(state: AppState): Array<0 | 1> {
  return state.points;
}
