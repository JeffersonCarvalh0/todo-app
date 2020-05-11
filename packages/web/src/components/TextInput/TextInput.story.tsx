import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { Formik } from 'formik';

import TextInput from './TextInput';

storiesOf('TextInput', module)
  .addDecorator(withKnobs)
  .add('TextInput', () => (
    <Formik initialValues={{ Label: '' }} onSubmit={() => {}}>
      <TextInput label="Label" obscure={boolean('obscure', false)} />
    </Formik>
  ));
