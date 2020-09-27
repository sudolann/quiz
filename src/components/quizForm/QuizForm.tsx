import React, { FunctionComponent, ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions } from '../../state/quiz/actions';
import { Button } from 'antd';
import { getQuizData } from '../../state/quiz/selectors';
import { QuizState } from '../../state/quiz/reducer';
import { QuestionCard, ErrorMessage, LoadingBar } from '../../components';
import './QuizForm.scss';

export type DifficultyLevel = 'easy' | 'hard' | 'select';
export interface FormProps {
  difficulty?: DifficultyLevel;
  amount?: number;
}

export const QuizForm: FunctionComponent = (): ReactElement => {
  const dispatch = useDispatch();
  const quiz: QuizState = useSelector(getQuizData);
  const { loading, error, list } = quiz;
  const [inputs, setInputs] = useState<FormProps>({ difficulty: 'select' });

  if (loading) {
    return <LoadingBar />;
  }
  if (list.length > 0) {
    return <QuestionCard />;
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchQuestions(inputs.difficulty, inputs.amount));
  };

  return (
    <div className='container'>
      <header className='header'>
        <h1>
          Welcome to the Trivia <br />
          Challenge!
        </h1>
      </header>
      <form className='form' onSubmit={handleSubmit}>
        {error && <ErrorMessage message={error} />}
        <div className='wrapper'>
          <select value={inputs.difficulty} name='difficulty' placeholder='difficulty' onChange={handleChange} className='form__input form__input--select'>
            <option disabled value='select'>
              difficulty
            </option>
            <option value='easy'>easy</option>
            <option value='hard'>hard</option>
          </select>
          <input type='number' name='amount' placeholder='amount' value={inputs.amount} onChange={handleChange} className='form__input form__input--number' />
        </div>
        <Button type='primary' id='quiz-btn' htmlType='submit' disabled={!inputs.amount || inputs.difficulty === 'select'}>
          begin
        </Button>
      </form>
    </div>
  );
};
