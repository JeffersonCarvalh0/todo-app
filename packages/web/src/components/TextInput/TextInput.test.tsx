import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TextInput from './TextInput';
import Theme from '../../Theme';

test('Renders the input and set values correctly', () => {
  const handleChange = jest.fn();

  const { getByTestId } = render(
    <Theme>
      <TextInput setValue={handleChange} />
    </Theme>,
  );

  const element = getByTestId('TextInput') as HTMLInputElement;
  expect(element).toBeInTheDocument();

  userEvent.type(element, 'test');
  expect(handleChange).toHaveBeenCalled();
  expect(element.value).toBe('test');
});
