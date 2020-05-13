import React from 'react';
import { render } from '@testing-library/react';

import FullLoading from './FullLoading';
import Theme from '../../Theme';

test('Shows a loading overlay', () => {
  const { queryByTestId } = render(
    <Theme>
      <FullLoading show />
      <FullLoading show={false} data-testid="HiddenFullLoading" />
    </Theme>,
  );

  const fullLoading = queryByTestId('FullLoading');
  const hiddenFullLoading = queryByTestId('HiddenFullLoading');
  expect(fullLoading).toBeInTheDocument();
  expect(hiddenFullLoading).toBeNull();
});
