import { shallow } from 'enzyme';
import React from 'react';
import { Results } from './Results';
import renderer from 'react-test-renderer';
import * as redux from 'react-redux';
import { ReactComponent as Minus } from '../../assets/minus.svg';
import { ReactComponent as Plus } from '../../assets/plus.svg';

const mock = jest.fn();

const spy = jest.spyOn(redux, 'useSelector');
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: (): jest.Mock<any, any> => mock,
}));
jest.mock('react-router', () => ({
  useHistory: () => ({
    push: mock,
  }),
}));
const quiz = {
  list: [
    {
      category: 'General Knowledge',
      question: 'Nutella is produced by the German company Ferrero.',
      correct_answer: 'False',
    },
    { category: 'General Knowledge', question: 'Romanian belongs to the Romance language family, shared with French, Spanish, Portuguese and Italian. ', correct_answer: 'True' },
  ],
  loading: false,
};

const points = [0, 1];

describe('component', (): void => {
  describe('Results', (): void => {
    beforeEach(() => {
      spy.mockReturnValue({
        quiz,
        points,
      });
    });
    it('match snapshot', (): void => {
      const tree = renderer.create(<Results />).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('renders questions with proper svg icon', (): void => {});
    spy.mockReturnValue({
      quiz,
      points,
    });
    const wrapper = shallow(<Results />);
    wrapper.find('.results__question__item').map((item, index) => {
      expect(item.find('p').text()).toBe(quiz.list[index].question);
      const svg = item.find('.svg');

      if (points[index] === 0) {
        expect(svg.find(Minus)).toHaveLength(1);
      }

      if (points[index] === 1) {
        expect(svg.find(Plus)).toHaveLength(1);
      }
    });
  });

  it('calls dispatch and history upon clicking button', (): void => {});
  spy.mockReturnValue({
    quiz,
    points,
  });
  const wrapper = shallow(<Results />);
  const button = wrapper.find('Button');

  button.simulate('click');
  expect(mock).toHaveBeenCalledTimes(3);
});
