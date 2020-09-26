import { shallow } from 'enzyme';
import React from 'react';
import { ErrorMessage } from '../errorMessage/ErrorMessage';

describe('component', (): void => {
  describe('ErrorMessage', (): void => {
    it('renders title', (): void => {
      const wrapper = shallow(<ErrorMessage message='test' />);
      expect(wrapper.find('p.alert').text()).toBe('test');
    });
  });
});
