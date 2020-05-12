import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { Formik } from 'formik';

import TextInput from './TextInput';

storiesOf('TextInput', module)
  .addDecorator(withKnobs)
  .add('TextInput', () => (
    <Formik initialValues={{ Label: '' }} onSubmit={() => {}}>
      <TextInput
        name="Label"
        label={text('label', 'Label')}
        obscure={boolean('obscure', false)}
      />
    </Formik>
  ));
