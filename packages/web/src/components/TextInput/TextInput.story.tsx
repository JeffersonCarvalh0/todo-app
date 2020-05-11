import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

import TextInput from './TextInput';

storiesOf('TextInput', module)
  .addDecorator(withKnobs)
  .add('TextInput', () => (
    <TextInput
      label={text('Label', 'Label')}
      setValue={action('type')}
      obscure={boolean('obscure', false)}
    />
  ));
