import * as React from 'react';
import { render } from 'react-testing-library';
// this adds custom jest matchers from jest-dom
import 'jest-dom/extend-expect';

import { App } from './App';

test('it should render the button', () => {
  const { container } = render(<App />);

  expect(container.firstChild).toMatchSnapshot();
});
