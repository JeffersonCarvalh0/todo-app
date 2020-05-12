import React from 'react';
import { render } from '@testing-library/react';
import { Formik } from 'formik';

import TextInput from './TextInput';
import Theme from '../../Theme';

test('Renders the input', () => {
  const { getByTestId } = render(
    <Theme>
      <Formik initialValues={{ Label: '' }} onSubmit={() => {}}>
        <TextInput name="Input" />
      </Formik>
    </Theme>,
  );

  const element = getByTestId('TextInput') as HTMLInputElement;
  expect(element).toBeInTheDocument();
});
