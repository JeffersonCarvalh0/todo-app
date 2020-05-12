import React from 'react';
import styled from 'styled-components';
import ReactLoading from 'react-loading';

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 2;
`;

const StyledLoading = styled(ReactLoading)`
  display: block;
  margin: auto;
  text-align: center;
  width: 10vw;
  height: 10vh;
`;

const FullLoading = ({ show = false }: { show: boolean }) =>
  show ? (
    <Overlay>
      <StyledLoading data-testid="FullLoading" type="bubbles" />
    </Overlay>
  ) : (
    <></>
  );

export default FullLoading;
