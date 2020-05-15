import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

import TodoCard from './TodoCard';

storiesOf('TodoCard', module)
  .addDecorator(withKnobs)
  .add('TodoCard', () => (
    <TodoCard
      todo={{
        title: text('Title', 'Todo title'),
        description: text(
          'Description',
          'Todo description goes here. It can be a long text.',
        ),
        done: boolean('Done', false),
      }}
    />
  ));
