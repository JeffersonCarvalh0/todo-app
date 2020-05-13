import React from 'react';
import styled from 'styled-components';

import Theme from '../src/Theme';
import GlobalStyle from '../src/globalStyle';

const Container = styled.div`
  background-color: ${props => props.theme.colors.background};
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const themeDecorator = (storyFn) => {
  return <><GlobalStyle /><Theme><Container>{storyFn()}</Container></Theme></>;
};

export default themeDecorator;
