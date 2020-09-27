import React, { FunctionComponent, ReactElement } from 'react';
import { QuizForm } from './components/quizForm/QuizForm';
import { Results, ErrorMessage } from './components/';
import { Route, Switch } from 'react-router-dom';
import './App.scss';

export const App: FunctionComponent = (): ReactElement => {
  return (
    <div className='container'>
      <Switch>
        <Route path='/' exact component={QuizForm} />
        <Route path='/results' component={Results} />
        <Route>
          <ErrorMessage message='No page found' />
        </Route>
      </Switch>
    </div>
  );
};
