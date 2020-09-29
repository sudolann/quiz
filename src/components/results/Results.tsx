import React, { FunctionComponent, ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { QuestionsProps } from '../../state/quiz/reducer';
import { Button } from 'antd';
import { ReactComponent as Minus } from '../../assets/minus.svg';
import { ReactComponent as Plus } from '../../assets/plus.svg';
import { resetQuiz } from '../../state/quiz/actions';
import { resetScore } from '../../state/points/actions';
import { useHistory } from 'react-router';
import { StateProps, store } from '../../state';
import './Results.scss';

export const Results: FunctionComponent = (): ReactElement => {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector<ReturnType<typeof store.getState>, StateProps>((state) => state);

  const points: Array<0 | 1> = state.points;
  const list: QuestionsProps[] = state.quiz.list;

  const sum = points.reduce((acc: number, item: number) => {
    const res = acc + item;
    return res;
  }, 0);
  useEffect(() => {
    if (!list.length || !points.length) {
      history.push('/');
    }
  }, [points, list]);

  const handleClick = () => {
    dispatch(resetQuiz());
    dispatch(resetScore());
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
