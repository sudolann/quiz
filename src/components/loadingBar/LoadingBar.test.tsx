import React from 'react';
import { LoadingBar } from './LoadingBar';
import renderer from 'react-test-renderer';

describe('component', (): void => {
  describe('LoadingBar', (): void => {
    it('match snapshot', (): void => {
      const tree = renderer.create(<LoadingBar />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
