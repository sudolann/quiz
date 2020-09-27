import React, { FunctionComponent, ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPoints } from '../../state/points/selectors';
import { QuestionsProps, QuizState } from '../../state/quiz/reducer';
import { getQuizData } from '../../state/quiz/selectors';
import { Button } from 'antd';
import { ReactComponent as Minus } from '../../assets/minus.svg';
import { ReactComponent as Plus } from '../../assets/plus.svg';
import { resetQuiz } from '../../state/quiz/actions';
import { resetScore } from '../../state/points/actions';
import { useHistory } from 'react-router';
import './Results.scss';

export const Results: FunctionComponent = (): ReactElement => {
  const dispatch = useDispatch();
  const history = useHistory();

  const points: Array<0 | 1> = useSelector(getPoints);
  const quiz: QuizState = useSelector(getQuizData);
  const list: QuestionsProps[] = quiz.list;

  const sum = points.reduce((acc: number, item: number) => {
    const res = acc + item;
    return res;
  }, 0);

  const handleClick = () => {
    dispatch(resetQuiz());
    dispatch(resetScore());
    history.push('/');
  };
  return (
    <div className='results'>
      <div className='results__title'>
        <h1>
          You scored
          <br />
          {sum}/{points.length}
        </h1>
      </div>
      <div className='results__questions'>
        {list.map((item: QuestionsProps, index: number) => (
          <div className='results__question__item' key={index}>
            <div className='svg'>{points[index] === 1 ? <Plus /> : <Minus />}</div>
            <p>{item.question}</p>
          </div>
        ))}
        <Button type='primary' id='quiz-btn' onClick={handleClick}>
          play again?
        </Button>
      </div>
    </div>
  );
};
