import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';

import TextInput from './TextInput';

storiesOf('TextInput', module)
  .addDecorator(withKnobs)
  .add('TextInput', () => <TextInput label={text('Label', 'Label')} />);
