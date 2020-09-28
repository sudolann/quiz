import { shallow } from 'enzyme';
import React from 'react';
import { QuestionCard } from './QuestionCard';
import renderer from 'react-test-renderer';
import * as redux from 'react-redux';
import { Redirect } from 'react-router';

const mockDispatch = jest.fn();
const spy = jest.spyOn(redux, 'useSelector');
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: (): jest.Mock<any, any> => mockDispatch,
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

describe('component', (): void => {
  describe('QuestionCard', (): void => {
    it('match snapshot', (): void => {
      spy.mockReturnValue({
        quiz,
        points: [],
      });
      const tree = renderer.create(<QuestionCard />).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('renders header', (): void => {
      spy.mockReturnValue({
        quiz,
        points: [],
      });
      const wrapper = shallow(<QuestionCard />);
      const h1 = wrapper.find('h1');
      expect(h1.text()).toBe(quiz.list[0].category);
    });
    it('renders Question', (): void => {
      spy.mockReturnValue({
        quiz,
        points: [],
      });
      const wrapper = shallow(<QuestionCard />);
      const h1 = wrapper.find('.question__card p');
      expect(h1.text()).toBe(quiz.list[0].question);
    });
    it('renders footer', (): void => {
      const wrapper = shallow(<QuestionCard />);
      const h1 = wrapper.find('.question__footer p');
      expect(h1.text()).toBe('1 of 2');
    });
    it('call dispatch when button was clicked', (): void => {
      spy.mockReturnValue({
        quiz,
        points: [],
      });
      const wrapper = shallow(<QuestionCard />);
      wrapper
        .find('Button[id="quiz-btn"]')
        .at(1)
        .simulate('click');
      wrapper
        .find('Button[id="quiz-btn"]')
        .at(0)
        .simulate('click');
      expect(mockDispatch).toBeCalledTimes(2);
    });
    it('redirect to results component when there are two sores in the state', (): void => {
      spy.mockReturnValue({
        quiz,
        points: [0, 1],
      });
      const wrapper = shallow(<QuestionCard />);
      expect(wrapper.containsMatchingElement(<Redirect to='/results' />));
    });
  });
});
