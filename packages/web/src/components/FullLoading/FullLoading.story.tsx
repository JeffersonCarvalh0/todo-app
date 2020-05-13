import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';

import FullLoading from './FullLoading';

storiesOf('FullLoading', module)
  .addDecorator(withKnobs)
  .add('FullLoading', () => <FullLoading show={boolean('show', true)} />);
