import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text } from '@storybook/addon-knobs';

import Button from './Button';

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .add('Button', () => (
    <div>
      <Button onClick={action('clicked')}>
        {text('Button Label', 'Button Label')}
      </Button>
    </div>
  ));
