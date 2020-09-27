import { combineReducers } from '@reduxjs/toolkit';

import quiz from './quiz/reducer';
import points from './points/reducer';

export const rootReducer = combineReducers({ quiz, points });

export type RootState = ReturnType<typeof rootReducer>;
