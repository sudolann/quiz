import React, { FunctionComponent, ReactElement } from 'react';
import { QuizForm } from './components/quizForm/QuizForm';
import './App.scss';

export const App: FunctionComponent = (): ReactElement => {
  return (
    <div className='container'>
      <QuizForm />
    </div>
  );
};
