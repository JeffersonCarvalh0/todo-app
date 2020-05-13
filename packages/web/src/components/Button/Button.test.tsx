import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button from './Button';
import Theme from '../../Theme';

test('Button', () => {
  const handleClick = jest.fn();

  const { getByText } = render(
    <Theme>
      <Button onClick={handleClick}>Button label</Button>
    </Theme>,
  );

  const button = getByText('Button label');
  userEvent.click(button);

  expect(handleClick).toHaveBeenCalled();
});
