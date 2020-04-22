import React from 'react';

export interface Props {
  color: string;
  onClick?: (color: string) => void;
}

const ColorButton = (props: Props) => {
  const { color, onClick } = props;
  return (
    <button style={{ color }} onClick={() => onClick && onClick(color)}>
      Color Button
    </button>
  );
};

export default ColorButton;
