import { combineReducers } from '@reduxjs/toolkit';

import quiz from './quiz/reducer';

export const rootReducer = combineReducers({ quiz });

export type RootState = ReturnType<typeof rootReducer>;
