import { shallow } from 'enzyme';
import React from 'react';
import { QuizForm, ErrorMessage, LoadingBar, QuestionCard } from '../../components/';
import renderer from 'react-test-renderer';
import * as redux from 'react-redux';
import { act } from '@testing-library/react';

const mockDispatch = jest.fn();
const spy = jest.spyOn(redux, 'useSelector');
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: (): jest.Mock<any, any> => mockDispatch,
}));

describe('component', (): void => {
  describe('QuizForm', (): void => {
    it('match snapshot', (): void => {
      spy.mockReturnValue({
        list: [],
        loading: false,
      });
      const tree = renderer.create(<QuizForm />).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('renders header', (): void => {
      const wrapper = shallow(<QuizForm />);
      const h1 = wrapper.find('h1');
      expect(h1.text()).toBe('Welcome to the Trivia Challenge!');
    });
    it('renders disabled button by default', (): void => {
      const wrapper = shallow(<QuizForm />);
      const button = wrapper.find('Button[id="quiz-btn"]');
      expect(button.prop('disabled')).toBeTruthy();
    });
    it('renders select input without selected value', (): void => {
      const wrapper = shallow(<QuizForm />);
      const selectInput = wrapper.find('select');
      expect(selectInput.prop('value')).toBe('select');
    });
    it('renders select input number without value', (): void => {
      const wrapper = shallow(<QuizForm />);
      const inputNumber = wrapper.find('input[placeholder="amount"]');
      expect(inputNumber.prop('value')).toBe(undefined);
    });
    it('call dispatch upon clicking button', async () => {
      const wrapper = shallow(<QuizForm />);
      wrapper.find('select').simulate('change', { target: { name: 'difficulty', value: 'easy' } });
      expect(wrapper.find('select').props().value).toBe('easy');
      wrapper.find('input[placeholder="amount"]').simulate('change', { target: { name: 'amount', value: 2 } });
      expect(wrapper.find('input[placeholder="amount"]').props().value).toBe(2);
      const button = wrapper.find('Button[id="quiz-btn"]');
      wrapper.update();
      expect(button.prop('disabled')).toBeFalsy();
      const mockEvent = {
        preventDefault: jest.fn(),
      };

      act(() => {
        wrapper.find('.form').prop<Function>('onSubmit')(mockEvent);
      });
      wrapper.update();
      expect(mockDispatch).toHaveBeenCalledTimes(1);
    });

    it('renders error message', (): void => {
      spy.mockClear();
      spy.mockReturnValue({
        list: [],
        loading: false,
        error: 'test message',
      });
      const wrapper = shallow(<QuizForm />);
      expect(wrapper.containsMatchingElement(<ErrorMessage message='test message' />));
    });
    it('renders loading component', (): void => {
      spy.mockClear();
      spy.mockReturnValue({
        list: [],
        loading: true,
      });
      const wrapper = shallow(<QuizForm />);
      expect(wrapper.containsMatchingElement(<LoadingBar />));
    });

    it('renders QuestionCard component', (): void => {
      spy.mockClear();
      spy.mockReturnValue({
        list: [
          {
            category: 'General Knowledge',
            question: 'Nutella is produced by the German company Ferrero.',
            correct_answer: 'False',
          },
          { category: 'General Knowledge', question: 'Romanian belongs to the Romance language family, shared with French, Spanish, Portuguese and Italian. ', correct_answer: 'True' },
        ],
        loading: false,
      });
      const wrapper = shallow(<QuizForm />);
      expect(wrapper.containsMatchingElement(<QuestionCard />));
    });
  });
});
