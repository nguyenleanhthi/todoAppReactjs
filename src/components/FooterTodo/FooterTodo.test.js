import React from 'react';
import { shallow } from 'enzyme';
import FooterTodo from './FooterTodo';

describe('FooterTodo', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<FooterTodo />);
    expect(wrapper).toMatchSnapshot();
  });
});
