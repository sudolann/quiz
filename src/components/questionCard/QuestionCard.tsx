import React, { FunctionComponent, ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import { getQuizData } from '../../state/quiz/selectors';
import { QuizState } from '../../state/quiz/reducer';
import { setScore } from '../../state/points/actions';
import { getPoints } from '../../state/points/selectors';
import { Redirect } from 'react-router';
import './QuestionCard.scss';

export const QuestionCard: FunctionComponent = (): ReactElement => {
  const dispatch = useDispatch();
  const quiz: QuizState = useSelector(getQuizData);
  const points: Array<0 | 1> = useSelector(getPoints);
  const list = quiz.list;
  const handleClick = (answer: boolean) => {
    const correctAnswer = list[points.length].correct_answer === 'True' ? true : false;
    const point = correctAnswer === answer ? 1 : 0;
    dispatch(setScore(point));
  };

  if (list.length === points.length) {
    return <Redirect to='/results' />;
  }
  return (
    <div className='question'>
      <div className='question__header'>
        <h1>{list[points.length]?.category}</h1>
      </div>
      <div className='question__card'>
        <p>{list[points.length]?.question}</p>
        <div className='question__card__buttons'>
          <Button type='primary' ghost id='quiz-btn' onClick={(): void => handleClick(true)}>
            true
          </Button>
          <Button type='primary' ghost id='quiz-btn' onClick={(): void => handleClick(false)}>
            false
          </Button>
        </div>
      </div>
      <div className='question__footer'>
        <p>
          {points.length + 1} of {list.length}
        </p>
      </div>
    </div>
  );
};
